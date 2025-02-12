document.addEventListener('DOMContentLoaded', async () => {
    const postsUrl = 'https://dummyjson.com/posts';
    const commentsUrl = 'https://dummyjson.com/comments';
    const usersUrl = 'https://dummyjson.com/users';
    
    try {
        const [postsResponse, commentsResponse, usersResponse] = await Promise.all([
            fetch(postsUrl),
            fetch(commentsUrl),
            fetch(usersUrl)
        ]);

        const [postsData, commentsData, usersData] = await Promise.all([
            postsResponse.json(),
            commentsResponse.json(),
            usersResponse.json()
        ]);

        displayPosts(postsData, commentsData, usersData);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
});

function displayPosts(postsData, commentsData, usersData) {
    const postsContainer = document.getElementById('post-container');
    if (!postsContainer) {
        console.error('Posts container is missing.');
        return;
    }

    postsData.posts.forEach(post => {
        const commentsForPost = commentsData.comments.filter(comment => comment.postId === post.id);
        const user = usersData.users.find(user => user.id === post.userId) || { username: 'Unknown' };
        const postItem = createPostElement(post, commentsForPost, user);
        postsContainer.appendChild(postItem);
    });
}

function createPostElement(post, comments, user) {
    const postItem = document.createElement('div');
    postItem.classList.add('post');

    postItem.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <p>Post ID: ${post.id}</p>
        <p>Tags: ${post.tags.join(', ')}</p>
        <p>Reactions: ${post.reactions}</p>
        <p>Posted by: ${user.username}</p>
    `;

    if (comments.length > 0) {
        const commentsContainer = document.createElement('div');
        commentsContainer.classList.add('comments-container');
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `<p>${comment.body} - ${comment.user.username}</p>`;
            commentsContainer.appendChild(commentDiv);
        });
        postItem.appendChild(commentsContainer);
    } else {
        const noCommentsMessage = document.createElement('p');
        noCommentsMessage.textContent = 'No comments for this post.';
        postItem.appendChild(noCommentsMessage);
    }

    return postItem;
}
