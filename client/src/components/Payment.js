import { useState, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";

const Payment = () => {
    const [product] = useState({
        name: "Tesla Roadster",
        price: 1.0,
        description: "Cool car"
      });
      const [stripeToken, setstripeToken] = useState();
    
      const handleToken = (token) => {
          setstripeToken(token)
      }
  
      useEffect(() => {
          const makeRequest = async ()=> {
              try {
                  await axios.post(
                      process.env.REACT_APP_CHECKOUT_ENDPOINT,
                      { stripeToken, product }
                    );
                  //   console.log("Success: ", response.data);
              } catch (error) {
                  console.log(error);
              }
          }
          stripeToken && makeRequest();
      }, [stripeToken, product])
  
      return (
        <div className="container">
          <div className="product">
            <h1>{product.name}</h1>
            <h3>On Sale · ${product.price}</h3>
          </div>
          <StripeCheckout
            name="SsoShop"
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            token={handleToken}
            amount={product.price * 100}
            billingAddress
            shippingAddress
          />
        </div>
      );
}

export default Payment
