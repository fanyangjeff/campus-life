import React, {useEffect} from 'react'
import store from '../store/Store'
import axios from 'axios'
export default function LoadPosts({children}) {

    useEffect(() => {
        axios.get('http://server.metaraw.world:3000/posts/get_all_posts')
        .then(res => {
            const action = {type: 'setPosts', data: {posts: res.data.data}}
            store.dispatch(action)
        })
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}
