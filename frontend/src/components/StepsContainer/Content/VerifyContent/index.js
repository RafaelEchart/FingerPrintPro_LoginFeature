import SpinLoading from '../../../Spinner';
import Trusted from './Trusted';
import NotTrusted from './NotTrusted';

const VerifyContent = ({ visitorData, data, back }) => {



  return(
    <>
      {data.verifiedData
      ? 
      
      <>
      {data.verifiedData.authenticated_trusted && <Trusted back={back} /> }
      {data.verifiedData.authenticated_not_trusted && <NotTrusted back={back} visitorData={visitorData} userData={data.userData} /> }
      </>

      
      : <SpinLoading />}
    </>
  )
}

export default VerifyContent;
