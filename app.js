const {connectDatabase} = require('./config/connection');
const {startServer} = require('./config/server');

async function main(){
    try{
        await connectDatabase();
        console.log('Database connected sucessfully!');
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }};
    try{
        startServer();
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }

main();