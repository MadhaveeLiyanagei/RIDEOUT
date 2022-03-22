const router = require("express").Router();
let vehicle = require("../models/vehicle");

router.route("/add").post((req,res)=>{

    const  modelName = req.body.modelName;
    const  brandName = req.body.brandName;
    const  manufactureYear = req.body.manufactureYear;
    const  price = Number(req.body.price);
    //const  imageURL = Image(req.body.imageURL);

    const newVehicle = new vehicle({
        modelName,
        brandName,
        manufactureYear,
        price
        //imageURL
    })

    newVehicle.save().then(()=>{
        res.json("Vehicle Added");
    }).catch((err)=>{
        console.log(err);
    })
}) 

router.route("/").get((req,res)=>{
    vehicle.find().then((vehicle)=>{
            res.json(vehicle)
    }).catch((err)=>{
            console.log(err)
    })
})

router.route("/update/:id").put(async(res,req)=>{
    let userId = req.params.id;
    const {modelName,brandName,manufactureYear,price}=req.body;

    const updateVehicle = {

        modelName,
        brandName,
        manufactureYear,
        price
        //urlImg
    }

    const update = await vehicle.findByIdAndUpdate(userId, updateVehicle).then(()=>{
        res.status(200).send({status: "Vehicle updated", vehicle: update})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })


})

router.route(" /delete/:id ").delete(async(req,res)=>{
    let userId = req.params.id;

    await vehicle.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"User deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with deleting data",error:err.message});
    })
})

router.route("/get/:id").get(async (req,res)=>{
    let userId = req.params.id;
    await vehicle.findById(userId)
        .then(()=>{
            res.status(200).send({status:"User fetched", user: user})
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({status: "Error with get user",error:err.message});
        })
})

 

module.exports = router;