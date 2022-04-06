import SpinLoading from '../../../Spinner';
import Trusted from './Trusted';
import NotTrusted from './NotTrusted';

const VerifyContent = ({ visitorData, data, back }) => {

  console.log(data)


  return(
    <>
      {data.verifiedData
      ? 
      
      <>
      {data.verifiedData.authenticated_trusted && <Trusted back={back} /> }
      {data.verifiedData.authenticated_not_trusted && <NotTrusted back={back} visitorData={visitorData} userData={data.userData} spoofing={data.spoofing} /> }
      </>

      
      : <SpinLoading />}
    </>
  )
}

export default VerifyContent;
