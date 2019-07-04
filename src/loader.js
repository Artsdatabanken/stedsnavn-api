const fs = require("fs");
const qt = require("./quadtree");
const geometry = require("./geometry");

const map = {
  A: 28,
  B: 27,
  C: 26,
  D: 25,
  E: 24,
  F: 23,
  G: 22,
  H: 21,
  I: 20,
  J: 19,
  K: 18,
  L: 17,
  M: 16,
  N: 8
};
function priTilZoom(pri) {
  if (!map[pri]) throw new Error(pri);
  return map[pri];
}

const bounds = geometry.getExtents(data);

function index(data, pri) {
  const tree = {};
  data.forEach(d => {
    if (pri && d.s !== pri) return;
    const co = geometry.normalize(d.coord, bounds);
    if (co[0] < 0 || co[0] > 1 || co[1] < 0 || co[1] > 1) {
      return;
    }
    const z = priTilZoom(d.s);
    qt.add(tree, co[0], co[1], z, d.navn[0]);
  });
  return tree;
}

function load(directory) {
  const steder = path.join(directory, "steder.json");
  const data = JSON.parse(fs.readFileSync(directory));
  return index(data);
}

module.exports = { load };
