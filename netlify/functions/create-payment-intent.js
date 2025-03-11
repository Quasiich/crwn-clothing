require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ["card"]
        });

        console.log("Created payment intent ID:", paymentIntent.id);

        return {
            statusCode: 200,
            body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        }
    } catch (error) {
        console.log({error});


        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
   }
}