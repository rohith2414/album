const dbConnect=require("../config/db");

async function getAllAlbums(){
    const connection= await dbConnect();
    const [results]= await connection.query("select * from albums");
    return results;
}

async function getAlbum(id){
    const connection= await dbConnect();
    const [results]= await connection.query(`select * from albums where id=${id}`);
    return results[0];
}

async function createAlbum(albumData) {
    const connection = await dbConnect();
    const q = `insert into albums (title , artist, genre , release_year, rating , cover_image)
     values ( ?, ? , ? , ?, ? , ?)`;
    const [results] = await connection.query(q, albumData);
    return results;
}

async function updateAlbum(id, albumData) {
    const connection = await dbConnect();
    const q = `
        update albums set 
            title = ?,
            artist = ?,
            genre = ?,
            release_year = ?,
            rating = ?,
            cover_image = ?
        where id = ?`;
    const [results] = await connection.query(q, [...albumData, id]);
    return results;
}

async function deleteAlbum(id) {
    const connection = await dbConnect();
    const [results] = await connection.query('delete from albums where id = ?', [id]);
    return results;
}



module.exports={getAllAlbums, getAlbum, createAlbum, updateAlbum, deleteAlbum};