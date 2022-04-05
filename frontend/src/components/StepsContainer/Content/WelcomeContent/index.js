import "./style.css";
import { Button } from 'antd'
import SpinLoading from '../../../Spinner';

const WelcomeContent = ({ visitorData, next }) => (
  <>
    <div className="welcome_division">
      <div className="welcome_division_left">
        <div className="welcome_title">Welcome</div>
        <span>
          When the user enters the Website, the <a className="link" href="https://fingerprintjs.com/" target="_blank" rel="noopener noreferrer">FingerPrintJS PRO library</a> <br />
          generates an unique ID per browser and user, called <a className="link" href="https://dev.fingerprintjs.com/docs/quick-start-guide#js-agent" target="_blank" rel="noopener noreferrer">VisitorId</a>.
          <br /> This ID is sent to the server to return usefull user information.
        </span>
        <div> 
        <Button type="dashed" className="welcome_button" onClick={next}>
          Learn More
        </Button>
        </div>
      </div>
      <div className="welcome_division_right">
      <div className="welcome_visitor_id">
        <span>
        Visitor Id:
        </span>
        <div className="welcome_visitor_visitor_id"> {visitorData && visitorData.visitorId}</div>
      </div>
      <div className="welcome_visitor_data">
       {
         visitorData && visitorData.visits.length ? 
         <>
         <div><span>IP: { visitorData.visits[0].ip}</span></div> 
         <div><span>Latitude: { visitorData.visits[0].ipLocation.latitude }</span></div> 
         <div><span>Longitude: { visitorData.visits[0].ipLocation.longitude }</span></div> 
         <div><span>Country: { visitorData.visits[0].ipLocation.country.name }</span></div> 
         <div><span>Browser: { visitorData.visits[0].browserDetails.browserName }</span></div> 
         </>
         : <SpinLoading />
       }
      </div>
      </div>
    </div>
  </>
);

export default WelcomeContent;
