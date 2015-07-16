import './todo.styl';
import * as actions from './actions';
import Component from '../components/component.react';
import Editable from '../components/editable.react';
import React from 'react';
import immutable from 'immutable';

export default class Todo extends Component {

  static propTypes = {
    disabled: React.PropTypes.bool.isRequired,
    editable: React.PropTypes.instanceOf(immutable.Map),
    todo: React.PropTypes.instanceOf(immutable.Record).isRequired
  };

  render() {
    const {disabled, editable, todo} = this.props;

    const editableFor = (propName) =>
      <Editable
        disabled={disabled}
        id={todo.id}
        name={propName}
        onSave={actions.onEditableSave}
        onState={actions.onEditableState}
        state={editable ? editable.get(propName) : null}
        text={todo[propName]}
      />;

    return (
      <li className="todo-item">
        {editableFor('title')}
        <span className="button" onClick={() => actions.deleteTodo(todo)}>x</span>
      </li>
    );
  }

}
