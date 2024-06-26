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

function find2(quad, x, y, z) {
  const best = {
    distSquared: Math.pow(11115000, 2),
    maxz: z,
  };
  find2_(quad, best, x, y, 0);
  best.dist = Math.sqrt(best.distSquared);
  return best;
}

function distanceFromQuadSquared(px, py) {
  const x = 0.5;
  const y = 0.5;
  const width = 1;
  const height = 1;
  dx = Math.max(Math.abs(px - x) - width / 2, 0);
  dy = Math.max(Math.abs(py - y) - height / 2, 0);
  return dx * dx + dy * dy;
}

function distanceFromQuadEdgeSquared(px, py) {
  const x = 0.5;
  const y = 0.5;
  const width = 1;
  const height = 1;
  dx = Math.abs(px - x); // - width / 2, 0);
  if (dx <= 0.5) return 0;
  dy = Math.abs(py - y);
  if (dy <= 0.5) return 0;
  dx -= 0.5;
  dy -= 0.5;
  return dx * dx + dy * dy;
}

function addCandidate(prio, tile, x, y, dx, dy) {
  if (!tile) return;
  prio.push({
    t: tile,
    x: x - dx,
    y: y - dy,
    d: 0,
  });
}

function getCandidates(quad, x, y) {
  const prio = [];
  addCandidate(prio, quad.nw, x, y, 0, 0);
  addCandidate(prio, quad.ne, x, y, 0.5, 0);
  addCandidate(prio, quad.sw, x, y, 0, 0.5);
  addCandidate(prio, quad.se, x, y, 0.5, 0.5);
  for (let i = 0; i < prio.length; i++)
    prio[i].d = distanceFromQuadSquared(prio[i].x, prio[i].y);
  prio.sort((a, b) => (a.d > b.d ? 1 : -1));
  return prio;
}

function find2_(quad, best, x, y, z) {
  if (distanceFromQuadSquared(x, y) * Math.pow(0.25, z) > best.distSquared)
    return;
  if (z < best.maxz) {
    const prio = getCandidates(quad, x, y);
    for (let i = 0; i < prio.length; i++) {
      const tile = prio[i];
      find2_(tile.t, best, 2 * tile.x, 2 * tile.y, z + 1);
    }
  }
  if (!quad.value) return;
  const distSquared =
    ((x - 0.5) * (x - 0.5) + (y - 0.5) * (y - 0.5)) * Math.pow(0.25, z);
  if (distSquared < best.distSquared) {
    best.distSquared = distSquared;
    best.value = quad.value;
  }
}

function find(tree, x, y, z) {
  const r = {};
  if (tree.value) {
    r[z] = r[z] || [];
    r[z].push(tree.value);
  }
  if (z === 0) return r;
  const leaf = getChild(tree, x, y);
  if (!leaf) {
    return r;
  }
  const dv = find(leaf, 2 * (x % 0.5), 2 * (y % 0.5), z - 1);
  return Object.assign({}, dv, r);
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
      //collisions++;
      //console.log(x, y, z, value);
    }
    tree.value = value;
    max = Math.max(max, tree.value.length);
  } else tree.value = value;
}

module.exports = { add, find, find2 };
