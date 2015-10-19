import * as actions from './actions';
import Component from '../components/component.react';
import React from 'react';
import immutable from 'immutable';
import {msg} from '../intl/store';

export default class NewDecision extends Component {
  static propTypes = {
    todo: React.PropTypes.instanceOf(immutable.Record)
  };

  constructor() {
    super();
    this.state = {
      isAdding: false
    };

    this.startAdding = ::this.startAdding;
  }

  addDecisionOnEnter(e) {
    if(e.key === 'Enter') {
      actions.addDecision(this.props.decision);
      this.stopAdding();
    }
  }

  startAdding () {
    this.setState({isAdding: true});
  }

  stopAdding () {
    this.setState({isAdding: false});
  }

  render() {
    const {decision} = this.props;
    if(this.state.isAdding) {
      return (
          <input
            autoFocus
            className="new-decision"
            name="title"
            onChange={actions.onNewDecisionFieldChange}
            onKeyDown={::this.addDecisionOnEnter}
            placeholder={msg('decisions.newDecisionPlaceholder')}
            value={decision.title}
          />
      );
    } else {
      return (
          <button onClick={this.startAdding}>{msg('decisions.addNew')}</button>
      );
    }
  }
}
