import { Timeline } from 'antd'
import './style.css'

const ErrorsView = ({errors}) => (

    <div className="errors_view">

        <h3>Logs:</h3>

        <div className="errors_container">
        <Timeline mode="right">
        {errors.map((error) => (
          <Timeline.Item color="red">{error}</Timeline.Item>
        ))}
        </Timeline>
    </div>
    </div>


)

export default ErrorsView;