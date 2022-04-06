import { Popover } from'antd'
import { InfoCircleOutlined } from "@ant-design/icons";

const Functionalities = () => {

    const failedAttemptsContent = (
        <div>
          <p>
            After 5 failed login attempts in 5 minutes,<br/>
            the login functionality wont be avaiable.
          </p>
        </div>
      )
      
      const failedAttemptsWithSpoofingContent = (
        <div>
          <p>
            After 5 failed login attempts in 5 minutes,<br/>
            the system will check if different VisitorId are <br/>
            being used to commit fraud.
          </p>
        </div>
      )
      
      const registerNewDeviceContent = (
        <div>
          <p>
            If login is sucessfull then the system<br/>
            will check if the visitorId was <br/>
            previously saved as a trusted device.
          </p>
        </div>
      )

    return (
        <ul>
             <li>
               Detect multiple failed attempts. <Popover content={failedAttemptsContent}><InfoCircleOutlined className="signIn_info_icon" /></Popover>
             </li>
             <li>
               Detect multiple failed attempts with fraud (Spoofing). <Popover content={failedAttemptsWithSpoofingContent}><InfoCircleOutlined className="signIn_info_icon" /></Popover>
             </li>
             <li>
               Register new device when login is sucessfull. <Popover content={registerNewDeviceContent}><InfoCircleOutlined className="signIn_info_icon" /></Popover>
             </li>
           </ul>
    )
}

export default Functionalities;