/**
 * In the following React template, modify the component so that the counter correctly displays 
 * and it increments by one whenever the button is pressed. 
 * You are free to add classes and styles, but make sure you leave the element ID's as they are.
 */

import React from 'react';
import ReactDOM from 'react-dom';

class Counter extends React.Component {
  state = {
    count: 0
  };
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  
  render() {
    return (
      <div id="mainArea">
        <p>button count: <span>{this.state.count}</span></p>
        <button id="mainButton" onClick={this.handleClick}>Increase</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('test-02')
);