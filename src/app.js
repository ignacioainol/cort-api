const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')

//config
app.set('port', 3000 || process.env.PORT);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use(require('./routes'));

app.listen(process.env.PORT || 3000, () => {
    console.log("api running on port 3000");
})