import { useState } from "react";
import "./_app.scss"
import ProductDetails from "./data/productDetails.json";
import BookModal from "./modal/BookModal";

function App() {  
  const [modalOpen, setModalIsOpen] = useState(false);
  const [searchAnything, setSearch] = useState("");
  const [availability, setAvailability] = useState(false);
  return (
    <div className="App"><div className='navbar'><h1>Book My product</h1></div>
      <div className="mainContent">
      <input
        type="text"
        placeholder={"Search by Name or Code"}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      Availability:<input type='checkbox' onChange={()=>{availability?setAvailability(false):setAvailability(true)}}></input>
      {modalOpen && <BookModal closeModal={setModalIsOpen}></BookModal>}
      <div className='productTable'><table><tr>
        <th>Name</th>
        <th>Code</th>
        <th>Availability</th>
        <th>Need to Repair </th>
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
      </div>
      <div className='buttons'>
      <button id='bookButton' onClick={() => setModalIsOpen(true)}>Book</button>
      <button id='clearButton'onClick={() => {setSearch('') }}>Clear Search</button>
      </div>
    </div>
    <footer><h1>
      BookMyProduct.com
      </h1>
    </footer>
    </div>
  );
}

export default App;
