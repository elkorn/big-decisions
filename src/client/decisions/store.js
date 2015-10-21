import * as actions from './actions';
import Decision from './decision';
import getRandomString from '../lib/getrandomstring';
import _ from 'lodash';
import {
  Range
}
from 'immutable';
import {
  register
}
from '../dispatcher';
import {
  decisionsCursor
}
from '../state';

const castVote = value => (data, decisions) => {
  const decision = data;
  const id = decision.get('id');
  return decisions.update('list', list => {
    const idx = list.findIndex(decision => decision.id === id);
    return list.setIn([idx, 'score'], Math.max(0, decision.get('score') + value));
  });
};

const upvote = castVote(1);
const downvote = castVote(-1);

const actionHandlers = {
  [actions.addHundredDecisions]: (data, decisions) => decisions.update('list', list => list.withMutations(list => {
    Range(0, 100).forEach(i => {
      const id = getRandomString();
      list.push(new Decision({
        id: id,
        title: `Item #${id}`
      }));
    });
  })),
  [actions.addDecision]: (data, decisions) => decisions
    .update('list', (list) => {
      // Always denote what data represents. Favour readability over wtf.
      // Try to resist being smart ass. Fuck pride.
      // https://www.youtube.com/watch?v=ruhFmBrl4GM
      const decision = data;
      const newDecision = decision.merge({
        id: getRandomString()
      });
      return list.push(newDecision);
    })
    .set('newDecision', new Decision()),
  [actions.clearAll]: (data, decisions) => decisions
    .update('list', list => list.clear())
    .set('newDecision', new Decision()),
  [actions.deleteDecision]: (data, decisions) => {
    const decision = data;
    return decisions.update('list', list => list.delete(list.indexOf(decision)));
  },
  [actions.onEditableSave]: (data, decisions) => {
    const {
      id, name, value
    } = data;
    return decisions.update('list', list => {
      const idx = list.findIndex(decision => decision.id === id);
      return list.setIn([idx, name], value);
    });
  },
  [actions.onEditableState]: (data, decisions) => {
    const {
      id, name, state
    } = data;
    return decisions.setIn(['editables', id, name], state);
  },
  [actions.onNewDecisionFieldChange]: (data, decisions) => {
    const {
      name, value
    } = data;
    return decisions.setIn(['newDecision', name], value);
  },
  [actions.upvote]: upvote,
  [actions.downvote]: downvote
};
export
const dispatchToken = register(({
  action, data
}) => {

  if (actionHandlers.hasOwnProperty(action)) {
    decisionsCursor(_.partial(actionHandlers[action], data));
  } else {
    console.error(`No handler for action ${action}`);
  }
});
