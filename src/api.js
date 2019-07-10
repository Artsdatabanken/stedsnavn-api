const geometry = require("./geometry");
const quadtree = require("./quadtree");

function lookup(index, lon, lat, zoom) {
  const coords = geometry.normalize([lon, lat], index.bounds);
  return quadtree.find2(index, coords[0], coords[1], zoom);
}

module.exports = { lookup };
