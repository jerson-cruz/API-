const express =require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');

app.use(bodyParser.json());
const postRoute=require('./routes/postRute');


app.use('/',postRoute); 

app.get('/', (req, res) => {
    res.send('prueba1');

});

async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb+srv://jersonuniversity225:7NDTkirhB1d2v8SY@proyecto1.d71hn.mongodb.net/?retryWrites=true&w=majority&appName=proyecto1');
      console.log('conexion exitosa');
    } catch (err) {
        console.log('eeeeee', err);
    }
}

connectToDatabase();

app.listen(3000, () => {
    console.log('servidor escuchando en el puerto 3000');
});