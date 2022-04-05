import { useState } from "react";
import { message } from "antd";
import "./style.css";

const SignInForm = ({ visitorData, next }) => {
  const [signInData, setsignInData] = useState({
    email: "",
    password: "",
  });

  const signInInputHandler = (inputInfo, type) => {
    const inputValue = inputInfo.target.value;
    switch (type) {
      case "email":
        setsignInData({ ...signInData, email: inputValue });
        break;

      case "password":
        setsignInData({ ...signInData, password: inputValue });

        break;

      default:
        break;
    }
  };

  const sendData = async () => {
    if (signInData.email.length && signInData.password.length) {
      try {
       let responseData = await fetch("http://localhost:3001/api/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: signInData.email,
            password: signInData.password,
            visitorId: visitorData.visitorId,
          }),
        });

        responseData = await responseData.json()

        if (responseData.error) {
          throw new Error(responseData.error);
        }

        message.success("User authenticated successfully!.");
        // next()
      } catch (err) {
        message.error(err.toString());
        console.log(err);
      }
    } else {
      message.error("Data can not be empty.");
    }
  };

  return (
    <div>
      <div class="signIn_inputWrapper">
        <div class="form-wrapper">
          <form class="form-class" method="post">
            <input
              id="nameInput"
              required
              type="email"
              placeholder="Email or username"
              onChange={(e) => signInInputHandler(e, "email")}
            />
            <input
              type="password"
              id="scoreInput"
              required
              placeholder="Password"
              onChange={(e) => signInInputHandler(e, "password")}
            />
            <button
              type="submit"
              form="pwgen-form"
              id="submitButton"
              onClick={() => sendData()}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
