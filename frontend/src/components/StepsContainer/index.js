import { useState } from 'react'
import { Steps } from 'antd';
import WelcomeContent from './Content/WelcomeContent'
import HistoryContent from './Content/HistoryContent'
import FeatureContent from './Content/FeatureContent'
import SignUpContent from './Content/SignUpContent'


const StepsContainer = ({ visitorData }) => { 

    const [ currentStep, setCurrentStep ] = useState(0)
    console.log(visitorData)

    const next = () => {
      console.log('next')
      setCurrentStep(currentStep + 1);
    };
  
    const back = () => {
      setCurrentStep(currentStep - 1);
    };


    const { Step } = Steps;

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
          content: <SignUpContent visitorData={visitorData} next={next} back={back} />,
        },
        {
          title: 'Sign In',
          content: 'Second-content',
        },
        {
          title: 'Verify',
          content: 'Last-content',
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