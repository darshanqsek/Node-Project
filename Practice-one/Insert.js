const dbConnect = require('./mongodb');

const insertData = async () => {
    const db = await dbConnect('users');
    const result = await db.insert([
    {
        name: "hellotest",
        email: "test@gnail.com",
        password: "test@gnail.com",
        mobile: "9876553454",
        skill: "testing"
    }
    ]);

      if(result.acknowledged){
        console.log('data inserted');
      }
      
}
insertData();