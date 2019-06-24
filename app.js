const express = require('express')
const mongoose = require('mongoose');

const app = express()
const port = 3000

app.use(express.json());

// mongoose
mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true });
var db = mongoose.connection;
var blogSchema = new mongoose.Schema({
    name: String
});
var Blog = mongoose.model('Blog', blogSchema);

// db connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!");
});

// routes
app.get('/', (req, res) => {
    Blog.find(function (err, posts) {
        if (err) return console.error(err);
        res.json(posts)
    })
})

app.post('/new', (req, res) => {
    var name = req.body.name
    new Blog({ name }).save();
    console.log("item added: ", name)
    res.status(201)
    res.send(req.body.name)
})

app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))





