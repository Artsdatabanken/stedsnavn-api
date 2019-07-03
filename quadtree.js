function createNode() {
  return {};
}

function getChildKey(x, y) {
  const ns = y < 0.5 ? "n" : "s";
  const we = x < 0.5 ? "w" : "e";
  return ns + we;
}

function createChild(tree, x, y) {
  const key = getChildKey(x, y);
  if (!tree[key]) tree[key] = createNode();
  return tree[key];
}
function getChild(tree, x, y) {
  const key = getChildKey(x, y);
  return tree[key];
}

let collisions = 0;
let max = 0;

function find(tree, x, y, z) {
  if (z === 0) return tree;
  const leaf = getChild(tree, x, y);
  if (!leaf) return tree;
  const dv = find(leaf, 2 * (x % 0.5), 2 * (y % 0.5), z - 1);
  return dv.value ? dv : tree;
}

function create(tree, x, y, z) {
  if (z === 0) return tree;
  tree = createChild(tree, x, y);
  return create(tree, 2 * (x % 0.5), 2 * (y % 0.5), z - 1);
}

function add(tree, x, y, z, value) {
  tree = create(tree, x, y, z);
  if (tree.value) {
    //    tree.value.push(value);
    if (value !== tree.value) {
      collisions++;
      //      console.log(collisions);
    }
    tree.value = value;
    //    if (tree.value.length > max) console.log(tree.value);
    max = Math.max(max, tree.value.length);
    //    console.log("x", tree.value);
    //if (collisions % 100 === 1)
    // throw new Error("Collision: " + tree.value + "<->" + value);
    //  } else tree.value = [value];
  } else tree.value = value;
}

module.exports = { createNode, add, find };
