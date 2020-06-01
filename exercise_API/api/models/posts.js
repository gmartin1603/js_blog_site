const path = "./data.json";
const fs = require('fs');


class post {
        /** Get Posts */
    get() {
        return this.readData();

    }
    
        /** Get one blog post */
    getIndividualBlog(postId) {
        // Gets entire array of posts//
        const posts = this.readData();
        // posts.find loops through the array comparing each ID to postId
        const foundPost = posts.find((post) => post.id == postId);
        return foundPost
    }
    
    add(newPost) {
        /** Add new Post */
        const currentPosts = this.readData();
        currentPosts.unshift(newPost)
        this.storeData(currentPosts);
    }

    readData() {
        let rawdata = fs.readFileSync(path);
        let posts = JSON.parse(rawdata);
        return posts;
    }

    storeData(rawData) {
        let data = JSON.stringify(rawData);
        fs.writeFileSync(path, data);
    }

}

module.exports = post