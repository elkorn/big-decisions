import connectToStores from 'alt/utils/connectToStores';
import DecisionStore from './store';

import React from 'react';

const renderDecision = decision => (
  <li>
    <Decision decision={decision} />
  </li>
);

@connectToStores
class DecisionsComponent extends React.Component {
  static getStores() {
    return [DecisionStore];
  }

  constructor() {
    super();
    this.state = {
      isAddingDecision: false
    };
  }

  static getPropsFromStores() {
    return DecisionStore.getState();
  }

  addDecision() {
      this.setState(Object.assign(this.state, {
          isAddingDecision: true
      }));
  }

  cancelNewDecision() {
    this.setState(Object.assign(this.state, {
      isAddingDecision: false
    }));
  }

  confirmNewDecision() {
    console.log('confirming decision');
    this.setState(Object.assign(this.state, {
      isAddingDecision: false
    }));
  }

  render() {
    const newDecisionComp = this.state.isAddingDecision ? (
      <section className="decisions__controls__new">
        <input type="text" className="decisions__controls__new__name" autoFocus />
        <button className="decision__controls__new--cancel" onClick={::this.cancelNewDecision}>Cancel</button>
        <button className="decision__controls__new--confirm" onClick={::this.confirmNewDecision}>Confirm</button>
      </section>
    ) : (<button className="decision__controls--add" onClick={::this.addDecision}>Add</button>);
    return (
        <article className="decisions">
          <ul className="decisions__list">
            {this.props.decisions.map(renderDecision)}
          </ul>
          <section className="decisions__controls">
            {newDecisionComp}
          </section>
        </article>
    );
  }
}

DecisionsComponent.defaultProps = {
};

export default DecisionsComponent;
