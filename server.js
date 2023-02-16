const app = require("express")
const fs = require("fs")
const path = require("path")
let dbConnection = require('./mongo.config')

app.get('/lessons', async (req, res) => {
    console.log('getting lessons',req.query)

    const response = await dbConnection.db("Coursework2").collection("Lessons").find().toArray();
     if (response) {
        console.log('getting lessons',response)
        res.json(response)
    } else { 
        res.json({
            acknowledged: false,
            message: 'Unable to fetch lessons'
        })
    }
})

app.post('/Order', async (req, res) => {
    console.log('ADD NEW ORDER',req.body)

    const response = await dbConnection.db("Coursework2").collection("Orders").insertOne(req.body.order);
     if (response) {
        res.json(response)
    } else { 
        res.json({
            success: false,
            message: 'Unable to add new order at the moment'
        })
    }
})

app.post('/increase-order', async (req, res) => {
    console.log('INCREASE ORDER',req.body)

    const response = await dbConnection.db("Coursework2").collection("Orders").findOneAndUpdate({ name: req.body.name}, { $set: req.body.data });
     if (response) {
        console.log('INCREASE ORDER RESPONSE',response)
        res.json(response)
    } else { 
        res.json({
            success: false,
            message: 'Unable to add new order at the moment'
        })
    }
})

app.listen(4400,() =>console.log)