const dbConnect=require("../config/db");
const { use } = require("../routes/albumRoutes");

async function saveData(userData){
     const connection=await dbConnect();
     const q="insert into users(name, email, password) values (?,?,?)";
     const result=await connection.query(q,userData);
     return result;
}

async function isThere(email){
    const connection = await dbConnect();
    const q=`select * from users where email='${email}'`;
    const result=await connection.query(q);
    return result[0];
}

module.exports={saveData, isThere}