const { ObjectId } = require('mongodb');
const dbConnect = require('./mongodb');

const updateData = async () => {
    let db = await dbConnect('users');
    let result = await db.updateOne(
        {_id: ObjectId('62c522446620c195cfa3bfc8')},
        { $set:{ name:'Darshan Sohaliya',email:'darshan@gmail.com',password:'admin@1234',mobile:'987944238784',skill: ['Php','laravel','codeigniter','wordpress','javascript','Node js','jquery','Github']}}
    );
        console.log(result);

}
updateData();
