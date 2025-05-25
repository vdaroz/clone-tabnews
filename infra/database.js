import { Client } from 'pg'

async function query(queryObject){
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV == "development" ? false : true 
  });
  
  try{
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  }catch(err){
    console.log("Credenciais Postgres:", {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD
    });
    console.error(err.message);
    throw err;
  }finally{
    if(client){
      await client.end();
    }
  }
}

export default {
  query: query,
};