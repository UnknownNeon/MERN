import express from "express"
import Items from '../models/items.model.js';

const router = express.Router();

router.post("/" , async (request , response )=> {
    const item = request.body;
    if(!item.name || !item.severity || !item.status || !item.image ){
        return response.status(400).json({
            success : false,
            message : "provide all fieds" ,
        });
    }
        const newItem = new Items(item);
        try{
            await newItem.save();
            response.status(201).json({
                success:true,
                data:newItem
            })
        }catch(err){
            console.log(`error in Create Product : ${err.message}`);
            response.status(500).json({
                success : false,
                message : "Server Error " 
            });
        }
})

router.get("/",async (request, response) => {
    try{
        const item = await Items.find({});
        response.status(200).json({
            success: true,
            data: item
        });

    }catch(err){
        response.status(500).json({
            status:false,
            message: "Failed to fetch items "
        })
    }
})

router.put("/:id", async (request,response)=> {
    const {id} = request.params;
    const item = request.body;

    try {
        const updatedItem = await Items.findByIdAndUpdate(id,item, { new:true});
        response.status(200).json({
            success:  true,
            data:updatedItem
        })
    } catch (error) {
        response.status(500).json({status:false , message: "Failed to Update"})
    }
})

router.delete("/:id", async (request,response)=>{
    const {id} = request.params;
    try {
        await Items.findByIdAndDelete(id);
        response.status(200).json({success:true ,
                            message: "Item deletes Successfully"});

    } catch (error) {
        response.status(404).json({success:false,
                                message: "Product Not found"
        })
    }
})

export default router;