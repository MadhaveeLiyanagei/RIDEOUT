const router = require("express").Router();
const { response, request } = require("express");
let Supplier_Item_Detail = require("../models/supplierItemDetails");

router.route("/add").post((req, res)=>{

    const supItemId = req.body.supItemId;
    const supName = req.body.supName;
    const itemName = req.body.itemName;
    const purchasedDate = req.body.purchasedDate;
    const quantity = req.body.quantity;
    const unitprice = req.body.unitprice;
    const totalAmount = req.body.quantity*unitprice;

    const newItem = new Supplier_Item_Detail({

            supItemId,
            supName ,
            itemName ,
            purchasedDate ,
            quantity ,
            unitprice ,
            totalAmount 

    })

    newItem.save().then(()=>{
        res.json("New Item Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req, res)=>{
    Supplier_Item_Detail.find().then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const {supItemId, supName, itemName, purchasedDate, quantity, unitprice, totalAmount=quantity*unitprice} = req.body;

    const updateItem = {
        supItemId,
        supName,
        itemName,
        purchasedDate,
        quantity,
        unitprice,
        totalAmount
    }

    const update = await Supplier_Item_Detail.findByIdAndUpdate(userId, updateItem).then(() =>{
        res.status(200).send({status: "User update"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating item data", error: err.message})
    })

    // router.route("/delete/:id").delete(async (req, res) => {
    //     let userId = req.params.id;

    //     await Supplier_Item_Detail.findByIdAndDelete(userId).then(() => {
    //         res.status(200).send({status: "User deleted"});

    //     }).catch((err) => {
    //         console.log(err.message);
    //         res.status(500).send({status: "Error with delete item", error: err.message})
    //     })
    // })


    // //get one items's data
    // router.route("/get/:id").get(async (req, res) => {
    //     let userId = req.params.id;

    //     const item = await Supplier_Item_Detail.findById(userId).then((Supplier_Item_Detail) => {
    //     res.status(200).send({status: "User fetched", Supplier_Item_Detail});
    //     }).catch((err) => {
    //         console.log(err.message);
    //         res.status(500).send({status: "Error with get user !", error:err.message});
    //     })
    // })
})

router.route("/delete/:id").delete(async (req , res) => {
    let userId = req.params.id;

    await Supplier_Item_Detail.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User deleted"});
    
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete item", error: err.message})
    })
})



// //get one items's data
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const item = await Supplier_Item_Detail.findById(userId).then((item) => {
        res.status(200).send({status: "User fetched",item});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user !", error:err.message});
    })
})


module.exports = router;