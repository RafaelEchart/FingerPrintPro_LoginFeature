import { useState, useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import StepsContainer from './components/StepsContainer';
import SpinLoading from './components/Spinner';
import "./App.css";

function App() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [visitorData, setVisitorData] = useState({
    visitorId: "",
    visitorIdData: "",
  });

  const getVisitorData = async (visitorId) => {
    console.log(visitorId)
    let visitorDataAPI = await fetch("http://localhost:3001/api/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorId: visitorId,
      }),
    });

    visitorDataAPI = await visitorDataAPI.json()
    visitorDataAPI = visitorDataAPI.getVisitorInfoFingerPrintJS
    console.log(visitorDataAPI)
    setVisitorData({ ...visitorData, visitorIdData: visitorDataAPI });
    setIsLoading(false)
  };

  const initialFunction = async () => {
    setIsLoading(true)
    try {
      let visitorId = await FingerprintJS.load({ apiKey: "k4olxEPmCuFGfnxkiJf5" });
      visitorId = await visitorId.get() 
      visitorId = visitorId.visitorId
  
      setVisitorData({ ...visitorData, visitorId: visitorId });
      await getVisitorData(visitorId);
    }catch(err){
      console.log(err)
    }

  };

  useEffect(() => {
    initialFunction();
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        {isLoading ? <SpinLoading /> : <StepsContainer visitorData={visitorData} /> }

      </header>
    </div>
  );
}

export default App;
