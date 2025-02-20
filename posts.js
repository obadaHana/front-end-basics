document.addEventListener("DOMContentLoaded", async () => {
    console.log("Script Loaded!"); // Check if script is running

    const postsContainer = document.getElementById("posts");

    const fetchData = async (url) => {
        try {
            console.log(`Fetching: ${url}`);
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch data");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const posts = await fetchData("https://dummyjson.com/posts");
    const users = await fetchData("https://dummyjson.com/users");
    const comments = await fetchData("https://dummyjson.com/comments");

    console.log("Posts:", posts);
    console.log("Users:", users);
    console.log("Comments:", comments);

    if (!posts || !users || !comments) {
        postsContainer.innerHTML = "<p>Error loading posts.</p>";
        return;
    }

    const userMap = {};
    users.users.forEach(user => userMap[user.id] = user.username);

    posts.posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <p><strong>Posted by:</strong> ${userMap[post.userId] || "Unknown"}</p>
            <div class="comments">
                <h4>Comments:</h4>
                <ul id="comments-${post.id}"></ul>
            </div>
        `;

        postsContainer.appendChild(postElement);

        const postComments = comments.comments.filter(c => c.postId === post.id);
        const commentList = document.getElementById(`comments-${post.id}`);
        postComments.forEach(comment => {
            const commentItem = document.createElement("li");
            commentItem.textContent = comment.body;
            commentList.appendChild(commentItem);
        });
    });
});
