const qt = require("./quadtree");

test("quadtile add", async () => {
  const root = {};

  qt.add(root, 0, 0, 0, "A");
  qt.add(root, 0.25, 0.25, 1, "B");
  qt.add(root, 0.25, 0.25, 2, "C");

  console.log(JSON.stringify(root));
  expect(root).toMatchSnapshot();
});
