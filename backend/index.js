const express=require("express");
const bodyParser=require("body-parser");
const app= express();
const routeAlbum=require("./routes/albumRoutes");
const cors = require('cors');
const authRouter=require('./routes/authRouter');


app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));

app.use(routeAlbum);
app.use('/auth',authRouter);


app.listen(8080,() => {
    console.log("app running on 8080 port");
})
