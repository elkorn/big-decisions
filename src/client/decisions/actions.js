import Promise from 'bluebird';
import setToString from '../lib/settostring';
import {
  dispatch
}
from '../dispatcher';

export
const MAX_DECISION_TITLE_LENGTH = 42;
export
function addDecision(decision) {
  const title = decision.title.trim();
  if (!title) return;
  dispatch(addDecision, decision);
}

export
function upvote(decision) {
  dispatch(upvote, decision);
}

export
function downvote(decision) {
  dispatch(downvote, decision);
}

export
function onNewDecisionFieldChange({
  target: {
    name, value
  }
}) {
  switch (name) {
  case 'title':
    value = value.slice(0, MAX_DECISION_TITLE_LENGTH);
    break;
  }
  dispatch(onNewDecisionFieldChange, {
    name, value
  });
}

export
function onEditableSave(id, name, value) {
  // Simulate async saving.
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id, name, value
      });
    }, 500);
  });
  return dispatch(onEditableSave, promise);
}

export const connectToStores = (ComposedComponent, stores, getStateFromStores) => class extends React.Component {
  getInitialState() {
    return getStateFromStores(this.props);
  }

  componentDidMount() {
    stores.forEach(store => store.addChangeListener(this.handleStoresChanged));
  }

  componentWillUnmount() {
    stores.forEach(store => store.removeChangeListener(this.handleStoresChanged));
  }

  handleStoresChanged() {
    if(this.isMounted()) {
      this.setState(getStateFromStores(this.props));
    }
  }

  render() {
    return (<ComposedComponent {...this.props} {...this.state} />);
  }

}



export
function onEditableState(id, name, state) {
  console.log(state);
  if (state) {
    state = state.set('value', state.value.slice(0, MAX_DECISION_TITLE_LENGTH));
  }

  dispatch(onEditableState, {
    id, name, state
  });
}

setToString('decisions', {
  addDecision,
  upvote,
  downvote,
  onEditableSave,
  onEditableState,
  onNewDecisionFieldChange
});
