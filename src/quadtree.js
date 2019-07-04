function getChildKey(x, y) {
  const ns = y < 0.5 ? "n" : "s";
  const we = x < 0.5 ? "w" : "e";
  return ns + we;
}

function createChild(tree, x, y) {
  const key = getChildKey(x, y);
  if (!tree[key]) tree[key] = {};
  return tree[key];
}

function getChild(tree, x, y) {
  const key = getChildKey(x, y);
  return tree[key];
}

let max = 0;

function find(tree, x, y, z) {
  if (z === 0) return { [z]: tree.value };
  const leaf = getChild(tree, x, y);
  if (!leaf) return { [z]: tree.value };
  const dv = find(leaf, 2 * (x % 0.5), 2 * (y % 0.5), z - 1);
  return Object.assign({}, dv, { [z]: tree.value });
}

function create(tree, x, y, z) {
  if (z === 0) return tree;
  tree = createChild(tree, x, y);
  return create(tree, 2 * (x % 0.5), 2 * (y % 0.5), z - 1);
}

function add(tree, x, y, z, value) {
  tree = create(tree, x, y, z);
  if (tree.value) {
    if (value !== tree.value) {
      collisions++;
    }
    tree.value = value;
    max = Math.max(max, tree.value.length);
  } else tree.value = value;
}

module.exports = { add, find };
