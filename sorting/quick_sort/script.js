// Utility function: Sleep for animations, pauses when `paused` is true
let paused = false;

const sleep = async (ms) => {
  while (paused) {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait until unpaused
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Generate a random array
const generateArray = (size, min, max) => Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);

// Tree rendering function
function renderTree(treeData, highlightNode = null) {
  const svg = d3.select("#tree-svg");
  svg.selectAll("*").remove(); // Clear existing tree

  // Define margins for better visibility
  const margin = { top: 100, right: 50, bottom: 50, left: 50 };
  const width = 1200 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  // Create tree layout
  const treeLayout = d3.tree().size([width, height]);

  // Define root node for the tree
  const root = d3.stratify()
    .id((d, i) => i)
    .parentId((d) => (treeData.indexOf(d.parent) !== -1 ? treeData.indexOf(d.parent) : null))
    (treeData);

  const tree = treeLayout(root);

  // Add group with margin adjustments
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Draw links (edges)
  g.append("g")
    .selectAll("path")
    .data(tree.links())
    .enter().append("path")
    .attr("d", d3.linkVertical()
      .x((d) => d.x)
      .y((d) => d.y))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", 2);

  // Draw nodes
  const nodes = g.append("g")
    .selectAll("g")
    .data(tree.descendants())
    .enter().append("g")
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  nodes.append("circle")
    .attr("r", 15)
    .attr("fill", (d) => (d.data === highlightNode ? "red" : "blue"));

  nodes.append("text")
    .attr("dy", -20)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "white")
    .text((d) => d.data.value);
}

// Quick Sort with Visualization
async function quickSort(array, treeData, parentNode, level = 0, infoElement) {
  if (array.length <= 1) {
    if (parentNode) {
      treeData.push({ value: array.join(","), parent: parentNode, level });
    }
    return array;
  }

  const pivot = array[array.length - 1];
  const left = array.filter((el, i) => el <= pivot && i !== array.length - 1);
  const right = array.filter((el) => el > pivot);

  const currentNode = { value: `[${array.join(", ")}]`, parent: parentNode, level };
  treeData.push(currentNode);

  // Update info panel
  infoElement.innerHTML = `
    <div>Current Array: [${array.join(", ")}]</div>
    <div>Pivot: ${pivot}</div>
    <div>Left: [${left.join(", ")}], Right: [${right.join(", ")}]</div>
  `;

  // Render tree and wait
  renderTree(treeData, currentNode);
  await sleep(1500);

  const sortedLeft = await quickSort(left, treeData, currentNode, level + 1, infoElement);
  const sortedRight = await quickSort(right, treeData, currentNode, level + 1, infoElement);

  return [...sortedLeft, pivot, ...sortedRight];
}

// DOM Elements
const infoElement = document.getElementById("info");
const startButton = document.getElementById("start-button");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");

// Event Listeners
startButton.addEventListener("click", async () => {
  const array = generateArray(7, 1, 30);
  const treeData = [];
  infoElement.innerHTML = "Starting Quick Sort...";
  startButton.disabled = true;
  playButton.disabled = false;
  pauseButton.disabled = false;

  await quickSort(array, treeData, null, 0, infoElement);

  infoElement.innerHTML = "Quick Sort Completed!";
  startButton.disabled = false;
  playButton.disabled = true;
  pauseButton.disabled = true;
});

playButton.addEventListener("click", () => {
  paused = false;
  playButton.disabled = true;
  pauseButton.disabled = false;
});

pauseButton.addEventListener("click", () => {
  paused = true;
  playButton.disabled = false;
  pauseButton.disabled = true;
});
