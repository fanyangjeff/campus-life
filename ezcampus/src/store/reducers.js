export const userReducer = (state = {email: '', userName:'', isLoggedIn: false}, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case 'setEmailAndUserName': {
            newState.email = action.data.email
            newState.userName = action.data.userName
            newState.isLoggedIn = true
            return newState
        }

        case 'setEmail': {
            newState.email = action.data.email
            return newState
        }

        case 'setUserName': {
            newState.userName = action.data.userName
            return newState
        }

        case 'unsetEmailAndUserName': {
            newState.email = ''
            newState.userName = ''
            newState.isLoggedIn = false
            return newState
        }
        
        default: {
            return state
        }
    }
}
