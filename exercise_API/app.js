const express = require("express");
const app = express();
const Post = require("./api/models/posts");
var multer = require('multer');
var upload = multer({ dest: 'uploads/'});
const postData = new Post();


app.use(express.json());

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});


app.use('/uploads', express.static('uploads'));

app.get("/api/posts", (req, res)=>{
    res.status(200).send(postData.get());
});

app.get("/api/posts/:post_id", (req, res)=> {
    const postId = req.params.post_id;
    const foundPost = postData.getIndividualBlog(postId);
    if (foundPost) {
        res.status(200).send(foundPost)
    }
    else {
            res.status(404).send("Not found")
        }
});

app.post("/api/posts", upload.single("post-image"), (req, res) => {
   console.log(req.body);
   console.log(req.file);
    // const newPost = {
    //     "id": `${Date.now()}`,
    //     "title": req.body.title,
    //     "content": req.body.content,
    //     "post_image": req.body["post-image"],
    //     "added_date": `${Date.now()}`
    // }
    // postData.add(newPost)
    res.status(201).send("ok");
})

app.listen(3000, ()=> console.log("Listening on HTTP://localhost:3000"));
