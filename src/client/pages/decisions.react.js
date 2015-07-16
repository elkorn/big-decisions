// import Buttons from '../todos/buttons.react';
import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import List from '../decisions/list.react';
// import NewTodo from '../todos/newtodo.react';
import React from 'react';
// import ToCheck from './tocheck.react';
import immutable from 'immutable';
import {msg} from '../intl/store';

export default class Decisions extends Component {

  static propTypes = {
    pendingActions: React.PropTypes.instanceOf(immutable.Map).isRequired,
    decisions: React.PropTypes.instanceOf(immutable.Map).isRequired
  };

  render() {
    const {decisions, pendingActions} = this.props;
    const list = decisions.get('list');

    return (
      <DocumentTitle title={msg('pages.decisions.title')}>
        <div className="decisions-page">
          <h2>Here lie the decisions</h2>
          <List
            editables={decisions.get('editables')}
            pendingActions={pendingActions}
            decisions={list}
          />
        </div>
      </DocumentTitle>
    );
  }

}
