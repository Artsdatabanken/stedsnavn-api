const geometry = require("./geometry");
const quadtree = require("./quadtree");

function lookup(index, lon, lat, zoom) {
  const coords = geometry.normalize([lon, lat], index.index.bounds);
  const hit = quadtree.find2(index.index, coords[0], coords[1], zoom);
  if (hit.value) {
    const fields = hit.value.split(";");
    const [category, name] = fields;
    const meta = index.id2meta[category];
    return { navn: name, meta: meta };
  }
  return hit;
}

module.exports = { lookup };
