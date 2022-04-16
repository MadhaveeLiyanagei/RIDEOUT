const router = require("express").Router();
let supplier = require("../models/Supplier");

router.route("/add").post((req,res)=>{

    
    const  supplier_name = req.body.supplier_name;
    const  email = req.body. email;
    const  nic  = req.body.nic ;
    const  phone_number = req.body.phone_number;
    const  gender= req.body.gender;


    const newSupplier = new supplier({
        
        supplier_name,
        email,
        nic,
        phone_number,
        gender

    })


    newSupplier.save().then(()=>{
        res.json("Supplier Added");
    }).catch((err)=>{
        console.log(err);
    })
}) 

router.route("/").get((req,res)=>{
    supplier.find().then((supplier)=>{
            res.json(supplier)
    }).catch((err)=>{
            console.log(err)
    })
})

router.put('/update/:id',(req,res) =>{
    supplier.findByIdAndUpdate(
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

    await supplier.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"User deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with deleting data",error:err.message});
   })
 })

 router.get("/get/:id",(req,res) =>{
    let userId = req.params.id;
    
    supplier.findById(userId,(err,post) =>{
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