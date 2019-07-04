const geometry = require("./geometry");
const quadtree = require("./quadtree");

module.exports = function(app, index) {
  app.get("", (req, res, next) => {
    res.send('Try <a href="/10/63/9">query</a>');
  });
  app.get("/:lon/:lat/:zoom", (req, res, next) => {
    //const coords = normalize([109707, 6474015]);
    const { lat, lon, zoom } = req.params;
    const coords = geometry.normalize(
      //  [6.123769447236364, 58.38904167024711],
      [lon, lat],
      index.bounds
    );

    const r = quadtree.find(index, coords[0], coords[1], zoom);
    res.send(JSON.stringify(r));
  });
};
