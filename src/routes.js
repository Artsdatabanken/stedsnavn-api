module.exports = function(app, index) {
  app.get("*?", (req, res, next) => {
    //const coords = normalize([109707, 6474015]);
    const coords = geometry.normalize(
      //  [6.123769447236364, 58.38904167024711],
      [8.001252772583749, 58.14704999571571],
      bounds
    );

    index
      .get(decodeURIComponent(req.path), req.query, req.headers.host)
      .then(node => {
        if (!node) return next();
        if (node.canBrowse) browse(node, req.path);
        if (!node.contentType) return next();
        res.setHeader("Content-Type", node.contentType);
        if (!node.buffer) return res.sendFile(node.physicalDir);

        const compression = getCompression(node.buffer);
        if (compression) res.setHeader("Content-Encoding", compression);
        res.send(node.buffer);
      })
      .catch(err => {
        next(err);
      });
  });
};
