import { useState, useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import logo from "./logo.svg";
import "./App.css";

function App() {
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

  };

  const initialFunction = async () => {
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
      </header>
    </div>
  );
}

export default App;
