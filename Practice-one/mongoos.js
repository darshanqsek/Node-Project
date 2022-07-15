const { ObjectId } = require("mongodb");
const mongoose = require("mongoose"); 
mongoose.connect("mongodb://localhost:27017/node-project");
const usersschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: Number,
  skill: String,
});

const InsertData = async () => {
  const usersModule = mongoose.model("users", usersschema);

  let data = new usersModule({
    name: "m8",
    email: "test@gmail.com",
    password: "test@1233",
    mobile: "6567695867",
    skill: "test",
  });
  let result = await data.save();
  console.log(result);
};

const UpdateData = async () => {
    const usersModule = mongoose.model("users", usersschema);
    let data = await usersModule.updateOne(
        {_id:ObjectId('62c42aebc742b80d5c5b0838')},
        {
            $set: {
                name: "Apple",
                email: "apple@apple.com",
                password: "apple@1233",
                mobile: "6567695867",
                skill: "test",
            }
        }
    )
    console.log(data);
};

const DeleteData = async () => {
    const usersModule = mongoose.model("users", usersschema);
    let data = await usersModule.deleteOne(
        {_id:ObjectId('62c42aebc742b80d5c5b0838')}
    )
    console.log(data);
};

const FindData = async () => {
    const usersModule = mongoose.model("users", usersschema);
    let data = await usersModule.find(
        {_id:ObjectId('62c51fa785bd5fc530b2af67')}
    )
    console.log(data);
};
FindData();
