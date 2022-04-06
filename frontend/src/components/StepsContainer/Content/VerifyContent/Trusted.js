import { Result, Button } from 'antd'
const Trusted = ({back}) => (
    <Result
    status="success"
    title="Welcome back!"
    subTitle="This device is registered as a trusted device, enjoy the experience!"
    extra={[
      <Button type="primary" key="console" onClick={back}>
        Back
      </Button>,
      <a className="link" href="https://fingerprintjs.com/" target="_blank" rel="noopener noreferrer">
          <Button key="buy">FingerPrintJS PRO</Button>
      </a>
    ]}
  />
)

export default Trusted;