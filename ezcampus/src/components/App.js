import SideBar from "./Sidebar";
import UserProfile from "./Profile/ProfilePage/UserProfile"
import Posts from './Posts/Posts'
import Create from "./Posts/Create";
import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";


function App() {
  return (
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
                    />
                    <Route
                      exact
                      path="/message"
                    />
                    <Route
                      exact
                      path="/groups"
                    />
                    <Route
                      exact
                      path="/friends"
                    />
                    <Route
                      path="/posts/:postId"
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
  );
}

export default App;