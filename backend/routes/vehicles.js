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

router.put('/update/:id',(req,res) =>{
    vehicle.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post) =>{
            if(err){
                return res.status(500).json({error:err});

            }

            return res.status(200).json({
                success:"Updated Successful"
            });
        }
    );

});

router.route('/delete/:id').delete(async(req,res)=>{
    let userId = req.params.id;

    await vehicle.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"User deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with deleting data",error:err.message});
   })
 })

 router.get("/get/:id",(req,res) =>{
    let userId = req.params.id;
    
    vehicle.findById(userId,(err,post) =>{
        if(err){
            return res.status(500).json({success:false,err});

        }

        return res.status(200).json({
                success:true,
                post
            });

        
    });
});
module.exports = router;