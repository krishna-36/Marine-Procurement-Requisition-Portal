import mongoose from "mongoose";
import express, {urlencoded} from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded());

mongoose
    .connect("mongodb://localhost:27017/procurement")
    .then((ack)=>{
        if(ack)
        {
            console.log("connected");
        }
    })
    .catch((err)=>{
        console.log("error", err);
    });

const reqSchema = new mongoose.Schema({
    buyerRemarks: String,
    country: String,
    date: String,
    department: String,
    port: String,
    priority: String,
    reqNo: String,
    vesselName: String
});

const requestCollection = mongoose.model("purchaseRequests", reqSchema);

app.post("/createRequest", (req,res)=>{
    console.log(req.body);
    requestCollection.findOne({reqNo: req.body.reqNo}).then((isReqExists) => {
        if(isReqExists)
        {
            res.send("Please Use a Different PR No");
        } else {
            const newPurchaseRequest = requestCollection(req.body);
            newPurchaseRequest
                .save()
                .then((isSaved) => {
                if(isSaved)
                {
                    res.send("Purchase Request Created Successfully!");
                }
                else {
                    res.send("Error in Creating Purchase Request");
                }
                })
                .catch((exeerror) => {
                    console.log(exeerror);  
                });
        }
    }).catch(()=>{})
});

app.get("/get-my-orders", async (req, res) => {
    const allOrders = await requestCollection.find();
    console.log("my requests", allOrders);
    res.send(allOrders);
});

app.listen(7000, ()=>{
    console.log("Server started at port no. 7000")
});

