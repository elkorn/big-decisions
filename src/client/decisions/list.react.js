import * as actions from './actions';
import Component from '../components/component.react';
import React from 'react';
import immutable from 'immutable';
import {msg} from '../intl/store';
import Decision from './decision.react';

export default class List extends Component {

  static propTypes = {
    editables: React.PropTypes.instanceOf(immutable.Map).isRequired,
    pendingActions: React.PropTypes.instanceOf(immutable.Map).isRequired,
    decisions: React.PropTypes.instanceOf(immutable.List)
  };

  render() {
    const {decisions, editables, pendingActions} = this.props;

    if(!decisions.size) {
      return (
          <p>{msg('decisions.emptyList')}</p>
      );
    }

    function decisionComponent(decision) {
      const editable = editables.get(decision.id);
      const disabled = !!editable && pendingActions.has(actions.onEditableSave.toString());

      return (
          <Decision
        disabled={disabled}
        editable={editable}
        key={decision.id}
        decision={decision}
          />
      );
    }

    function renderNewDecisionEditable() {
      const newDecision = decisions.get('newDecision');
      if(newDecision) {
        return decisionComponent(newDecision);
      }

      return '';
    }

    return (
      <ol className="decision-list">
        {decisions.map(decisionComponent)}
        {renderNewDecisionEditable()}
      </ol>
    );
  }
};
