const qt = require("./quadtree");

test("quadtile add", async () => {
  const root = {};

  qt.add(root, 0, 0, 0, "A");
  qt.add(root, 0.25, 0.25, 1, "B");
  qt.add(root, 0.25, 0.25, 2, "C");

  expect(root).toMatchSnapshot();
});

test("quadtile find", async () => {
  const root = {};

  qt.add(root, 0, 0, 0, "A");
  qt.add(root, 0.75, 0.75, 1, "B");
  const actual = qt.find2(root, 0.25, 0.75, 0.25, 1);
  expect(actual).toMatchSnapshot();
});

test("quadtile find out of range", async () => {
  const root = {};

  qt.add(root, 0, 0, 0, "A");
  qt.add(root, 0.75, 0.75, 1, "B");
  const actual = qt.find2(root, 0.25, 0.75, 0.24, 1);
  expect(actual).toMatchSnapshot();
});

test("quadtile find root", async () => {
  const root = {};

  qt.add(root, 0, 0, 0, "A");
  qt.add(root, 0.75, 0.75, 1, "B");
  const actual = qt.find2(root, 0.25, 0.75, 0.24, 0);
  expect(actual).toMatchSnapshot();
});

test("quadtile find multi", async () => {
  const root = {};

  qt.add(root, 0.1, 0.1, 2, "A");
  qt.add(root, 0.9, 0.1, 2, "B");
  qt.add(root, 0.1, 0.9, 2, "C");
  qt.add(root, 0.9, 0.9, 2, "D");
  debugger;
  const actual = qt.find2(root, 0.51, 0.75, 0.5, 2);
  expect(actual).toMatchSnapshot();
});
