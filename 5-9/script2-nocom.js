const product = {
    name: "SuperWidget",
    price: 50,
    discount: undefined
};

const appliedDiscount = product.discount ?? 0;
console.log(`Applied discount: ${appliedDiscount}`);

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

let i = 0;
while (i < 3) {
    dataCache.set(`item${i}`, i * 10);
    i++;
}
dataCache.logAll();

fetch("https://jsonplaceholder.typicode.com/posts?_limit=2")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(posts => {
        dataCache.set("fetchedPosts", posts);
        console.log("Fetched posts added to cache:", dataCache.get("fetchedPosts"));
    })
    .catch(err => console.error("Fetch error:", err));
