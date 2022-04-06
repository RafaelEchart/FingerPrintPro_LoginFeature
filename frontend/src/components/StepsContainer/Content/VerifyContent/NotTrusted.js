import { Result, Button, message } from 'antd'
const NotTrusted = ({back, visitorData, userData, spoofing}) => {
  console.log(visitorData)

  const verifyDevice = async () => {
    let visitorID
    if (spoofing && spoofing.state) {
      visitorID = spoofing.newVisitorID
    } else {
      visitorID = visitorData.visitorId
    }


    try {
      let responseData = await fetch("http://localhost:3001/api/verify", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          visitorId: visitorID
        }),
      });

      responseData = await responseData.json();
      
      if (responseData.error) {
        throw new Error(responseData.error);
      }

      message.success("Device is now trusted, sign in again.");
      back()
    } catch (err) {
      message.error(err.toString());
      back()

    }
  }

  



  return (
    <Result
    status="warning"
    title="Verify your account!"
    subTitle="This device is not registered as a trusted device, please enter the code sent to your phone to verify your identity!"
    extra={[
      <Button type="primary" key="console" onClick={back}>
        Back
      </Button>,
      <Button key="buy" onClick={verifyDevice}>Register this device</Button>
    ]}
  />
)
}

export default NotTrusted;