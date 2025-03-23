const user = {
    nickname: null,
    score: 0,
    favoriteNumbers: [1, 2, 3]
};

const safeNickname = user.nickname ?? "Guest";
console.log(`Hello, ${safeNickname}!`);

function createScoreIncrementer(userObj) {
    return function () {
        userObj.score += 1;
        console.log(`Score updated to ${userObj.score}`);
    };
}
const incrementScore = createScoreIncrementer(user);

for (let number of user.favoriteNumbers) {
    incrementScore();
    if (user.score > 2) {
        console.log(`Score is above 2, stopping early. Last number was ${number}`);
        break;
    }
}

async function fetchData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}
fetchData();
