import React, { useState } from "react";
import ProductDetails from "../data/productDetails.json";
import Modal from "react-modal";
import "../style/_bookModal.scss";
import BillingDetails from "./billingDetails"

function BookModal({ closeModal }) {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [productDetails, setProduct] = useState("");
  const getTodaysDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let todaysDate = '';
    if(month < 10) {
      todaysDate = year+'-0'+month+'-'+day;
    }
    else {
      todaysDate = year+'-'+month+'-'+day;
    }
    return todaysDate;

  }
  const calculateDays = (toDate, fromDate) => {
    return (
      (new Date(toDate).getTime() - new Date(fromDate).getTime()) /
      (1000 * 3600 * 24)
    );
  };
  return (
    <Modal className="ModalWindow" isOpen={true}>
      <div className="ModalContent">
        <div className='modalHeading'><h1>Book Product</h1></div>
        Select Product:-
        <select
          onChange={(event) => {
            setProduct(event.target.value);
          }}
        >
          <option value="Select from DropDown" selected></option>
          {ProductDetails.filter((productDetail) => {
            if (productDetail.availability) {
              return productDetail;
            }
          }).map((productDetail, index) => {
            return (
              <option>{productDetail.name + " " + productDetail.code}</option>
            );
          })}
        </select>
        From
        <input
          type="date"
          onChange={(event) => {
            setFromDate(event.target.value);
          }}
          min={getTodaysDate()}
        ></input>
        To
        <input
          type="date"
          onChange={(event) => {
            setToDate(event.target.value);
          }}
          min={getTodaysDate()}
        ></input>
        <div className='warning'>
            {toDate && calculateDays(toDate, fromDate) < 0
              ? "To date cannot be less than from date"
              : ""}
        </div>
        <BillingDetails product={productDetails} days={calculateDays(toDate, fromDate)} closeModal={closeModal}/>
      </div>
    </Modal>
  );
}

export default BookModal;
