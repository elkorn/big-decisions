import alt from '../alt';

import DecisionActions from './actions';

class DecisionStore {
  constructor() {
    this.bindListeners({
      fetchDecisions: DecisionActions.FETCH_DECISIONS,
      addDecision: DecisionActions.ADD_DECISION
    });

    this.state = {
      decisions: []
    };
  }

  addDecision(decision) {
    this.setState({
      decisions: this.state.decisions.concat([decision])
    });
  }

  fetchDecisions() {
    console.log(arguments);
  }
  handleFetchDecisions() {
    this.decisions = [];
  }
}

export default alt.createStore(DecisionStore, 'DecisionStore');
