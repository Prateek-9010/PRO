import React, { useEffect, useState, useRef} from 'react';
import Keycloak from 'keycloak-js';

const UseAuth = () => {
    const [isLogin, setLogin] = useState(false);
    const [token,settoken] = useState(null);
    const isRun = useRef(false);

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
                settoken(client.token);
            });

    }, []);
    // console.log(token)

    return [isLogin, token];
}

export default UseAuth;
