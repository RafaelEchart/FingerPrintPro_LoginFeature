import "./style.css";
import SignUpForm from './SignUpForm';
import { ArrowLeftOutlined } from "@ant-design/icons";


const SignUpContent = ({ next, back }) => (
  <>
    <div className="signup_division">
      <h2 className="signup_title">
        Create an account to test the Login Feature with the {" "}
        <a
          className="link"
          href="https://fingerprintjs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          FingerPrint JS PRO 
        </a>
        {" "} service.
      </h2>

     <div className="signup_form">
     <SignUpForm next={next} />
     <div className="signup_options">
     <span className="signup_option" onClick={next} >¿Already have an account?</span>
     <span className="signup_option go_back" onClick={back}> <ArrowLeftOutlined /> {" "} Go back</span>
     </div>
     </div>

     
    </div>
  </>
);

export default SignUpContent;
