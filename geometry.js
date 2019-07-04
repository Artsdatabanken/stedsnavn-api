function normalize(coord, bounds) {
  return [
    (coord[0] - bounds.left) / bounds.width,
    (coord[1] - bounds.bottom) / bounds.height
  ];
}

function getExtents(data) {
  const bounds = {
    left: 9e9,
    bottom: 9e9,
    right: -9e9,
    top: -9e9
  };
  data.forEach(d => {
    bounds.left = Math.min(bounds.left, d.coord[0]);
    bounds.right = Math.max(bounds.right, d.coord[0]);
    bounds.bottom = Math.min(bounds.bottom, d.coord[1]);
    bounds.top = Math.max(bounds.top, d.coord[1]);
  });
  bounds.width = bounds.right - bounds.left;
  bounds.height = bounds.top - bounds.bottom;
  return bounds;
}

module.exports = { getExtents, normalize };
