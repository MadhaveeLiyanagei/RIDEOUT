const router = require("express").Router();
let driver = require("../models/payment");

router.route("/add").post((req,res)=>{

   
    const  userName = req.body.userName;
    const  vehicleNo = req.body.vehicleNo;
    const  paidtDate  = req.body.paidtDate ;
    const  total = req.body.total;
   


    const newPayment = new payment({
        
        userName,
        vehicleNo,
        paidtDate,
        total

    })


    newPayment.save().then(()=>{
        res.json("Payment Added");
    }).catch((err)=>{
        console.log(err);
    })
}) 

router.route("/").get((req,res)=>{
    payment.find().then((payment)=>{
            res.json(payment)
    }).catch((err)=>{
            console.log(err)
    })
})

router.put('/update/:id',(req,res) =>{
    payment.findByIdAndUpdate(
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

    await payment.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"payment deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with deleting data",error:err.message});
   })
 })

 router.get("/get/:id",(req,res) =>{
    let userId = req.params.id;
    
    payment.findById(userId,(err,post) =>{
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