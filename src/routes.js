const api = require("./api");

module.exports = function(app, index) {
  app.get("", (req, res, next) => {
    res.send('Try <a href="/17.07442,68.36028/32">/17.07442/68.36028/24</a>');
  });
  app.get("/:lon,:lat/:zoom?", (req, res) => {
    const { lat, lon } = req.params;
    const zoom = 17;
    const r = api.lookup(index, lon, lat, zoom);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(r));
  });
  app.get("/:lon,:lat/:zoom?", (req, res) => {
    const { lat, lon, zoom } = req.params;
    const r = api.lookup(index, lon, lat, zoom);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(r));
  });
};
