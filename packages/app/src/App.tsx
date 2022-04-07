import logo from './logo.svg';
import './App.css';

import Hello from 'workspace-a';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Hello/>
      </header>
    </div>
  )
}

export default App
