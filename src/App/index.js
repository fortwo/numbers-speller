import React from 'react';

// Utils
import { splitString } from '../utils';

// Style
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: '',
      spelling: '',
    };

    this.onNumberChange = this.onNumberChange.bind(this);
  }

  componentDidMount() {
    this.input.focus();
  }

  onNumberChange(e) {
    this.setState({
      number: e.target.value,
      spelling: splitString(e.target.value),
    });
  }

  render() {
    return (
      <div className="App">
        <header className="title">
          <h1>NumberSpeller</h1>
          <h6>Type a number (up to 2 quadrilion)</h6>
        </header>

        <input
          className="input-number"
          ref={node => this.input = node}
          type="text"
          value={this.state.number}
          onChange={this.onNumberChange}
        />

        {this.state.spelling && <p>{this.state.spelling}</p>}
      </div>
    );
  }
}

export default App;
