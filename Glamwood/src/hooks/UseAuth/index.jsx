import React, { useEffect, useState, useRef, useContext} from 'react';
import Keycloak from 'keycloak-js';
import UserContext from '../../context/UserContext';

const UseAuth = () => {
    const [isLogin, setLogin] = useState(false);
    const isRun = useRef(false);
    // const {setToken} = useContext(UserContext);
    const [token,setToken] = useState(null);

    


    useEffect(() => {

        if(isRun.current) return;

        isRun.current = true;

        const client = new Keycloak({
            url: import.meta.env.VITE_KEYCLOAK_URL,
            realm: import.meta.env.VITE_KEYCLOAK_REALM,
            clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
        });

        client
         .init({ 
            onLoad: "login-required", 
         })
            .then((res) => {
                setLogin(res);
                setToken(client.token);
            });

    }, []);
     console.log(token)

    return isLogin
}

export default UseAuth;
