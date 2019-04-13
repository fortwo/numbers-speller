import React from 'react';

// Utils
import { numberToEnglish } from '../utils';

// Style
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      number: '',
      spelling: '',
    };

    this.onNumberChange = this.onNumberChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    this.input.focus();
  }

  onNumberChange(e) {
    this.setState({
      number: e.target.value,
      spelling: numberToEnglish(e.target.value.replace(',', '.')),
    });
  }

  onFocus() {
    this.setState({
      focused: true,
    });
  }

  onBlur() {
    this.setState({
      focused: false,
    });
  }

  render() {
    return (
      <div className="app">
        <header className="title">
          <h1>NumberSpeller</h1>
        </header>

        <div className={`container ${this.state.focused || this.state.number ? 'active' : ''}`}>
          <label>Type a number (up to ±2 quadrillion)</label>
          <input
            ref={node => this.input = node}
            type="text"
            value={this.state.number}
            onChange={this.onNumberChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </div>

        <span className="result">{this.state.spelling}</span>
      </div>
    );
  }
}

export default App;
