import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useEthers } from "@usedapp/core";
import '../styles/Create.css';


const Create = () => {
  const { activateBrowserWallet } = useEthers();
  const [formParams, setFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    activateBrowserWallet();
  }, [activateBrowserWallet]);

  const updateFormParams = (updatedParams) => {
    setFormParams(updatedParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling the form submission here
  };

  return (
<>
 <Header />
    <div className="create-container">
     
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h3 className="form-heading">Upload your NFT to the marketplace</h3>
          <div className="form-group">
            <label htmlFor="name" className="form-label">NFT Name</label>
            <input
              type="text"
              id="name"
              placeholder="NFT name"
              value={formParams.name}
              onChange={(e) => updateFormParams({ ...formParams, name: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">NFT Description</label>
            <textarea
              id="description"
              placeholder="NFT description"
              value={formParams.description}
              onChange={(e) => updateFormParams({ ...formParams, description: e.target.value })}
              className="form-textarea"
              rows="5"
              cols="40"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price" className="form-label">Price (in ETH)</label>
            <input
              type="number"
              placeholder="Min 0.01 ETH"
              step="0.01"
              value={formParams.price}
              onChange={(e) => updateFormParams({ ...formParams, price: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className="form-label">Upload Image</label>
            <input type="file" onChange={() => {}} className="form-input" />
          </div>
          <br />
          <div className="form-message">{message}</div>
          <button type="submit" className="form-button">
            List NFT
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Create;
