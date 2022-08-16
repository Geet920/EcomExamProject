import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const KEY =
  "pk_test_51LUw4RSDHfzoIt5CrQHCGrnRX1OklyIbrvqCnsCz2nTaPNNHyk2cVnXK7P0WnCcS6gSUQHb8WIYB6QgtJEs4OrVR00BCtsLnla";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
    // console.log(token)
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StripeCheckout
        name="Geet Shop"
        billingAddress
        shippingAddress
        description="Your total is 200"
        amount={20000}
        token={onToken}
        stripeKey={KEY}
      >
        <button
          style={{
            border: "none",
            width: 120,
            borderRadius: 5,
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Pay now
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Pay;


// import React from "react";
// import { Button } from "@mui/material";
// import styled from "styled-components";
// import axios from "axios";

// const Container = styled.div`
//  display:flex;
//  align-items:center;
//  justify-content:center;
//   padding: 20px;
//   flex-direction:column;
//   font-family: "Raleway";
//   font-size: 1.2em;
//   color: var(--dark-terminal-color);
// `;

// const Paragraph = styled.p`
//   font-size: 20px;
//   margin-top: 20px;
// `;

// function Pay() {
  
//   const handleCheckout = () => {
  
//     axios
//       .post("http://localhost:5000/api/checkout/payment", {
//         amount:10000
//       })
//       .then((response) => {
//         if (response.data.url) {
//           window.location.href = response.data.url;
//         }
//       })
//       .catch((err) => console.log(err.message));
//   };
  
  
  
  
//   return (
//     <Container>
//       <Button variant="contained" color="info" onClick={()=>{handleCheckout()}}>
//           Click to pay
//         </Button>
//         <Paragraph>proceed with Stripe payment</Paragraph>
//     </Container>
//   );
// }

// export default Pay;