const router = require("express").Router();
const { response } = require("express");
let Supplier = require("../models/Supplier");

//http://Localhost:8070/supplier/add
// router.route("/add").post((req, res) =>{
    
//     const supplier_id = req.body.supplier_id;
//     const supplier_name = req.body.supplier_name;
//     const email =  req.body.email;
//     const nic = req.body.nic;
//     const phone_number = req.body.phone_number; 
//     const gender = req.body.gender;

//     const newSupplier = new Supplier ({
//         supplier_id,
//         supplier_name,
//         email,
//         nic,
//         phone_number,
//         gender
//     })

//     newSupplier.save().then(()=> {
//         res.json("Supplier Added")
//     }).catch((err) => {
//         console.log(err);
//     })

// })


router.route("/add").post((req,res)=>{

    const supplier_id = req.body.supplier_id;
    const supplier_name = req.body.supplier_name;
    const email =  req.body.email;
    const nic = req.body.nic;
    const phone_number = req.body.phone_number; 
    const gender = req.body.gender;

    const newSupplier  = new Supplier({

        supplier_id,
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


// fetch data

router.route("/").get((req, res) => {

    Supplier.find().then((suppliers)=>{
        res.json(suppliers)
    
    }).catch((err)=>{
        console.log(err)
    })

})

//update

router.route("/update/:id").put(async (req, res) => {

    let userId = req.params.id;
    //d structure
    const {supplier_id, supplier_name, email, nic, phone_number, gender} = req.body;

    const updateSupplier = {
        supplier_id,
        supplier_name,
        email,
        nic,
        phone_number, 
        gender
    }

    const update = await Supplier.findByIdAndUpdate(userId, updateSupplier).then(() => {

        res.status(200).send({status: "Supplier Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message });
    }) 

})

//delete

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Supplier.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Supplier Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete  supplier data!", error:err.message})
    })
})

//get one  data
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const supplierdata = await Supplier.findById(userId).then((supplier) => {
        res.status(200).send({status: "supplier fetched", supplier});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get details!", error:err.message});
    })

})



module.exports = router;