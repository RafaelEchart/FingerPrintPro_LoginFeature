import { useState, useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import { Spin } from 'antd'
import logo from "./logo.svg";
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

        {isLoading && <Spin size="large" />
}
        {!isLoading && <>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          >
          Learn React
        </a>
          </>
        }
      </header>
    </div>
  );
}

export default App;
