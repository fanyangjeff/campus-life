const initialState = {
    email: '',
    userName: '',
    isLoggedIn: false,
    showPromptLogIn: false, 
    posts: [],
    currentSelectedPostType: null,
    isLoading: false,
    avatarlink: ''
}


export const userReducer = (state = initialState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case 'setEmailAndUserName': {
            newState.email = action.data.email
            newState.userName = action.data.userName
            newState.avatarlink = action.data.avatarlink
            newState.isLoggedIn = true
            newState.isLoading = false
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

        case 'updateAvatarlink': {
            newState.avatarlink = action.data.avatarlink
            return newState
        }

        case 'unsetEmailAndUserName': {
            newState.email = ''
            newState.userName = ''
            newState.avatarlink = ''
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
            return newState
        }

        case 'addPost': {
            let newPostList = [action.data.newPost]
            newState.posts = newPostList.concat(newState.posts)
            return newState
        }

        case 'deletePost': {
            let targetPostId = action.data.targetPostId
            newState.posts = newState.posts.filter(post => post.postId != targetPostId)
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


        case 'setIsLoading': {
            newState.isLoading = action.data.isLoading
            return newState
        }

        default: {
            return state
        }

    }
}
