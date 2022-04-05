import "./style.css";
import { List, Button } from "antd";
const HistoryContent = ({ visitorData, next, back }) => (
  <>
    <div className="history_division">
      <h2 className="history_title">
        The <a className="link" href="https://fingerprintjs.com/" target="_blank" rel="noopener noreferrer">FingerPrintJS PRO</a> service also stores the history information, to
        help you identity threats.
      </h2>

      {visitorData && visitorData.visits.length ? (
        <div className="history_list_container">
          <List
            itemLayout="horizontal"
            dataSource={visitorData.visits}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.time}
                  description={<>{item.ipLocation.timezone} - {item.ip} </> }
                />
              </List.Item>
            )}
          />
        </div>
      ) : (
        <span>You must be a new visitor! Please refresh the page.</span>
      )}
      {visitorData && visitorData.visits.length && (
        <>
          <span>You can use this data, to prevent fraud online.</span>
          <div className="history_button_container">
          <Button type="dashed" className="history_button" onClick={back}>
            Back
          </Button>
          <Button type="dashed" className="history_button" onClick={next}>
            Next
          </Button>
          </div>
        </>
      )}
    </div>
  </>
);

export default HistoryContent;
