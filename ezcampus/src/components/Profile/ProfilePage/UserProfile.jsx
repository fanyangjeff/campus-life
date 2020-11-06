import React from "react";
import styled from "styled-components";

class UserProfile extends React.Component {
  render() {
    return (
      <AboutContainer>
        <p>hello</p>
      </AboutContainer>
    )
  }
}

const AboutContainer = styled.div`
  height: 100%;
  padding-right: 5%;
  background-color: #f5f6fa;
  display: flex;
  flex-direction: column;
`



export default UserProfile;