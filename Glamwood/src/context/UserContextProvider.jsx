import React, { useState,useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserContextProvider = ({children}) => {
  
    const [data, setdata] = useState("prateek")
  

    return (
          <UserContext.Provider value = {{data}}>
          {children}
          </UserContext.Provider>
    )

}

export default UserContextProvider;