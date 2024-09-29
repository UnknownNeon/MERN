import mongoose from "mongoose";

const itemSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    severity: {
        type: Number,
        required: true
    },
    image: {
        type : String ,
        required: true
    },
    status : {
        type : String ,
        required: true
    },
    description: {
        type : String,
    }
},
{timestamps : true}
);

const Items = mongoose.model('Item',itemSchema);
export default Items;