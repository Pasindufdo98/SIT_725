
let express = require('express');
let app = express();
const calculatorRoutes = require('./routes/calculatorRoutes');
const { dbConnection } = require('./models/calculatorModel');
const path = require('path');

let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', calculatorRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
    console.log('Express server started on port', port);
    dbConnection();
});
