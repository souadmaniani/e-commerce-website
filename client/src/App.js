import './App.css';
import { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import { toast } from "react-toastify";

function App() {
	const [product] = useState({
	  name: "Tesla Roadster",
	  price: 64998.67,
	  description: "Cool car"
	});
  
	async function handleToken(token, addresses) {
	  const response = await axios.post(
		"http://localhost:5000/checkout",
		{ token, product }
	  );
	  const { status } = response.data;
	  console.log("Response:", response.data);
	  if (status === "success") {
		toast("Success! Check email for details", { type: "success" });
	  } else {
		toast("Something went wrong", { type: "error" });
	  }
	}
  
	return (
	  <div className="container">
		<div className="product">
		  <h1>{product.name}</h1>
		  <h3>On Sale · ${product.price}</h3>
		</div>
		<StripeCheckout
		  stripeKey="pk_test_51JrKmtAbmPqrOAcgrIojgctizyZ8kyxZtTRR2LtegW7aVdajM0zZzEQUWdO881LHOEBHTb10pApKYKoHf4Y2DQ6600xglZM2mi"
		  token={handleToken}
		  amount={product.price * 100}
		  name="Tesla Roadster"
		  billingAddress
		  shippingAddress
		/>
	  </div>
	);
  }

export default App;
