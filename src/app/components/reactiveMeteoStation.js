import React from 'react';

class ReactiveMeteoStation extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: "Hello World!"
    };
  }

  render() {
    const title = this.state.title;
    return (
      <div>
        <h2>{title}</h2>
      </div>
    );
  }
}

export default ReactiveMeteoStation;
