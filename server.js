import express from "express";
import cors from "cors";
import Razorpay from "razorpay";

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
    key_id: "rzp_test_RgpDbOPL0MQNmH",
    key_secret: "mGvxRP9LwedLwHkQGM1KMoMk",
});

app.post("/create-order", async (req, res) => {
    try {
        const options = {
            amount: req.body.amount,
            currency: "INR",
            receipt: "receipt_order_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);
        res.json(order);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create order" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

