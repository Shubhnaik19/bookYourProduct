import { useState } from "react";
import ProductDetails from "../data/productDetails.json";
import '../style/_billingDetails.scss';

function BillingDetails({ product, days, closeModal }) {
  const [bookingStatus, setBookingStatus] = useState(false);
  return <div className="billingDetails"> {product !== ""
    ? ProductDetails.map((productDetail, index) => {
        if ((productDetail.name + " " + productDetail.code).includes(product)) {
          return (
            <div className='billingDetails'>{productDetail.needing_repair ? <div className='warning'>This product need to be repaired </div>:
              days < productDetail.minimum_rent_period ? <div className='warning'>Minimun rent period for this product id :{productDetail.minimum_rent_period}</div>:
              <div>
              <h4>Product Name:{productDetail.name} </h4>
              {days !== null && days > 0 && (
                <h4>Total Price:{productDetail.price * days}/-</h4>
              )}
              <h4>
                {days !== null &&
                  days > 0 &&
                  "Mileage: " + (productDetail.mileage + days * 10)}
              </h4>
              <h4>
                {days !== null &&
                  days > 0 &&
                  "Durability on return date:" + (productDetail.type !== 'plain'? (productDetail.durability - 4*days) : (productDetail.durability - days))
                }
              </h4>
              </div>
        }
            </div>
          );
        }
      })
    : ""}
    {days !== null && days > 0 && bookingStatus && <h4 className="success"> This product booked succesfully </h4>}
     <div className="buttons">{days !== null && days > 0 &&
          <button id='bookButton' onClick={() => setBookingStatus(true)}>Book</button>
          }
          <button id='backButton'onClick={() => closeModal(false)}>Back</button>
          </div>
    </div>;
}


export default BillingDetails;
