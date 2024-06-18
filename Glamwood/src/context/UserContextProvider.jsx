import React, { useState,useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserContextProvider = ({children}) => {
  
    const [data, setdata] = useState("prateek")
    // const [token,setToken] = useState(null);
  

    return (
          <UserContext.Provider value = {{data}}>
          {children}
          </UserContext.Provider>
    )

}

export default UserContextProvider;