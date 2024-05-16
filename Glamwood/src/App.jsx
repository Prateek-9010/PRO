import React from 'react';
import Protected from './components/Protected';
import Public from './components/Public';
import UseAuth from './hooks/UseAuth';


function App() {
  const [isLogin, token] = UseAuth();
  
  return ( isLogin ? <Protected token={token}/> : <Public/>
  )
}

export default App
