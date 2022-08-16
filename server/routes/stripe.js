// const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// router.post("/payment", (req, res) => {
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "inr",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });

// module.exports = router;


const router = require("express").Router()

router.post("/payment" , async (req , res) => {
    try{
        const stripe = require('stripe')(process.env.STRIPE_KEY);
        const paymentIntent = await stripe.paymentIntents.create({
            source:req.body.tokenId,
            amount:req.body.amount,
            currency:"inr",
            payment_method_types: ['card'],
        });
        res.status(200).json(paymentIntent)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;




// const router = require("express").Router();
// const secret_key =
//   "sk_test_51LUw4RSDHfzoIt5CQzcyIsdCmWLYGgqmJavlLnyEbd9UtS9dZCDe7mxZQbOYYaDCeIHGDEtc45S1OEpgFqGHBbyx00dfbM6rNn";
// const stripe = require("stripe")(secret_key);

// router.post('/payment', async (req, res) => {
  
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: 'inr',
//           product_data: {
//             name: 'T-shirt',
//           },
//           unit_amount: req.body.amount,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: 'http://localhost:3000/success',
//     cancel_url: 'http://localhost:3000/failure',
//   });

//   res.send({ url: session.url });
// });


// module.exports = router;
