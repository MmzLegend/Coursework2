const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Mmzlegend23:Mxkht2721@cluster0.k3258d9.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client;