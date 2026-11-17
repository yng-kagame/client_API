
import 'dotenv/config'
import mysql from 'mysql2/promise';

/*create pool connection: group db connection that can be reused.
Avoids the overhead of repeatedly creating & closing
db connections for each query*/

const pool= mysql.createPool({
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT) || 3306,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

export const testConnection = async ()=>{
    try{
        const conn = await pool.getConnection();
        console.log('connected to database successfully');
        conn.release(); //give it back to the pool
    }
    catch(err){
        console.error('database connection failed:',err.message);
        process.exit(1); //stop the app, it can't work without DB
    }
}

export default pool;
