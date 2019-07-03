const qt = require("./quadtree");

const root = qt.createNode();

qt.add(root, 0, 0, 0, "A");
qt.add(root, 0.25, 0.25, 1, "B");
qt.add(root, 0.25, 0.25, 2, "C");

debugger;
console.log(JSON.stringify(root));
