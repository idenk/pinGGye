import axios from "axios";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import FeedDetail from "./pages/FeedDetail";
import FeedUpload from "./pages/FeedUpload";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Mypage from "./pages/Mypage";
import Signup from "./pages/Signup";

function App() {

  const [isLogin, setIsLogin] = useState(true);
  const [userInfo, setUserInfo] = useState({
    email: "kim@google.com",
    password: "1234",
    nickname: "kim",
  });

  // setIsLogin(true);
  // setUserInfo({
  //   email: "kim@google.com",
  //   password: "1234",
  //   nickname: "kim",
  // })

  axios
    .get(`${process.env.REACT_APP_API_URL}/`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home
            isLogin={isLogin}
            userInfo={userInfo}
          />
        </Route>
        <Route path="/feed" exact>
          <FeedDetail />
        </Route>
        <Route path="/feed/upload">
          <FeedUpload />
        </Route>
        <Route path="/landing">
          <Landing />
        </Route>
        <Route path="/mypage">
          <Mypage />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </>
  );
}

export default App;
