let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri = "mongodb://localhost:27017";
const uri = "mongodb+srv://fpasindu:7mwJk6VCJkgee90t@cluster0.t3euju3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function dbConnection() {
    try {
        await client.connect();
        collection = client.db("MyCal").collection('CalData');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}



const addTwoNumber= (n1,n2) => {
    return n1+n2;
}

const subTwoNumber= (n1,n2) => {
    return n1-n2;
}

const mulTwoNumber= (n1,n2) =>{
    return n1*n2;
}

app.get("/addTwoNumber", (req,res)=>{
    const n1= parseInt(req.query.n1);
    const n2=parseInt(req.query.n2);
    const sum = addTwoNumber(n1,n2);

    const data = {
        number1: n1,
        number2: n2,
        result: sum,
        type: 'SUM'
    }

    postData(data, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data: sum, message:'success'});
        }
    });

    // res.json({statuscocde:200, data: result }); 
});

app.get("/subTwoNumber", (req,res)=>{
    const n1= parseInt(req.query.n1);
    const n2=parseInt(req.query.n2);
    const sub = subTwoNumber(n1,n2);

    const data = {
        number1: n1,
        number2: n2,
        result: sub,
        type: 'SUB'
    }

    postData(data, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data: sub, message:'success'});
        }
    });

    // res.json({statuscocde:200, data: result }); 
});

app.get("/mulTwoNumber", (req,res)=>{
    const n1= parseInt(req.query.n1);
    const n2=parseInt(req.query.n2);
    const mul = mulTwoNumber(n1,n2);

    const data = {
        number1: n1,
        number2: n2,
        result: mul,
        type: 'MUL'
    }

    postData(data, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data: mul, message:'success'});
        }
    });

    // res.json({statuscocde:200, data: result }); 
});

app.get('/api/calcData', (req,res) => {
    getAllData((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'get all data successful'});
        } else {
            console.log(err);
        }
    });
});




app.get("/Display", (req, res) => {
    const n1 = "<html><body><H1>HELLO THERE </H1></body></html>";
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(n1));     
})

function postData(dat, callback) {
    collection.insertOne(dat, callback);
}

function getAllData(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, ()=>{
    console.log('express server started');
    dbConnection();
});

// function getOneData(callback) {
//     collection.findOne({}, callback);
// }