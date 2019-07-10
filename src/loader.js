const path = require("path");
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

function index(stederPath) {
  const tree = {};
  tree.bounds = geometry.getExtents([]);

  var lineReader = require("readline").createInterface({
    input: require("fs").createReadStream(stederPath)
  });

  lineReader.on("line", function(line) {
    const fields = line.split(" ");
    const priority = fields[0][0];
    const categoryId = fields[0].substring(1);
    const navn = fields.slice(3).join(" ");
    const x = parseFloat(fields[1]);
    const y = parseFloat(fields[2]);
    const co = geometry.normalize([x, y], tree.bounds);
    if (co[0] < 0 || co[0] > 1 || co[1] < 0 || co[1] > 1) return;

    const z = priTilZoom(priority);
    qt.add(tree, co[0], co[1], z, navn);
  });
  return tree;
}

function load(directory) {
  const fullpath = path.join(directory, "steder.json");
  return index(fullpath);
}

module.exports = { load };
