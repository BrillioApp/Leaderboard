import React, { useState } from "react";
import * as XLSX from "xlsx";
import './file.css';
import { useDispatch} from "react-redux"
import { useHistory } from "react-router";
const File = () => {
  
  const [selectedFile, setSelectedFile] = useState('');
  const dispatch=useDispatch();
  const history=useHistory();


  const filePathset = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const readFile = () => {
    if (selectedFile) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (e) => {
        let data = e.target.result;
        let workbook = XLSX.read(data, { type: "binary" });
        console.log(workbook);
        workbook.SheetNames.forEach((sheet) => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
          dispatch({type:'submit',payload:rowObject})
          history.push('/')
      
          


        })
      }
    }
  }

  return (<div className='file'>

    <input
      type="file"
      id="input"
      accept='.xlx,.xlsx'
      onChange={filePathset}
    />
    <button className="btn btn-warning" onClick={readFile}>
      Submit
    </button>
  </div>
  );
}


export default File;