let express = require('express');
let app = express();
const http = require('http');
const socketIo = require('socket.io');
const calculatorRoutes = require('./routes/calculatorRoutes');
const { dbConnection, getAllData } = require('./models/calculatorModel'); 
const path = require('path');


const server = http.createServer(app);
const io = socketIo(server);

let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', calculatorRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


io.on('connection', (socket) => {
    console.log('A user connected, user id:', socket.id);

    // Send random calculation data to the connected user after 1 second
    setTimeout(async () => {
        const calcData = await getRandomCalcData(); 
        socket.emit('randomCalculation', calcData); 
    }, 1000);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

//get random calculation data from the DB
const getRandomCalcData = async () => {
    const allData = await new Promise((resolve, reject) => {
        getAllData((err, result) => { 
            if (err) reject(err);
            resolve(result);
        });
    });

    if (allData.length > 0) {
        const randomIndex = Math.floor(Math.random() * allData.length);
        return allData[randomIndex];
    } else {
        return { message: 'No data available' };
    }
};

server.listen(port, () => {
    console.log('Express server started on port', port);
    dbConnection();
});
