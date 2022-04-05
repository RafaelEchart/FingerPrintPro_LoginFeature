import "./style.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Functionalities from './Functionalities'
import SignInForm from './SignInForm'

const signInContent = ({ visitorData, next, back }) => {

  


  return (
    <>
      <div className="signIn_division">
        <div className="signIn_division_left">
          <div className="signIn_back" onClick={back}> <ArrowLeftOutlined className="signIn_arrow" /> {" "} Back</div>
          <span>
           Test some of the functionalities of the <a className="link" href="https://fingerprintjs.com/" target="_blank" rel="noopener noreferrer">FingerPrintJS PRO library:</a> <br />
           <Functionalities />
          </span>
          
          <SignInForm visitorData={visitorData} next={next} />

  
        </div>
        <div className="signIn_division_right">
  
        
        </div>
      </div>
    </>
  )
}

export default signInContent;
