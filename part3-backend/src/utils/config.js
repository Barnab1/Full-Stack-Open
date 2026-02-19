import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    MONGODB_URI : process.env.MONGODB_URI,
    PORT: process.env.PORT|| 3001
};

//Preventing MONGODB_URI from being empty
if(!config.MONGODB_URI){
    console.error(`MONGODB_URI is not defined`);
    process.exit(1);
}
export default config;