import React from "react";
import Routes from "./Routes.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import UseAuth from "./hooks/UseAuth/index.jsx";

function App() {
  //const isLogin = UseAuth();
  return  <UserContextProvider><Routes /></UserContextProvider>;
}

export default App;