import React from "react";
import PostContent from "./PostContent";
import store from '../../../store/Store';

class PostDetail extends React.Component {
    constructor(props) {
      super(props)
      this.history = props.history
    }
    componentDidMount() {
      const {isLoggedIn} = store.getState()
      if (!isLoggedIn) {
          console.log('not logged in')
          const action = {type: 'setShowPromptLogIn'}
          store.dispatch(action)
          this.history.push('/posts')
      }
  
      store.subscribe(() => {
          const {isLoggedIn} = store.getState()
          if (!isLoggedIn) {
              this.history.push('/posts')
          }
      
      })
    }
    render() {
        return (
          <div>
             <PostContent history={this.props.history}/>
          </div>
        );
    }
}
export default PostDetail