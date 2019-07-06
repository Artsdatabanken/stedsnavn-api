const geometry = require("./geometry");
const quadtree = require("./quadtree");

module.exports = function(app, index) {
  app.get("", (req, res, next) => {
    res.send('Try <a href="/17.07442/68.36028/32">/17.07442/68.36028/24</a>');
  });
  app.get("/:lon/:lat/:radius/:zoom", (req, res, next) => {
    const { lat, lon, zoom } = req.params;
    const radius = parseFloat(req.params.radius);
    const coords = geometry.normalize([lon, lat], index.bounds);

    const r = quadtree.find2(index, coords[0], coords[1], radius, zoom);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(r));
  });
};
