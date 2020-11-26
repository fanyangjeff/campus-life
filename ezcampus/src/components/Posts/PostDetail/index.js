import React from "react";
import PostContent from "./PostContent";
import store from '../../../store/Store';

class PostDetail extends React.Component {
    constructor(props) {
      super(props)
      this.history = props.history
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