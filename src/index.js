import React from 'react';
import ReactDOM from 'react-dom';
import './styles.styl';

class App extends React.Component {
  render() {
    return <h1>HelloFresh</h1>;
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
