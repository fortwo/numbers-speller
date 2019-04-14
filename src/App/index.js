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
      error: false,
    };

    this.onNumberChange = this.onNumberChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.readNumber = this.readNumber.bind(this);
  }

  componentDidMount() {
    this.input.focus();
  }

  onNumberChange(e) {
    const number = e.target.value;
    let spelling = '';
    let error = false;

    try {
      spelling = numberToEnglish(number.replace(',', '.')); // Support both dot and commas as decimal separator
    } catch (e) {
      error = true;
    }

    this.setState({
      number,
      spelling,
      error,
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

  readNumber() {
    if (this.state.number) {
      window.responsiveVoice.speak(this.state.spelling);
    }
  }

  render() {
    const { focused, number, spelling, error } = this.state;

    return (
      <div className="app">
        <header className="title">
          <h1>NumberSpeller</h1>
        </header>

        <div className={`container ${focused || number ? 'active' : ''}`}>
          <label>Type a number (up to ±2 quadrillion)</label>
          <input
            ref={node => this.input = node}
            type="text"
            value={number}
            onChange={this.onNumberChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </div>

        {error ?
          <span className="error">Sorry, that's not a valid number</span>
          :
          <span className="result">{spelling}</span>
        }

        <div className={`read-button ${number ? '' : 'disabled'}`} onClick={this.readNumber}>
          Read number
        </div>
      </div>
    );
  }
}

export default App;
