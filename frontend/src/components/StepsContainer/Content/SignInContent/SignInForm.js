import { useState } from "react";
import { message, Switch } from "antd";
import "./style.css";

const SignInForm = ({ visitorData, errorsHandler, verify }) => {
  const [signInData, setsignInData] = useState({
    email: "",
    password: "",
  });

  const [ manualSpoofing, setManualSpoofing ] = useState({state: false, newVisitorID: ""})

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
    //If the manual spoofing is activated then the manualSpoofinf input cannot be empty

    if ( (signInData.email.length && signInData.password.length) && ((manualSpoofing.state && manualSpoofing.newVisitorID.length) || !manualSpoofing.state ) ) {
      try {
       let responseData = await fetch("http://localhost:3001/api/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: signInData.email,
            password: signInData.password,
            visitorId: manualSpoofing.state ? manualSpoofing.newVisitorID : visitorData.visitorId,
          }),
        });

        responseData = await responseData.json()

        if (responseData.error) {
          throw new Error(responseData.error);
        }

        message.success("User authenticated successfully!.");

        if(responseData.authenticated_trusted || responseData.authenticated_not_trusted){
          verify(responseData, signInData)
        }


      } catch (err) {
        message.error(err.toString());
        errorsHandler(err.toString())
      }
    } else {
      message.error("Data can not be empty.");
    }
  };

  const spoofingSwitch = (state) => {
    setManualSpoofing({newVisitorID: "", state: state})
    

  }

  const spoofinghandler = (e) => {
    const newVisitorID = e.target.value
    setManualSpoofing({...manualSpoofing, newVisitorID: newVisitorID})
  }

  

  return (
    <div className="signIn_division">
      <div className="signIn_inputWrapper">
        <div className="form-wrapper">
          <form className="form-class" method="post">
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
      <div className="spoofing_container">
      <Switch onChange={spoofingSwitch} checked={manualSpoofing.state} />{"  "}
      <span>Try manual Spoofing of visitorID</span>

     {manualSpoofing.state &&  <input
              id="newSpoofing"
              type="text"
              className="spoofing_input"
              placeholder={visitorData.visitorId}
              value={manualSpoofing.newVisitorID}
              onChange={(e) => spoofinghandler(e)}
            />}

      </div>
    </div>
  );
};

export default SignInForm;
