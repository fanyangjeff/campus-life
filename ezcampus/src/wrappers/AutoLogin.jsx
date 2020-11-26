import React, {useEffect} from 'react'
import store from '../store/Store'
import axios from 'axios'
import {useHistory} from 'react-router-dom'


export default function AutoLogin(props) {
    const children = props.children
    const history = useHistory()

    useEffect(() => {
        const userEmail = localStorage.getItem('ezcampus_user_email')
        const password = localStorage.getItem('ezcampus_user_password')

        if (userEmail && password) {
            autoLogin(userEmail, password)
        }

        const unsubscribe = store.subscribe(() => {
            setTimeout(() => {
                const {isLoggedIn} = store.getState()
                console.log(`we are currently at ${history.location.pathname}`)
                if (!isLoggedIn) {
                    if (history.location.pathname == '/contacts' ||
                        history.location.pathname == '/posts/my') {
                        console.log(history.location)
                        history.replace('/posts')
                    }
                }
            }, 200)
        
        })

        return () => {unsubscribe()}

    }, [])

    const autoLogin = (userEmail, password) => {
        const action = {type: 'setIsLoading', data: {isLoading: true}}
        store.dispatch(action)
        axios.post('http://server.metaraw.world:3000/users/email_login', {
            'email': userEmail,
            'password': password
            
        })
        .then(res => {
            console.log('auto logging in')
            if (res.data.statusCode == 200) {
                const action = {
                    type: 'setEmailAndUserName',
                    data: {
                        email: res.data.user.email,
                        userName: res.data.user.userName,
                        avatarlink: res.data.user.avatarlink,
                        isLoading: false
                    }
                }
                store.dispatch(action) 
            }
        })
        .catch(err => {
            console.log(err)
            const action = {
                type: 'setIsLoading',
                data: {
                    isLoading: false
                }
            }
            store.dispatch(action)
        })
    }

    return (
        <div>
            {children}
        </div>
    )
}
