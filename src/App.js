import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import { useState } from 'react';

import './App.css';
import Chat from './chat';
import Landing from './landing';

function App() {
  const [name,setName] = useState('')
  const [room,setRoom] = useState('')
  
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Landing setName={setName} setRoom={setRoom} />
          </Route>
          <Route exact path='/chat'>
            {name? <Chat name={name} room={room} /> : <Redirect to='/' />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
