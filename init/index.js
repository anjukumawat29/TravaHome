const mongoose = require("mongoose");
const initData= require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/TravaHome";

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({ ...obj,owner: '68525b09c7384f7ce3ab2e94'}));
    await Listing.insertMany(initData.data);
}

initDB();