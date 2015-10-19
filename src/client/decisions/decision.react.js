import './decision.styl';
import * as actions from './actions';
import Component from '../components/component.react';
import Editable from '../components/editable.react';
import React from 'react';
import immutable from 'immutable';

export default class Decision extends Component {
  static propTypes = {
    disabled: React.PropTypes.bool.isRequired,
    editable: React.PropTypes.instanceOf(immutable.Map),
    decision: React.PropTypes.instanceOf(immutable.Record).isRequired
  };

  render() {
    const {disabled, editable, decision} = this.props;

    const editableFor = (propName) =>
      <Editable
        disabled={disabled}
        id={decision.id}
        name={propName}
        onSave={actions.onEditableSave}
        onState={actions.onEditableState}
        state={editable ? editable.get(propName) : null}
        text={decision[propName]}
          />;

    return (
        <li className="decision-item">
          {editableFor('title')}
        <div>({decision.score})</div>
          <button onClick={() => actions.upvote(decision)}>+1</button>
          <button onClick={() => actions.downvote(decision)}>-1</button>
        </li>
    );
  }
}
