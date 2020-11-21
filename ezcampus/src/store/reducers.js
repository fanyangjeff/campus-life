const initialState = {
    email: '',
    userName: '',
    isLoggedIn: false,
    showPromptLogIn: false, 
    posts: [],
    currentSelectedPostType: null,
    postsMap: {}
}


export const userReducer = (state = initialState, action) => {
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

        case 'setShowPromptLogIn': {
            newState.showPromptLogIn = true
            return newState
        }

        case 'unsetShowPromptLogIn': {
            newState.showPromptLogIn = false
            return newState
        }

        case 'setPosts': {
            newState.posts = action.data.posts
            newState.postsMap = action.data.postsMap
            return newState
        }

        case 'addPost': {
            newState.posts = action.data.newPost.concat(newState.posts)
            const post = action.data.newPost[0]
            const postId = action.data.newPost[0].postId
            newState.postsMap = {...newState.postsMap, postId: post}
            return newState
        }

        case 'setSelectedPostType': {
            newState.currentSelectedPostType = action.data.postType
            return newState
        }

        case 'unsetCurrentPostType': {
            newState.currentSelectedPostType = null
            return newState
        }

        default: {
            return state
        }
    }
}
