// EXAMPLE 2: Another integrated example with a different flavor

// 1) OBJECT CREATION
const product = {
    name: "SuperWidget",
    price: 50,
    discount: undefined // We'll use ?? with this
};

// 2) NULL COALESCING
// If discount is undefined, use 0
const appliedDiscount = product.discount ?? 0;
console.log(`Applied discount: ${appliedDiscount}`);

// 3) CLOSURE - This time we'll store data in a closure-based "cache"
function createDataCache() {
    let cache = {};
    return {
        set(key, value) {
            cache[key] = value;
        },
        get(key) {
            return cache[key] ?? null;
        },
        logAll() {
            console.log("Cache contents:", cache);
        }
    };
}
const dataCache = createDataCache();

// 4) LOOP + CONTROL STATEMENTS
// We'll do a simple while loop that simulates adding items to the cache
let i = 0;
while (i < 3) {
    dataCache.set(`item${i}`, i * 10);
    i++;
}
dataCache.logAll();

// 5) FETCH (Asynchronous)
fetch("https://jsonplaceholder.typicode.com/posts?_limit=2")
    .then(response => {
        if (!response.ok) {
            // control statement
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(posts => {
        // Use the closure's "cache"
        dataCache.set("fetchedPosts", posts);
        console.log("Fetched posts added to cache:", dataCache.get("fetchedPosts"));
    })
    .catch(err => console.error("Fetch error:", err));
