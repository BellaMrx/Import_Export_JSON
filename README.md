## Import/Export data with JSON
This code enables data to be entered manually into the table and data to be imported and exported in JSON format.

### 1. HTML structure (index.html) and styling (style.css):
 - The `<!DOCTYPE html>` tag defines the document type and the version of HTML.
 - In the <head> area, the document is provided with metadata, including the character encoding (`<meta charset="UTF-8">`) and the view configuration for mobile devices (`<meta name="viewport" content="width=device-width, initial-scale=1.0">`).


### 2. Table:
 - A table (`<table>`) with three columns (last name, first name, e-mail) and three editable rows is defined.
 - Each cell (`<td>`) is provided with `contenteditable="true"` so that users can enter data directly.


### 3. JavaScript (script.js):
 - Two buttons are defined: "Import data" and "Export data", which are identified by their id attributes (`import_Files_btn` and `export_Files_btn`).

   ```
    <button id="import_Files_btn">Import data</button>
    <button id="export_Files_btn">Export data</button>
   ```

#### 1. Export function:
##### Add event listener:
 - An event listener for the export button is added, which is triggered when clicked.

   ```
    document.getElementById('export_Files_btn').addEventListener('click', () => {
   ```

 - This code adds a click event listener to the "Export data" button.

##### Select table rows:
 - All table rows are selected and scrolled through. The data of each row (except the header row) is saved in an array (data).

   ```
    const rows = document.querySelectorAll('table tr');
    const data = [];
   ```

 - Selects all rows (`<tr>`) of the table and creates an empty array to store the row data.

##### Iterate over each line:

   ```
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length > 0) {
        const rowData = {
          lastName: cells[0].innerText,
          firstName: cells[1].innerText,
          email: cells[2].innerText
        };
        data.push(rowData);
      }
    });
   ```

 - Iterates over each table row and extracts the data from the cells (`<td>`). The data is formatted as an object (rowData) and inserted into the data array.

##### Create and download JSON file:

   ```
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
   ```

- Converts the data array to JSON, creates a Blob object from it and generates a URL. A temporary `<a>` element is created to allow the file to be downloaded and is removed after the click.

 #### 2. Import function:
 ##### Add event listener:
- An event listener is added for the import button, which is triggered when clicked.

   ```
    document.getElementById('import_Files_btn').addEventListener('click', () => {
   ```

 - This code adds a click event listener to the "Import data" button.

##### Create file input element:

   ```
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
   ```

 - Creates a hidden file input element that only accepts JSON files.

##### Handle file selection event:

   ```
    input.onchange = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
   ```

 - Defines a function that is executed when the user selects a file. The selected file object is retained and a FileReader object is created to read the file.

##### Read file and insert data into the table:

   ```
    reader.onload = event => {
      const json = JSON.parse(event.target.result);
      const rows = document.querySelectorAll('table tr');
      json.forEach((row, index) => {
        if (index < rows.length - 1) {
          const cells = rows[index + 1].querySelectorAll('td');
          cells[0].innerText = row.lastName;
          cells[1].innerText = row.firstName;
          cells[2].innerText = row.email;
        }
      });
    };
    reader.readAsText(file);
   ```

 - As soon as the file has been read (onload event), the content is parsed as JSON and the data is inserted into the corresponding table cells. The readAsText call starts the read process.

##### Open file selection:

   ```
    input.click();
   ```

- Simulates a click on the file input element to open the file selection window.






-------------------------------------------

index.html


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Export/Import with JSON</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Buttons to import and export the data -->
    <button id="import_Files_btn">Import data</button>
    <button id="export_Files_btn">Export data</button>
    
    <!-- Table for displaying and editing the data -->
    <table>
        <tr>
          <th>Last name</th>
          <th>First name</th>
          <th>Email</th>
        </tr>
        <tr>
          <td contenteditable="true"></td>
          <td contenteditable="true"></td>
          <td contenteditable="true"></td>
        </tr>
        <tr>
          <td contenteditable="true"></td>
          <td contenteditable="true"></td>
          <td contenteditable="true"></td>
        </tr>
        <tr>
          <td contenteditable="true"></td>
          <td contenteditable="true"></td>
          <td contenteditable="true"></td>
        </tr>
      </table>
    
    <!-- JavaScript for import and export functions -->
    <script src="script.js"></script>
</body>
</html>





-------------------------------------------
style.css


/* Styling of the table */
table {
    width: 50%;
    margin: 0 auto;
    /* border-collapse: collapse; */
}
  table, th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
}





-------------------------------------------
script-js


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
  