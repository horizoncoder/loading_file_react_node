import React, { useState } from "react";
import env from "ts-react-dotenv";
function Clients({ clients } : any) {
  const [message, setMessage] = useState("");
  const [selectedClient, setSelectedClient] = useState({id:'',business_uid:'' });

  const handleSendMessage = () => {
      if(message.length===0){
          alert('message is empty')
            return
      }
      if(selectedClient.id.length===0){
          alert('client no selected')
          return
      }
    fetch(`${env.API_URL}/message/client`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      method: "POST",
      body: JSON.stringify({ message, client_id: selectedClient.id, business_uid: selectedClient.business_uid}),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.message)
      })
      .catch((error) => {
          console.log(error)
       alert('error')
      });
  };

  return (
    <div className="mt-2">
        {
            clients.map((client: any)=>(
                    <ul key={client.id} className=" flex flex-row list-none list-inside">
                        <input
                            name="client"
                            type="radio"
                            checked={client.id === selectedClient.id}
                            onChange={() => setSelectedClient({id: client.id,business_uid: client.business_uid })}
                        />
                        <li>{client.first_name} - {client.id} - {client.tags[0]}</li>
                    </ul>
            )

            )
        }


      <input
        type="text"
        className=' items-center max-w-sm  bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
        value={message}
        onChange={({ target: { value } }) => {
          setMessage(value);
        }}
      />
        <button type="button" className=" mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSendMessage}>Send message</button>
    </div>
  );
}

export default Clients;
