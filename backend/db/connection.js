const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

async function main(){
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@deliveries-cluster.9xpg2dt.mongodb.net/?retryWrites=true&w=majority`)
    console.log('Connected to mongodb');
}

main()
.catch((err) => console.log(err));

module.exports = mongoose;