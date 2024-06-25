// Event listener for the export button
document.getElementById('export_Files_btn').addEventListener('click', () => {
    // Select all table rows
    const rows = document.querySelectorAll('table tr');
    const data = [];    // Array for saving the row data
  
    // Iterate over each line and save the data in an array
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');     // Select cells of the current row
      if (cells.length > 0) {                       // Process only rows with data (skip header)
        const rowData = {
          lastName: cells[0].innerText,             // Last name from the first cell
          firstName: cells[1].innerText,            // First name from the second cell
          email: cells[2].innerText                 // Email from the third cell
        };
        data.push(rowData);                         // Add the data of the current row to the array
      }
    });
  
    // Create JSON data and save as a blob object
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });   // Formatting JSON data
    const url = URL.createObjectURL(blob);  // Create a URL for the blob object
    const a = document.createElement('a');  // Create an <a> element
    a.href = url;                           // Assign the URL to the href attribute of the <a> element
    a.download = 'data.json';               // Set file name for the download
    document.body.appendChild(a);           // Add the <a> element to the DOM
    a.click();                              // Start the download by clicking on the <a> element
    document.body.removeChild(a);           // Remove the <a> element after the click
  });
  
  // Event listener for the import button
  document.getElementById('import_Files_btn').addEventListener('click', () => {
    const input = document.createElement('input');  // Create a file input element
    input.type = 'file';                            // Set the type of the input element to file
    input.accept = '.json';                         // Accept JSON files only
  
    // If a file is selected
    input.onchange = e => {
      const file = e.target.files[0];   // Get the selected file
      const reader = new FileReader();  // Create a FileReader object
  
      // Read file and insert data into the table
      reader.onload = event => {
        const json = JSON.parse(event.target.result);       // Read JSON data from the file
        const rows = document.querySelectorAll('table tr'); // Select all table rows
  
        // Iterate over the JSON data and update the table cells
        json.forEach((row, index) => {
          if (index < rows.length - 1) {                            // Ensure that the lines are not exceeded
            const cells = rows[index + 1].querySelectorAll('td');   // Select cells of the current row (skip header row)
            cells[0].innerText = row.lastName;                      // Insert last name in the first cell
            cells[1].innerText = row.firstName;                     // Insert first name in the second cell
            cells[2].innerText = row.email;                         // Insert e-mail into the third cell
          }
        });
      };
  
      // Read file as text
      reader.readAsText(file);  // Read the file as text to trigger the onload event
    };
  
    // Simulate clicking on the hidden file input element
    input.click();  // Open the file input element so that the user can select a file
  });
  