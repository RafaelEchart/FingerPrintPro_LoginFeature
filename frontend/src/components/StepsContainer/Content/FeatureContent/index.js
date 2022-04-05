import "./style.css";
import { Timeline, Button } from "antd";
import { ClockCircleOutlined, UserAddOutlined, CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";

const FeatureContent = ({ visitorData, next, back }) => (
  <>
    <div className="feature_division">
      <h2 className="feature_title">
        In this feature we will preform a sign in, which is using the{" "}
        <a
          className="link"
          href="https://fingerprintjs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          FingerPrint JS PRO 
        </a>
        {" "}library, to prevent spoofing and multiple failed attempts.
      </h2>

     <div className="feature_timeline">
     <Timeline>
        <Timeline.Item dot={<UserAddOutlined />} color="green">
        Create an account with Email or Username
        </Timeline.Item>
        <Timeline.Item dot={<CheckCircleOutlined />}color="blue">
        Log in and save this new location
        </Timeline.Item>
        <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />}color="red">
        After 5 failed attempts, account is disabled 
        </Timeline.Item>
        <Timeline.Item dot={<CloseOutlined />}color="red">
        Try to spoof the visitorID.
        </Timeline.Item>

       
      </Timeline>
     </div>

     <>
          <div className="history_button_container">
            <Button type="dashed" className="history_button" onClick={back}>
              Back
            </Button>
            <Button type="dashed" className="history_button" onClick={next}>
              Start
            </Button>
          </div>
        </>
    </div>
  </>
);

export default FeatureContent;
