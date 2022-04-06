import { useState } from 'react'
import { Steps } from 'antd';
import WelcomeContent from './Content/WelcomeContent'
import HistoryContent from './Content/HistoryContent'
import FeatureContent from './Content/FeatureContent'
import SignUpContent from './Content/SignUpContent'
import SignInContent from './Content/SignInContent'
import VerifyContent from './Content/VerifyContent'


const StepsContainer = ({ visitorData }) => { 

    const [ currentStep, setCurrentStep ] = useState(0)
    const [ isTrustedDevice, setIsTrustedDevice ] = useState({verifiedData: undefined, userData: undefined})

    const next = () => {
      setCurrentStep(currentStep + 1);
    };
  
    const back = () => {
      setCurrentStep(currentStep - 1);
    };


    const { Step } = Steps;

    //To Handle verification of new device 
    const handleVerification = (verifiedData, userData) => {
      
      setIsTrustedDevice({verifiedData, userData: userData })
      next()
    }

    const stepOptions = [
        {
          title: 'Welcome',
          content: <WelcomeContent visitorData={visitorData} next={next} />,
        },
        {
          title: 'History',
          content: <HistoryContent visitorData={visitorData} next={next} back={back} />,
        },
        {
          title: 'Feature',
          content: <FeatureContent visitorData={visitorData} next={next} back={back} />,
        },
        {
          title: 'Sign Up',
          content: <SignUpContent next={next} back={back} />,
        },
        {
          title: 'Sign In',
          content: <SignInContent visitorData={visitorData} next={next} back={back} verify={handleVerification} />,
        },
        {
          title: 'Verify',
          content: <VerifyContent visitorData={visitorData} back={back} data={isTrustedDevice} />,
        },
      ];

 return(
     <>

<Steps current={currentStep}>
        {stepOptions.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
    
    <div className="steps-content">
    {stepOptions[currentStep].content}

    </div>
      

     </>

 )



}

export default StepsContainer;