// EXAMPLE 1: Single script that ties everything together

// 1) OBJECT CREATION
const user = {
    nickname: null,     // Initially null to show null coalescing
    score: 0,           // We'll update this with a closure
    favoriteNumbers: [1, 2, 3]
};



/// how to create a 
















// 2) NULL COALESCING
// If nickname is null or undefined, fall back to "Guest"
const safeNickname = user.nickname ?? "Guest";
console.log(`Hello, ${safeNickname}!`);

// 3) CLOSURE that modifies the object
function createScoreIncrementer(userObj) {
    // This function closes over 'userObj'
    return function () {
        userObj.score += 1;
        console.log(`Score updated to ${userObj.score}`);
    };
}
const incrementScore = createScoreIncrementer(user);

// 4) LOOP + CONTROL STATEMENTS
// We'll loop over user.favoriteNumbers and increment the score for each.
for (let number of user.favoriteNumbers) {
    incrementScore(); // closure call
    if (user.score > 2) {
        console.log(`Score is above 2, stopping early. Last number was ${number}`);
        break; // Example of control flow
    }
}

// 5) FETCH (Asynchronous)
async function fetchData() {
    try {
        // Simple example: GET request from a placeholder API
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        if (!response.ok) {
            // Control statement: throw if HTTP not OK
            throw new Error("Network response was not OK");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}
fetchData();
