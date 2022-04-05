import { useState } from 'react'
import { Steps } from 'antd';
import WelcomeContent from './Content/WelcomeContent'


const StepsContainer = () => { 

    const [ currentStep, setCurrentStep ] = useState(0)



    const { Step } = Steps;

    const stepOptions = [
        {
          title: 'Welcome',
          content: <WelcomeContent/>,
        },
        {
          title: 'Sign Up',
          content: 'Second-content',
        },
        {
          title: 'Feature',
          content: 'Last-content',
        },
        {
          title: 'Sign Up',
          content: 'First-content',
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