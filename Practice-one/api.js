const express = require("express");
const { ObjectId } = require("mongodb");

const dbConnect = require("./mongodb");

const app = express();
app.use(express.json());

app.get("", async (req, resp) => {
    let db = await dbConnect('users');
    let data = await db.find().toArray();
    resp.send(data);
});

app.post('', async (req,resp) => {
    const json_data = req.body;
    let db = await dbConnect('users');
    let result = await db.insert(json_data);
    resp.send(result);
});

app.put('/:id', async (req,resp) => {
    const json_data = req.body;
    let db = await dbConnect('users');
    let result = await db.updateOne(
        {_id:ObjectId(req.params.id)},
        {$set:req.body}
    );
    resp.send(result);
});
app.delete('/:id', async (req,resp) => {
    const json_data = req.body;
    let db = await dbConnect('users');
    let result = await db.deleteOne(
        {_id:ObjectId(req.params.id)},
    );
    resp.send(result);
});
app.listen(4500);
