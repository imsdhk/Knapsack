/*
sean --> templet

const fs = require('fs');


  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity


const argv = process.argv.slice(2);

if (argv.length != 2) {
  console.error("usage: filename capacity");
  process.exit(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

// Read the file
const filedata = fs.readFileSync(filename, "utf8");
// Split the filedata on each new line
const lines = filedata.trim().split(/[\r\n]+/g);

// Process the lines
const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(" ").map(n => parseInt(n));

  items.push({
    index: index,
    size: size,
    value: value,
  });
}
*/
// imran's greedy 
const fs = require('fs');

const argv = process.argv.slice(2);

// console.log(argv); 

if (argv.length != 2) {
    console.error("usage: filename capacity");
    process.exit(1);
}
const filename = argv[0];
const capacity = parseInt(argv[1]);


//read the file

const filedata = fs.readFileSync(filename, 'utf8');

//split the filedata on each line
const lines = filedata.trim().split(/[\r\n]+/g);

// console.log(lines)


//Process the lines
let items = [];

for (let l of lines) {
    const [index, size, value] = l.split(' ').map(n => parseInt(n));
    items.push({
        index: index,
        size: size,
        value: value
    });
}

// console.log('before sort',items)

//step 0
items = items.filter(el => el.size <= capacity);
// step 1
items.sort((a, b) => {
    let aRatio = a.value / a.size
    let bRatio = b.value / b.size
    return bRatio - aRatio;
})

// console.log('after sort', items)
/*
Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

const greedyAlgo = (items, capacity) => {
    let result = [];
    let loaded = 0;

    while (items.length) {// O(n)
        let current = items.shift()
        if (loaded + current.size > capacity) continue;
        loaded += current.size;
        result.push(current)
        if(loaded >= capacity) break;
        // console.log(loaded, capacity, current)
    };
    let selectedItems = [];
    let totalSize = 0;
    let totalValue = 0;


    for (let obj of result) {//O(n)
        selectedItems.push(obj.index);
        totalSize += obj.size;
        totalValue += obj.value;
    }

    return {
        "Items to select": selectedItems.sort((a, b) => a - b),
        "Total cost": totalSize,
        "Total Value": totalValue
    }
}


console.log(greedyAlgo(items, capacity))