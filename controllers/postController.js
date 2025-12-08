const fs = require("fs");
const posts = require ("../models/post");

exports.getAllposts = (req, res) => {
    res.json(posts)
};

exports.createpost = (req, res) => {
    const post = req.body
    posts.push(post)
 fs.writeFileSync(
    "./models/post.js",
    `const posts = ${JSON.stringify(
      posts,
      null,
      2
    )};\n\nmodule.exports = posts;`
  );
    res.send('post created');
};
exports.updatepost = (req, res) =>{
    let postid =  parseInt(req. params.id);
    let updatedInfos = req.body;
    let postIndex = posts.findIndex ((post) => post.id === postid);
    if (postIndex !== -1){
        posts.splice(postIndex, 1);
        fs.writeFileSync(
             "../models/postModel.js",
             `const post = ${JSON.stringify(
                posts,
                null,
                2
        )}\n\nmodule.exports = posts`

    );
    res.send("posts updated");
    } else {
         res.status(404).send ("post not found")
    }
};
exports.deletePost = (req, res) => {
    let postId = parseInt(req.params.id);
    let postIndex = posts.findIndex((post) => post.id === postId);
    posts.splice(postIndex, 1)
    if(postIndex !== -1) {
        fs.writeFileSync(
            './models/post.js',
            `const posts = ${JSON.stringify(
                posts,
                null,
                2
            )};\n\nmodule.exports = posts`
        );
        res.send("Blog deleted")
    }else {
        res.status(404).send("Blog not found")
    };
};

    