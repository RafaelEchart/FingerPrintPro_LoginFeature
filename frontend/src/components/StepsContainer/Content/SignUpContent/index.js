import "./style.css";
import SignUpForm from './SignUpForm';

const SignUpContent = ({ visitorData, next, back }) => (
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
     <SignUpForm />
     </div>

     
    </div>
  </>
);

export default SignUpContent;
