document.addEventListener("DOMContentLoaded", async () => {
    const postsContainer = document.getElementById("posts");
    const modal = document.getElementById("user-modal");
    const userDetails = document.getElementById("user-details");
    const closeBtn = document.querySelector(".close-btn");
    let skip = 0;
    const limit = 10;
    let isLoading = false;

    // Set active nav link
    const setActiveNavLink = () => {
        const currentPage = window.location.pathname.split('/').pop();
        const links = document.querySelectorAll("nav ul li a");

        links.forEach(link => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === currentPage);
        });
    
    }



    async function showAllCommentsSorted() {
        const commentsData = await fetchData("https://dummyjson.com/comments");
        const comments = commentsData ? commentsData.comments : [];
    
        // Sort comments from newest to oldest (by id descending)
        comments.sort((a, b) => b.id - a.id);
    
        // Clear old comments
        allCommentsContainer.innerHTML = "<h3>All Comments (Newest First)</h3>";
    
        const commentList = document.createElement("ul");
        comments.forEach(comment => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${comment.user.username}:</strong> ${comment.body}`;
            commentList.appendChild(li);
        });
    
        allCommentsContainer.appendChild(commentList);
    }

    
    



/* const headers = document.querySelectorAll("h1, h2, h3, h4")
headers.forEach(header => {
    header.style.fontFamily = "cursive"
    header.style.color = "red"
    header.style.fontWeight = "bold"

})



const header = document.querySelector("header")
header.style.backgroundColor = "red" */



    setActiveNavLink();

    // Fetch data from URL
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const users = await fetchData("https://dummyjson.com/users?limit=150");
    if (!users) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Error loading data.";
        postsContainer.appendChild(errorMessage);
        return;
    }

    const userMap = new Map();
    users.users.forEach(user => {
        userMap.set(user.id, {
            username: user.username,
            email: user.email,
            address: `${user.address.street}, ${user.address.city}`,
            phone: user.phone,
            age: user.age
        });
    });

    // Create post element
    async function createPostElement(post) {
        const user = userMap.get(post.userId);
        if (!user) return null;





        // Fetch comments for this post
        const postCommentsData = await fetchData(`https://dummyjson.com/posts/${post.id}/comments`);
        const postComments = postCommentsData ? postCommentsData.comments : [];

        const postElement = document.createElement("article");
        postElement.classList.add("post");

        const title = document.createElement("h2");
        title.textContent = post.title;
        postElement.appendChild(title);

        const body = document.createElement("p");
        body.textContent = post.body;
        postElement.appendChild(body);

        const userInfo = document.createElement("p");
        const userLink = document.createElement("a");
        userLink.href = "#";
        userLink.classList.add("user-link");
        userLink.dataset.userId = post.userId;
        userLink.textContent = user.username;
        const userInfoText = document.createTextNode("By: ");
        userInfo.appendChild(userInfoText);
        userInfo.appendChild(userLink);
        postElement.appendChild(userInfo);

        const tags = document.createElement("p");
        const tagsText = document.createTextNode(`Tags: ${post.tags.join(", ")}`);
        tags.appendChild(tagsText);
        postElement.appendChild(tags);

        const comment = document.createElement("p");
        if (postComments.length === 0) {
        const commentText = document.createTextNode(`There are no comments`) ;
            
        comment.appendChild(commentText);
        postElement.appendChild(comment);
    
    
    }
        else {
        const commentText = document.createTextNode(`the total amount of comments are ${postComments.length} `) ;
            
        comment.appendChild(commentText);
        postElement.appendChild(comment);
    }
    



        const reactions = document.createElement("p");
        const reactionsText = document.createTextNode(`Reaction: Likes - ${post.reactions.likes}, Dislikes - ${post.reactions.dislikes}`);
        reactions.appendChild(reactionsText);
        postElement.appendChild(reactions);




        const commentsDiv = document.createElement("div");
        commentsDiv.classList.add("comments");

        const commentsTitle = document.createElement("h4");
        commentsTitle.textContent = "Comments:";
        commentsDiv.appendChild(commentsTitle);

        const commentList = document.createElement("ul");
        commentList.id = `comments-${post.id}`;


        if (postComments.length === 0) {
            const noComments = document.createElement("li");
            noComments.textContent = "No comments available.";
            commentList.appendChild(noComments);
        } else {
            postComments.forEach(comment => {
                const li = document.createElement("li");
                li.textContent = comment.body;
                commentList.appendChild(li);
                async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

            });


            async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}


        }
        commentsDiv.appendChild(commentList);
        postElement.appendChild(commentsDiv);

        return postElement;
    }

    // Load posts
    async function loadPosts() {
        if (isLoading) return;
        isLoading = true;
        const posts = await fetchData(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
        if (!posts || !posts.posts.length) {
            const noMorePosts = document.createElement("p");
            noMorePosts.textContent = "No more posts.";
            postsContainer.appendChild(noMorePosts);
            isLoading = false;
            return;
        }

        for (const post of posts.posts) {
            const postElement = await createPostElement(post);
            if (postElement) postsContainer.appendChild(postElement);
        }
        skip += limit;
        isLoading = false;
    }

    await loadPosts();
    window.addEventListener("scroll", async () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
            await loadPosts();
        }
    });

    // Handle user link click
    postsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("user-link")) {
            e.preventDefault();
            const userId = Number(e.target.dataset.userId);
            const user = userMap.get(userId);
            if (user) {
                // Clear previous user details
                while (userDetails.firstChild) {
                    userDetails.removeChild(userDetails.firstChild);
                }

                const name = document.createElement("p");
                const nameText = document.createTextNode(`Name: ${user.username}`);
                name.appendChild(nameText);
                userDetails.appendChild(name);

                const email = document.createElement("p");
                const emailText = document.createTextNode(`Email: ${user.email}`);
                email.appendChild(emailText);
                userDetails.appendChild(email);

                const address = document.createElement("p");
                const addressText = document.createTextNode(`Address: ${user.address}`);
                address.appendChild(addressText);
                userDetails.appendChild(address);

                const phone = document.createElement("p");
                const phoneText = document.createTextNode(`Phone: ${user.phone}`);
                phone.appendChild(phoneText);
                userDetails.appendChild(phone);

                const age = document.createElement("p");
                const ageText = document.createTextNode(`Age: ${user.age}`);
                age.appendChild(ageText);
                userDetails.appendChild(age);

                modal.style.display = "flex";
            }
        }
    });

    closeBtn.addEventListener("click", () => modal.style.display = "none");
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
});