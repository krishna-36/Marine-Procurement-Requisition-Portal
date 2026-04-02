import mongoose from "mongoose";
import express, { urlencoded } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded());

mongoose
  .connect("mongodb://localhost:27017/procurement")
  .then((ack) => {
    if (ack) {
      console.log("connected");
    }
  })
  .catch((err) => {
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
  vesselName: String,
});

const requestCollection = mongoose.model("purchaseRequests", reqSchema);

const signupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const signupCollection = new mongoose.model("users", signupSchema);

app.post("/createRequest", (req, res) => {
  console.log(req.body);
  requestCollection
    .findOne({ reqNo: req.body.reqNo })
    .then((isReqExists) => {
      if (isReqExists) {
        res.send("Please Use a Different PR No");
      } else {
        const newPurchaseRequest = requestCollection(req.body);
        newPurchaseRequest
          .save()
          .then((isSaved) => {
            if (isSaved) {
              res.send("Purchase Request Created Successfully!");
            } else {
              res.send("Error in Creating Purchase Request");
            }
          })
          .catch((exeerror) => {
            console.log(exeerror);
          });
      }
    })
    .catch(() => {});
});

app.get("/get-my-orders", async (req, res) => {
  const allOrders = await requestCollection.find();
  console.log("my requests", allOrders);
  res.send(allOrders);
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  signupCollection
    .findOne({ email: req.body.email })
    .then((isPresent) => {
      if (isPresent) {
        res.send("This Email is already Registered, Try Logging in !");
      } else {
        const newAccount = signupCollection(req.body);
        newAccount.save().then((isSaved) => {
          if (isSaved) {
            res.send("Account Created Successfully");
          } else {
            res.send("Error in Creating an Account, Please try again later !");
          }
        });
      }
    })
    .catch();
});

app.post("/login", (req, res) => {
  console.log("req", req.body);
  signupCollection
    .findOne({ email: req.body.email })
    .then((isAuthorized) => {
      if (isAuthorized) {
        console.log(isAuthorized);
        res.send(isAuthorized);
      } else {
        res.send("unauthorized");
      }
    })
    .catch((exe) => {
      res.send("Something went wrong, Please try again later");
    });
});

app.listen(7000, () => {
  console.log("Server started at port no. 7000");
});
