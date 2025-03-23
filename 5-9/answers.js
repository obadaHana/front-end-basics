//______________________________________________________________________//
//_______________________________CHANGE 1_______________________________//
//______________________________________________________________________//
// 1) In your 'user' object, add a new array property
const user = {
    nickname: null,
    score: 0,
    favoriteNumbers: [1, 2, 3],
    favoriteFruits: ["Apple", "Banana", "Cherry"] // NEW array
};

// 2) In your loop, log both arrays. Here's a 'for' example:
for (let i = 0; i < user.favoriteNumbers.length; i++) {
    console.log("Number:", user.favoriteNumbers[i]);

    // Safely log a fruit if the index exists
    if (user.favoriteFruits[i]) {
        console.log("Fruit:", user.favoriteFruits[i]);
    }

    // ... existing logic for incrementScore, break conditions, etc.
}


//______________________________________________________________________//
//_______________________________CHANGE 2_______________________________//
//______________________________________________________________________//


// CHANGE: Accept a parameter to increment by 'amount'
function createScoreIncrementer(userObj) {
    return function (amount) {
        userObj.score += amount;
        console.log(`Score updated to ${userObj.score}`);
    };
}

// Usage in the loop:
const incrementScore = createScoreIncrementer(user);
// instead of incrementScore() ...
incrementScore(2); // increments the score by 2


//______________________________________________________________________//
//_______________________________CHANGE 3_______________________________//
//______________________________________________________________________//


// Inside your loop after calling incrementScore
// Example loop (assuming a 'for' or 'while'):
incrementScore(1); // or incrementScore(2) if you changed the closure

if (user.score === 2) {
    console.log("Score is exactly 2!");
}

// Keep the existing break condition if score > 2
if (user.score > 2) {
    console.log("Score went above 2, breaking out.");
    break;
}



