import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

function CreateRequest() {

  const [purchaseReq, setPurchaseReq] = useState({
    reqNo: "",
    vesselName: "",
    department: "",
    date: "",
    country: "",
    port: "",
    priority: "",
    buyerRemarks: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setPurchaseReq((prevVals) => ({ ...prevVals, [name]: value }));
  }

  console.log("Purchasereq", purchaseReq);

  function handleOrderNow(e) {
    e.preventDefault();
    axios
      .post("http://localhost:7000/createRequest", purchaseReq)
      .then((ack) => {
        alert(ack.data);
      })
      .catch((err) => { console.log(err) });
  }

  const options = ['The Godfather', 'Pulp Fiction'];

  return (
    <div className="createRequestWrapper">
      <div className="headerSection1">
        <p className="pageTitle">Create Request</p>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4b3o9JnTwb9txuA4AE5f4J5Po9BXLJTb1hw&s" width={30}
          height={30} alt="anchor" />
      </div>
      <form className="formContainer" >
        <div className="grid">
          <TextField name="reqNo" id="outlined-search" label="PR No" type="search" size="small" required onChange={handleChange} />
          <TextField name="vesselName" id="outlined-search" label="Vessel Name" type="search" size="small" onChange={handleChange} />
          <select name="department" id="department" className="dropdown" onChange={handleChange}>
            <option value={"Engine"}>Engine</option>
            <option value={"Deck"}>Deck</option>
            <option value={"Galley"}>Galley</option>
          </select>

          <input type="datetime-local" name="date" id="date" className="datepicker" onChange={handleChange} />
          

          <select name="country" id="country" className="dropdown" onChange={handleChange} >
            <option value={"India"}>India</option>
            <option value={"China"}>China</option>
            <option value={"sri lanka"}>Sri Lanka</option>
          </select>


          <select name="port" id="port" className="dropdown" onChange={handleChange} >
            <option value={"Chennai"}>Chennai</option>
            <option value={"Mumbai"}>Mumbai</option>
            <option value={"Kochi"}>Kochi</option>
          </select>


          <select name="priority" id="priority" className="dropdown" onChange={handleChange} >
            <option value={"Immediate"}>Immediate</option>
            <option value={"High"}>High</option>
            <option value={"Critical"}>Critical</option>
            <option value={"Low"}>Low</option>
          </select>

          <textarea name="buyerRemarks" id="buyerRemarks" placeholder="Remarks to Seller" required className="remarks" onChange={handleChange} >
          </textarea>

          <Autocomplete
            disablePortal
            options={options}
            sx={{ width: 200, height: 35 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />

          <Button size="small" color="success" variant="contained" sx={{
            height: "35px",
            width: "100px",
            textTransform: "capitalize"
          }} onClick={handleOrderNow} >Order</Button>
        </div>
      </form>

    </div>
  )
}

export default CreateRequest;