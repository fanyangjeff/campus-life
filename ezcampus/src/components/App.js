import SideBar from "./Sidebar";
import UserProfile from "./Profile/ProfilePage/UserProfile"
import Posts from './Posts/Posts'
import React, { useState, useEffect } from 'react'
import Create from "./Create/Create";
import Friends from "./Friends/Friends"
import Section from "./ResponsiveSection/Section"
import PostDetail from './Posts/PostDetail'
import ProfileEdit from './Profile/ProfileEdit/ProfileEdit'
import store from '../store/Store'
import {AutoLoginProvider} from '../contexts/AutoLoginProvider'
import LoadPosts from '../contexts/LoadPosts'
import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const {isLoggedIn} = store.getState()
      setIsLoggedIn(isLoggedIn)
    })

    return () => {unsubscribe()}
  }, [])

  return (
    <LoadPosts>
    <AutoLoginProvider>
      <div className="App">
        <BrowserRouter>
            <SideBar
                routes={
                  <div>
                    <Switch>
                      <Route
                        exact
                        path="/"
                        component={() => {
                          return (
                            <Redirect
                              to={{
                                pathname: "/posts",
                              }}
                            >
                            </Redirect>
                          );
                        }}
                      />
                      <Route
                        exact
                        path="/profile"
                        component={UserProfile}
                      />
                      <Route
                        exact
                        path="/posts"
                        component={Posts}
                      />
                      <Route
                        exact
                        path="/posts/my"
                      />
                      <Route
                        exact
                        path="/posts/create"
                        component={Create}
                      />
                      <Route
                        exact
                        path="/profile/settings"
                        component={ProfileEdit}
                      />
                      <Route
                        exact
                        path="/message"
                      />
                      <Route
                        exact
                        path="/groups"
                        component={Section}
                      />
                      <Route
                        exact
                        path="/friends"
                        component={Friends}
                      />
                      <Route
                        path="/posts/:postId"
                        component={PostDetail}
                      />
                      <Route
                        path="/people/:userId"
                      />
                    </Switch>
                  </div>
                }
            />
        </BrowserRouter>
      </div>
    </AutoLoginProvider>
    </LoadPosts>
  );
}

export default App;