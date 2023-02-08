import mongoose from "mongoose";

const categoriesModel = new mongoose.Schema({
    type:{
        type:String,
        default:"Investments"
    },
    color:{
        type:String,
        default:"#fcbe44"
    }
})

const categories = mongoose.model('categories',categoriesModel);

export default categories;