const router = require("express").Router();
const { response } = require("express");
let driver = require("../models/driver");

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

    const driver_id = req.body.driver_id;
    const driver_name = req.body.driver_name;
    const email =  req.body.email;
    const nic = req.body.nic;
    const phone_number = req.body.phone_number; 
    const gender = req.body.gender;

    const newDriver  = new driver({

        driver_id,
        driver_name,
        email,
        nic,
        phone_number,
        gender
      
    })


    newDriver.save().then(()=>{
        res.json("driver Added");
    }).catch((err)=>{
        console.log(err);
    })
}) 


// fetch data

router.route("/").get((req, res) => {

    driver.find().then((drivers)=>{
        res.json(drivers)
    
    }).catch((err)=>{
        console.log(err)
    })

})

//update

router.route("/update/:id").put(async (req, res) => {

    let userId = req.params.id;
    //d structure
    const {driver_id, driver_name, email, nic, phone_number, gender} = req.body;

    const updateDriver = {
        driver_id,
        driver_name,
        email,
        nic,
        phone_number, 
        gender
    }

    const update = await driver.findByIdAndUpdate(userId, updateDriver).then(() => {

        res.status(200).send({status: "driver Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message });
    }) 

})

//delete

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await driver.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "driver Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete  driver data!", error:err.message})
    })
})

//get one  data
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const driverData = await driver.findById(userId).then((driver) => {
        res.status(200).send({status: "driver fetched", driver});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get details!", error:err.message});
    })

})



module.exports = router;