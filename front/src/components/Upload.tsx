import React, { useState } from "react";
import {tags} from '../types/enums/tags'
import env from "ts-react-dotenv";
const UploadFile = ({ setClients } : any) => {
  const [selectedFile, setSelectedFile] = useState();
  const [tag, setTag] = useState<string>(tags.follow_up);
  const [isFileUpload, setIsFileUpload] = useState<boolean>(false);


  const changeHandler = (event: any) => {
    if (event.target.files[0].type === "text/csv") {
      setSelectedFile(event.target.files[0]);
      setIsFileUpload(true);
    } else {
      alert('Choose csv file format')
    }
  };

  const handleUpload = () => {
    if(!isFileUpload){
      alert('Upload your file')
      return
    }
    const formData = new FormData();

    // @ts-ignore
    formData.append("file", selectedFile);
    formData.append("tag", tag);
    fetch(`${env.API_URL}/upload/clients`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
      if(result.status=== 400){
        alert(result.message);
      }
        if(result.data.length>0){
          setClients(result.data);
        }else{
          alert('Nothing found');
        }

      })
      .catch((error) => {
        console.log(error)
        alert('error check your file, make sure that the business_uid is entered correctly!')
      });
  };


  return (
    <div>

      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload
        file</label>
      <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help" id="file_input" type="file" onChange={changeHandler}/>
        <p className="mt-1 text-sm text-red-500 dark:text-red-300" id="file_input_help">Attention upload csv file only</p>
      <div className='flex  flex-row p-2 '>
        <button className=" ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpload}>Select tag</button>
        <input
          type="text"
          className="        className=' items-center max-w-sm ml-2  bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'"
          placeholder="tag"
          value={tag}
          onChange={({ target: { value } }) => {
            setTag(value);
          }}
        />
      </div>
    </div>
  );
};

export default UploadFile;
