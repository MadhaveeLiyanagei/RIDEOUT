const router = require("express").Router();
const { response } = require("express");
let booking = require("../models/booking");


router.route("/add").post((req,res)=>{

    const username = req.body.username;
    const vehicleNo = req.body.vehicleNo;
    const startDate =  req.body.startDate;
    const endDate = req.body.endDate;

    const newBooking  = new booking({

        username,
        vehicleNo,
        startDate,
        endDate
      
    })


    newBooking.save().then(()=>{
        res.json("Booking Added");
    }).catch((err)=>{
        console.log(err);
    })
}) 


// fetch data

router.route("/").get((req, res) => {

    booking.find().then((bookings)=>{
        res.json(bookings)
    
    }).catch((err)=>{
        console.log(err)
    })

})

//update

router.route("/update/:id").put(async (req, res) => {

    let userId = req.params.id;
    //d structure
    const {username,vehicleNo,startDate,endDate} = req.body;

    const updateBooking = {
        username,
        vehicleNo,
        startDate,
        endDate
      
    }

    const update = await booking.findByIdAndUpdate(userId, updateBooking).then(() => {

        res.status(200).send({status: "Booking Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message });
    }) 

})

//delete

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await booking.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Booking Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete  Booking data!", error:err.message})
    })
})

//get one  data
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const bookingdata = await booking.findById(userId).then((booking) => {
        res.status(200).send({status: "booking fetched", booking});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get details!", error:err.message});
    })

})



module.exports = router;