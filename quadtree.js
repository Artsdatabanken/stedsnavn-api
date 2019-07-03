function createNode() {
  return {};
}

function getChild(tree, x, y) {
  const ns = y < 0.5 ? "n" : "s";
  const we = y < 0.5 ? "w" : "e";
  const key = ns + we;
  if (!tree[key]) tree[key] = createNode();
  return tree[key];
}

let collisions = 0;
let max = 0;

function add(tree, x, y, z, value) {
  if (z > 0) {
    tree = getChild(tree, x, y);
    add(tree, 2 * (x % 0.5), 2 * (y % 0.5), z - 1, value);
    return;
  }

  tree = getChild(tree, x, y);
  if (tree.value) {
    tree.value.push(value);
    if (tree.value.length > max) console.log(tree.value);
    max = Math.max(max, tree.value.length);
    //    collisions++;
    //    if (collisions % 100 === 1) console.log(collisions);
    // throw new Error("Collision: " + tree.value + "<->" + value);
  } else tree.value = [value];
}

function find(tree, x, y) {}

module.exports = { createNode, add, find };
