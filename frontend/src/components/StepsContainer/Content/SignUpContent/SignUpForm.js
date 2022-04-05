import { useState } from "react";
import { message } from "antd";
import "./style.css";

const SignUpForm = ({ next }) => {
  const [signUpData, setsignUpData] = useState({
    email: "",
    password: "",
  });

  const signUpInputHandler = (inputInfo, type) => {
    const inputValue = inputInfo.target.value;
    switch (type) {
      case "email":
        setsignUpData({ ...signUpData, email: inputValue });
        break;

      case "password":
        setsignUpData({ ...signUpData, password: inputValue });

        break;

      default:
        break;
    }
  };

  const sendData = async () => {
    if (signUpData.email.length && signUpData.password.length) {
      try {
        await fetch("http://localhost:3001/api/signup", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: signUpData.email,
            password: signUpData.password,
          }),
        });

        message.success("Account successfully created.");
        next()
      } catch (err) {
        console.log(err);
      }
    } else {
      message.error("Data can not be empty.");
    }
  };

  return (
    <div class="inputWrapper">
      <div class="form-wrapper">
        <form class="form-class" method="post">
          <input
            id="nameInput"
            required
            type="email"
            placeholder="Email or username"
            onChange={(e) => signUpInputHandler(e, "email")}
          />
          <input
            type="password"
            id="scoreInput"
            required
            placeholder="Password"
            onChange={(e) => signUpInputHandler(e, "password")}
          />
          <button
            type="submit"
            form="pwgen-form"
            id="submitButton"
            onClick={() => sendData()}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
