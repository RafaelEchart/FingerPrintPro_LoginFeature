import { useState } from 'react'
import "./style.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Functionalities from './Functionalities'
import SignInForm from './SignInForm'
import ErrorsView from './ErrorsView'

const SignInContent = ({ visitorData, next, back, verify }) => {

  const [ errorsList, setErrorsList ] = useState([])
  

  const errorsHandler = (error) => {
    let errorMessage = error.replace('Error: ', '')
    setErrorsList([ errorMessage, ...errorsList])
  }

  return (
    <>
      <div className="signIn_division">
        <div className="signIn_division_left">
          <div className="signIn_back" onClick={back}> <ArrowLeftOutlined className="signIn_arrow" /> {" "} Back</div>
          <span>
           Test some of the functionalities of the <a className="link" href="https://fingerprintjs.com/" target="_blank" rel="noopener noreferrer">FingerPrintJS PRO library:</a> <br />
           <Functionalities />
          </span>
          
          <SignInForm visitorData={visitorData} next={next} errorsHandler={errorsHandler} verify={verify} />

  
        </div>
        <div className="signIn_division_right">
          {errorsList.length ? <ErrorsView errors={errorsList} /> : null}
        
        
        </div>
      </div>
    </>
  )
}

export default SignInContent;
