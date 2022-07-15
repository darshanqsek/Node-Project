const { ObjectId } = require('mongodb');
const dbConnect = require('./mongodb');

const deleteData = async () => {
    const db = await dbConnect('users');
    const result = await db.deleteOne({_id:ObjectId('62c42a8fc742b80d5c5b0837')});
    console.log(result);
}
deleteData();