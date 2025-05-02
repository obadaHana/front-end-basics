
//______________________________________________________________________//
//_______________________________CHANGE 1_______________________________//
//______________________________________________________________________//

// Suppose you have a closure 'myCounter' with a method getCount()
// Example for loop:
for (let i = 0; i < 7; i++) {
    // If the closure count is already >= 2, skip
    if (myCounter.getCount() >= 2) {
        console.log(`Skipping increment at i = ${i} because count >= 2`);
        continue;
    }
    myCounter.increment(); // or however you call the increment
}


//______________________________________________________________________//
//_______________________________CHANGE 2_______________________________//
//______________________________________________________________________//



// 1) Extend your 'settings' object
const settings = {
    theme: "dark",
    layout: "grid",
    maxItems: null,
    allowFetch: false // NEW property
  };
  
  // 2) Check 'allowFetch' before calling fetch
  async function getUsers() {
    if (!settings.allowFetch) {
      console.log("Fetch is disabled via settings.");
      return; 
    }
    
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users?_limit=3");
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.statusText}`);
      }
      const users = await response.json();
      console.log("Fetched users:", users);
    } catch (error) {
      console.error("Error in getUsers:", error);
    }
  }
  

//______________________________________________________________________//
//_______________________________CHANGE 3_______________________________//
//______________________________________________________________________//


// Original closure might look like:
function createCounterWithLimit(limit) {
    let count = 0;
    return function () {
      if (count < limit) {
        count++;
        console.log(`Count is now: ${count}`);
      } else {
        console.log("Limit reached!");
      }
    };
  }
  
  // CHANGE: Return an object with both increment and reset
  function createCounterWithLimit(limit) {
    let count = 0;
  
    return {
      increment() {
        if (count < limit) {
          count++;
          console.log(`Count is now: ${count}`);
        } else {
          console.log("Limit reached!");
        }
      },
      reset() {
        count = 0;
        console.log("Counter has been reset to 0.");
      },
      getCount() {
        return count;
      }
    };
  }
  
  // Example usage:
  const myCounter = createCounterWithLimit(3);
  myCounter.increment(); // Count: 1
  myCounter.increment(); // Count: 2
  myCounter.reset();     // "Counter has been reset to 0."
  console.log("Current count after reset:", myCounter.getCount());
  