import React from "react";
import PostContent from "./PostContent"

class PostDetail extends React.Component {


    render() {
        return (
          <div>
             <PostContent history={this.props.history}/>
          </div>
        );
    }
}
export default PostDetail