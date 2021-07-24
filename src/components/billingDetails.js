import ProductDetails from "../data/productDetails.json";

function billingDetails({ product, days }) {
  return (product !== ""
    ? ProductDetails.map((productDetail, index) => {
        if ((productDetail.name + " " + productDetail.code).includes(product)) {
          return (
            <div>
              <h4>Product Name:{productDetail.name} </h4>
              {days !== null && days > 0 && (
                <h4>Total Price: +{productDetail.price * days}</h4>
              )}
              <h4>
                {days !== null &&
                  days > 0 &&
                  "Mileage: " + (productDetail.mileage + days * 10)}
              </h4>
              <h4>
                {days < productDetail.minimum_rent_period &&
                  "Min rent period for this product is :" +
                    productDetail.minimum_rent_period}
              </h4>
            </div>
          );
        }
      })
    : "");
}

export default billingDetails;
