import "./style.css";
import { Button } from 'antd'
const WelcomeContent = () => (
  <>
    <div className="welcome_division">
      <div className="welcome_division_left">
        <div className="welcome_title">Welcome</div>
        <span>
          When the user enters the Website, the <a class="link" href="https://fingerprintjs.com/" target="_blank" rel="noopener noreferrer">FingerPrintJS PRO library</a> <br />
          generates an unique ID per browser and user, called <a class="link" href="https://dev.fingerprintjs.com/docs/quick-start-guide#js-agent" target="_blank" rel="noopener noreferrer">VisitorId</a>.
          <br /> This ID is sent to the server to return usefull user information.
        </span>
        <div> 
        <Button type="dashed" className="welcome_button">
          Learn More
        </Button>
        </div>
      </div>
      <div className="welcome_division_right">
      <div className="welcome_visitor_id">
        <span>
        Visitor Id:
        </span>
        <div className="welcome_visitor_visitor_id"> jhgjujh34g32jh4g3</div>
      </div>
      <div className="welcome_history">

      </div>
      </div>
    </div>
  </>
);

export default WelcomeContent;
