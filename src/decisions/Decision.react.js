import './styles';
import connectToStores from 'alt/utils/connectToStores';

import React from 'react';

class DecisionComponent extends React.Component {
  render() {
    return (
        <section id="this.props.decision.id" className="decisions__list__decision">
          <span className="decisions__list__decision__name">{this.props.decision.name}</span>
          <span className="decisions__list__decision__score">{this.props.decision.score}</span>
        </section>
    );
  }
}

DecisionComponent.defaultProps = {
};

export default DecisionComponent;
