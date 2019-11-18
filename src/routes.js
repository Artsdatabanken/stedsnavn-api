const api = require("./api");

module.exports = function(app, index) {
  app.get("/v1/punkt", (req, res) => {
    var { lat, lng, zoom } = req.query;
    if (!zoom) zoom = 55;
    const r = api.lookup(index, lng, lat, zoom);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(r));
  });
};
