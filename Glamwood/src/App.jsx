import React from "react";
import Routes from "./Routes.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";

function App() {
  return <UserContextProvider>
         <Routes />
         </UserContextProvider>;
}

export default App;