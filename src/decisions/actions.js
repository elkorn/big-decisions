import alt from '../alt';

class DecisionActions {
  fetchDecisions() {
    this.dispatch();
  }

  addDecision(decision) {
    this.dispatch(decision);
  }
}

export default alt.createActions(DecisionActions);
