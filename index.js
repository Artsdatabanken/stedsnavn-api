const fs = require("fs");
const qt = require("./quadtree");
const geometry = require("./geometry");

const data = JSON.parse(fs.readFileSync("o.json"));
gc();
const heapUsed = process.memoryUsage().heapUsed;

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

let oob = 0;
function index(data, pri) {
  const tree = {};
  data.forEach(d => {
    if (pri && d.s !== pri) return;
    //d.navn.forEach(navn => {
    const co = geometry.normalize(d.coord, bounds);
    if (co[0] < 0 || co[0] > 1 || co[1] < 0 || co[1] > 1) {
      oob++;
      //    throw new Error(JSON.stringify(d));
      return;
    }
    const z = priTilZoom(d.s);
    //console.log(z, d.navn);
    qt.add(
      tree,
      co[0],
      co[1],
      z,
      d.navn[0] //d.coord[0] + "_" + d.coord[1] // + "_" + d.navn[0]
    );
  });
  return tree;
}

//const root = index(data, "C");
const root = index(data);
gc();
false &&
  Object.keys(map).forEach(pri => {
    const root = index(data, pri);
    showMetrics(root, pri);
  });

function accumulate(node, metrics) {
  if (!node) return;
  if (node.value) {
    metrics.values += node.value.length;
    metrics.tiles++;
    metrics.max = Math.max(metrics.max, node.value.length);
  } else metrics.empty++;
  accumulate(node.nw, metrics);
  accumulate(node.ne, metrics);
  accumulate(node.sw, metrics);
  accumulate(node.se, metrics);
}
function showMetrics(node, pri) {
  const metrics = { values: 0, tiles: 0, empty: 0, max: 0 };
  accumulate(node, metrics);
  console.log(pri, metrics.max, metrics.values / metrics.tiles, metrics.empty);
  gc();
  console.log(
    (process.memoryUsage().heapUsed - heapUsed) / 1024.0 / 1024 + " MB"
  );
}
console.log(
  (process.memoryUsage().heapUsed - heapUsed) / 1024.0 / 1024 + " MB"
);

//const coords = normalize([109707, 6474015]);
const coords = geometry.normalize(
  //  [6.123769447236364, 58.38904167024711],
  [8.001252772583749, 58.14704999571571],
  bounds
);
const x = qt.find(root, coords[0], coords[1], 809);
debugger;
console.log("hit", x.value);
