const express = require('express');
const bodyParser = require('body-parser');
let path = require('path');
let router2 = require('../src/routers/apiAccount');
const router = require('../src/routers/apiLogin');
require('dotenv').config();

let app = express();

app.use(express.static('./src/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.use('/admin/api1/v1/', router);
app.use('/api/account/', router2);


let port = process.env.PORT || 3999;
app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}/`);
})