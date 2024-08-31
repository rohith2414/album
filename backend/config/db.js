const mysql=require("mysql2/promise");


async function dbConnect() {
    return await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "hackathon",
        password: "anupriya2414"
    });
}

module.exports=dbConnect;