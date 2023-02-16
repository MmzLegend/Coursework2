const app = require("express")
const fs = require("fs")
const path = require("path")
let dbConnection = require('./mongo.config')


app.use(cors())

//  logger middleware

app.use((req,res, next)=>{
    console.log("Request IP: "+req.url)
    console.log("Request Date "+ new Date())
    next();
})

//to avoid cors errror
app.use ((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    return next()
})

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

app.put('/collection/:collectionName/:id', async function (req, res, next) {
    await req.collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { space: req.body.space } },
      (e, results) => {
        res.json(results)
        if (e) return next(e)
    })
  })
  
      // serving static files
app.use((req,res,next)=>{
    var filePath = path.join(__dirname, 'images',req.url)
    fs.stat(filePath, function(err,fileInfo){
        if(err){
            next();
            return ;
        }
        if(fileInfo.isFile) res.send(filePath)
        else next()
    })
})


app.listen(4400,() =>console.log)