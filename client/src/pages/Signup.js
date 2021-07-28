import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import "./Styles/Signup.css";
import logo from "../static/images/pinGGyeLogo.png";

export default function Signup() {
  // ? ###### Default Value ######
  let pinGGyeURL = process.env.REACT_APP_API_URL;

  // ? ###### 로그인 페이지로 redirect ######
  const history = useHistory();

  // ? ###### 회원가입 정보 state ######
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    nickname: "",
    password: "",
  });
  const handleInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  // ? ###### 에러 메세지 state ######
  // TODO : 에러메세지 로직이 깔끔하지 않아서 수정 예정.
  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [existError, setExistError] = useState("");
  const handleErrorMsg = () => {
    setEmailError("");
    setNicknameError("");
    setPasswordError("");
    setExistError("");
  };

  // ? ###### 회원가입 handler ######
  const handleSignup = () => {
    const { email, nickname, password } = signupInfo;
    handleErrorMsg();
    // TODO : (advanced) 비밀번호 유효성검사
    if (!email) setEmailError("이메일을 입력하세요");
    else if (!nickname) setNicknameError("닉네임을 입력하세요");
    else if (!password) setPasswordError("비밀번호를 입력하세요");
    else {
      // TODO : 서버와 연결 후 axios 요청 주석풀기
      axios({
        method: "post",
        url: `${pinGGyeURL}/users/signup`,
        data: signupInfo,
      })
        .then(() => {
          // 이미 있는 회원일때와 아닐때 메세지 출력
          alert(
            `${nickname}님 회원가입이 완료되었습니다! 최고의 핑계사진을 찾으러 가볼까요?`
          );
          history.push("/");
        })
        // TODO : 이미 있는 회원이라면, 모달창을 띄워서 로그인하러 가시겠습니까? 만들면 좋을듯.
        .catch(() => alert("이미 있는 회원입니다!"));
    }
  };

  return (
    <>
      <img className="signup__logo" src={logo} alt="logo" />
      <div className="main">
        <form className="sign-up" onSubmit={(e) => e.preventDefault()}>
          <div className="main__message">회원가입</div>
          <input
            className="input__email"
            type="email"
            placeholder="Email"
            onChange={handleInputValue("email")}
          />
          <div className="signup__alert-box">{emailError}</div>
          <input
            className="input__nickname"
            type="text"
            placeholder="Nickname"
            onChange={handleInputValue("nickname")}
          />
          <div className="signup__alert-box">{nicknameError}</div>
          <input
            className="input__password"
            type="password"
            placeholder="Password"
            onChange={handleInputValue("password")}
          />
          <div className="signup__alert-box">{passwordError}</div>
          <button
            className="sign-in__btn"
            onClick={() => handleSignup()}
            type="submit"
          >
            Sign in
          </button>
          <div className="signup__alert-box">{existError}</div>
        </form>
      </div>
      <Footer />
    </>
  );
}
