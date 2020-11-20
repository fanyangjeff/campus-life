import React, {useContext, useState, useEffect, createContext} from 'react'
import store from '../store/Store'
import axios from 'axios'

const autoLoginContext = createContext(AutoLoginProvider)

export function useAutoLogin() {
    return useContext(autoLoginContext)
}

export function AutoLoginProvider({children}) {

    useEffect(() => {
        const userEmail = localStorage.getItem('ezcampus_user_email')
        const password = localStorage.getItem('ezcampus_user_password')

        if (userEmail && password) {
            autoLogin(userEmail, password)
        }
    }, [])

    const autoLogin = (userEmail, password) => {
        axios.post('http://server.metaraw.world:3000/users/email_login', {
            'email': userEmail,
            'password': password
            
        })
        .then(res => {
            if (res.data.statusCode == 200) {
                const action = {
                    type: 'setEmailAndUserName',
                    data: {
                        email: res.data.user.email,
                        userName: res.data.user.userName
                    }
                }
                store.dispatch(action)

            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <autoLoginContext.Provider value={{}}>
            {children}
        </autoLoginContext.Provider>
    )
}
