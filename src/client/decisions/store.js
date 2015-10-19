import * as actions from './actions';
import Decision from './decision';
import getRandomString from '../lib/getrandomstring';
import {Range} from 'immutable';
import {register} from '../dispatcher';
import {decisionsCursor} from '../state';

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case actions.addHundredDecisions:
      decisionsCursor(decisions => {
        return decisions.update('list', list => list.withMutations(list => {
          Range(0, 100).forEach(i => {
            const id = getRandomString();
            list.push(new Decision({
              id: id,
              title: `Item #${id}`
            }));
          });
        }));
      });
      break;

    case actions.addDecision:
      decisionsCursor(decisions => {
        return decisions
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
          .set('newDecision', new Decision());
      });
      break;

    case actions.clearAll:
      decisionsCursor(decisions => {
        return decisions
          .update('list', list => list.clear())
          .set('newDecision', new Decision());
      });
      break;

    case actions.deleteDecision:
      decisionsCursor(decisions => {
        const decision = data;
        return decisions.update('list', list => list.delete(list.indexOf(decision)));
      });
      break;

    case actions.onEditableSave:
      decisionsCursor(decisions => {
        const {id, name, value} = data;
        return decisions.update('list', list => {
          const idx = list.findIndex(decision => decision.id === id);
          return list.setIn([idx, name], value);
        });
      });
      break;

    case actions.onEditableState:
      decisionsCursor(decisions => {
        const {id, name, state} = data;
        return decisions.setIn(['editables', id, name], state);
      });
      break;

    case actions.onNewDecisionFieldChange:
      decisionsCursor(decisions => {
        const {name, value} = data;
        return decisions.setIn(['newDecision', name], value);
      });
      break;

  }

});
