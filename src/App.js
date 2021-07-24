import { useState } from "react";
import "./App.css";
import ProductDetails from "./data/productDetails.json";
import BookModal from "./modal/BookModal";

function App() {
  const [modalOpen, setModalIsOpen] = useState(false);
  const [searchAnything, setSearch] = useState("");
  const [availability, setAvailability] = useState(false);
  return (
    <div className="App">
      <input
        type="text"
        placeholder={"Search by Name or Code"}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      Show only available productDetail:<input type='checkbox' onChange={()=>{availability?setAvailability(false):setAvailability(true)}}></input>
      {modalOpen && <BookModal closeModal={setModalIsOpen}></BookModal>}
      <table><tr>
        <th>Name</th>
        <th>Code</th>
        <th>Availability</th>
        <th>Need to </th>
        <th>Durability</th>
        <th>Mileage</th>
        </tr>
        {ProductDetails.filter((productDetail) => {
          if (searchAnything === '') {
            if(productDetail.availability || !availability)
            return productDetail;
          } else if (
            productDetail.name
              .toLowerCase()
              .includes(searchAnything.toLowerCase()) || productDetail.code
              .toLowerCase()
              .includes(searchAnything.toLowerCase())
            ) {if(productDetail.availability || !availability){
            return productDetail;
            }
          }
        }).map((productDetail, index) => {
          return (
            <tr>
              <td>{productDetail.name}</td>
              <td>{productDetail.code}</td>
              <td>
                {productDetail.availability ? "Available" : "Not available"}
              </td>
              <td>{productDetail.needing_repair ? 'Yes' : 'No'}</td>
              <td>{productDetail.durability}</td>
              <td>{productDetail.mileage ? productDetail.mileage : 0}</td>
            </tr>
          );
        })}
      </table>
      <button onClick={() => setModalIsOpen(true)}>Book</button>
      <button onClick={() => {setSearch('') }}>Clear Search</button>
    </div>
  );
}

export default App;
