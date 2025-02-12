document.addEventListener('DOMContentLoaded', async () => {
    try {
        const userId = getUserIdFromUrl();
        if (!userId) {
            console.error('User ID is missing in the URL.');
            return;
        }

        const user = await fetchUserData(userId);
        updateUserProfile(user);
        await updateUserComments(user.id);
    } catch (error) {
        console.error('Error:', error);
    }
});

async function fetchUserData(userId) {
    const response = await fetch(`https://dummyjson.com/users/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data.');
    }
    return response.json();
}

async function updateUserComments(userId) {
    const commentsData = await fetch(`https://dummyjson.com/comments/user/${userId}`).then(res => res.json());
    const userCommentsContainer = document.getElementById('user-comments');
    if (!userCommentsContainer) return;

    if (commentsData.comments.length > 0) {
        commentsData.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `<strong>${comment.user.username}</strong>: ${comment.body}`;
            userCommentsContainer.appendChild(commentDiv);
        });
    } else {
        userCommentsContainer.innerHTML = '<p>No comments found for this user.</p>';
    }
}

function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function updateUserProfile(user) {
    document.getElementById('user-profile-img')?.setAttribute('src', user.image);
    const userInfoHtml = `
        <h2>${user.firstName} ${user.lastName} (@${user.username})</h2>
        <img src="${user.image}" alt="Profile image of ${user.firstName}">
        <p>Gender: ${user.gender}</p>
        <p>Last Name: ${user.lastName}</p>
        <p>First Name: ${user.firstName}</p>
        <p>Location: ${user.address ? `${user.address.city}, ${user.address.state}` : 'Unknown'}</p>
        <p>University: ${user.university || 'N/A'}</p>
    `;
    const userContainer = document.getElementById('user-container');
    if (userContainer) {
        userContainer.innerHTML = userInfoHtml + `<div id="user-comments" class="comments-container"></div>`;
    }
}
