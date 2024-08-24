document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Add the initial loading row with an ID
  const loadingRow = document.createElement("tr");
  loadingRow.id = "loading";
  const loadingCell = document.createElement("td");
  loadingCell.colSpan = 2;
  loadingCell.textContent = "Loading...";
  loadingRow.appendChild(loadingCell);
  output.appendChild(loadingRow);

  // Function to create a promise that resolves after a random time
  function createPromise(promiseName) {
    return new Promise((resolve) => {
      const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
      setTimeout(() => {
        resolve({ name: promiseName, time: time.toFixed(3) });
      }, time * 1000);
    });
  }

  // Create an array of promises
  const promises = [
    createPromise("Promise 1"),
    createPromise("Promise 2"),
    createPromise("Promise 3"),
  ];

  // Start the timer
  const startTime = performance.now();

  // Wait for all promises to resolve
  Promise.all(promises).then((results) => {
    // Calculate the total time taken
    const endTime = performance.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(3);

    // Clear the loading row
    output.innerHTML = "";

    // Populate the table with the results
    results.forEach((result) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const timeCell = document.createElement("td");
      nameCell.textContent = result.name;
      timeCell.textContent = result.time;
      row.appendChild(nameCell);
      row.appendChild(timeCell);
      output.appendChild(row);
    });

    // Add the total time row
    const totalRow = document.createElement("tr");
    const totalNameCell = document.createElement("td");
    const totalTimeCell = document.createElement("td");
    totalNameCell.textContent = "Total";
    totalTimeCell.textContent = totalTime;
    totalRow.appendChild(totalNameCell);
    totalRow.appendChild(totalTimeCell);
    output.appendChild(totalRow);
  });
});
