import React, { useState } from "react";
import ProductDetails from "../data/productDetails.json";
import Modal from "react-modal";
import "./_modalWindow.css";
import BillingDetails from "../components/billingDetails"

function BookModal({ closeModal }) {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [productDetails, setProduct] = useState("");
  const calculateDays = (toDate, fromDate) => {
    return (
      (new Date(toDate).getTime() - new Date(fromDate).getTime()) /
      (1000 * 3600 * 24)
    );
  };
  return (
    <Modal className="ModalWindow" isOpen={true}>
      <div className="ModalContent">
        <h1>Book Product</h1>
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
        ></input>
        To
        <input
          type="date"
          onChange={(event) => {
            setToDate(event.target.value);
          }}
        ></input>
        <div>
          <span>
            {toDate && calculateDays(toDate, fromDate) < 0
              ? "To date cannot be less than from date"
              : ""}
          </span>
        </div>
        <BillingDetails product={productDetails} days={calculateDays(toDate, fromDate)}/>
          <div className="buttons">
          <button onClick={() => closeModal(false)}>Book</button>
          <button onClick={() => closeModal(false)}>Back</button>
          </div>
      </div>
    </Modal>
  );
}

export default BookModal;
