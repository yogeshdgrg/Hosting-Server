const express = require("express")
const PERSON = require("../models/person")
const router = express.Router()



//* One way to insert data into database 

// router.post('/',async (req,res)=>{
//     const data = req.body
//     console.log(data)
//     console.log("data Type : ",typeof data)
//     const newPerson = new PERSON(data)
//     try{
//         const response = await newPerson.save()
//         console.log("Person data is inserted into database...")
//         res.status(200).json(response)
//     }
//     catch(err){
//         console.log(err)
//     }
// }) 

// * Second way to insert data into database 

router.post('/', async (req, res) => {
    const { name, password, email, ctype } = req.body
    try {
        const response = await PERSON.create({
            name,
            password,
            email,
            ctype
        })
        console.log("Data inserted...")
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(404).json({
            err: "Error at the internal Server..."
        })
    }
})

// * Method for getting all the persons data
router.get("/", async (req, res) => {
    try {
        const response = await PERSON.find({})
        res.send(response)
    }
    catch (err) {
        res.status(404).json({ err: "Error at the internal Server..." })
    }
})

// * Method for updating the person details by passing the users id..
router.patch("/:id", async (req, res)=> {
    const id = req.params.id
    const dataToBeUpdate = req.body
    try{
        const response = await PERSON.findByIdAndUpdate(id, dataToBeUpdate, {
            new: true
        })
        console.log("Data is updated...")
        cosole.log("From POST: ",response)
        res.json(response)
    }
    catch(err) {
        res.status(404).json({
            err: "Error at the internal server..."
        })
    }

})

router.put("/:id", async (req, res)=> {
    const id = req.params.id
    const dataToBeUpdate = req.body
    try{
        const response = await PERSON.findOneAndReplace({_id:id}, dataToBeUpdate, {
            new: true
        })
        console.log("Data is replaced...")
        cosole.log("From PUT: ",response)
        res.json(response)
    }
    catch(err) {
        res.status(404).json({
            err: "Error at the internal server..."
        })
    }

})


router.delete('/:id',async (req,res)=>{
    const id = req.params.id;
    try{
        const response = await PERSON.findByIdAndDelete(id,{
            new:true
        })
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(404).json({
            err:"Error at the internal server..."
        })
    }
})


module.exports = router