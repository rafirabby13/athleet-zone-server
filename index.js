require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.ATHLETE_USER}:${process.env.ARHLETE_PASS}@cluster0.bbiovs6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    const equipmentCollection = client.db("equipment_db").collection("equipments");
    

    app.post('/equipment', async (req, res)=>{
        const equipmentData = req.body

        const equipment = {
            photo:equipmentData.photo,
            name: equipmentData.name,
            category: equipmentData.category,description: equipmentData.description,price: equipmentData.price,
            rating: equipmentData.rating,customization: equipmentData.customization,
            time: equipmentData.time,
            stock: equipmentData.stock,
            email: equipmentData.email,
            displayName: equipmentData.displayName
        }
        const result = await equipmentCollection.insertOne(equipment);
        res.send(result)
        console.log(equipmentData);
    })

    app.get('/equipment', async (req, res)=>{
        const query = {};
       
        const cursor = await equipmentCollection.find(query).toArray();
        res.send(cursor)
    })

    app.get('/equipment/:id', async (req, res)=>{
        const id = req.params.id
       
        const query = {_id: new ObjectId(id)};
       
        const cursor = await equipmentCollection.findOne(query);
        res.send(cursor)
    })
    app.get('/equip/:email', async (req, res)=>{
        const ema = req.params.email
        console.log(ema);
        const query = {email: ema };
       
        const cursor = await equipmentCollection.find(query).toArray();
        console.log(cursor);
        res.send(cursor)
    })

    app.delete('/equipment/:id', async (req, res)=>{
        const id = req.params.id
        console.log(id);
        const query = {_id: new ObjectId(id)};
       
        const cursor = await equipmentCollection.deleteOne(query);
        res.send(cursor)
    })










    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
  res.send('Athlete Zone server')
})

app.listen(port, () => {
  console.log(`Athlete Zone app listening on port ${port}`)
})