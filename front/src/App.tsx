import React, {useState} from 'react';
import './App.css';

import Upload from "./components/Upload";
import Clients from "./components/Clients";
function App() {
    const [clients, setClients] = useState<Array<object>>([])
  return (
    <div className="container">

            <Upload setClients={setClients}/>
            <Clients clients={clients}/>
    </div>
  );
}

export default App;
