## Import/Export data with JSON
This code enables data to be entered manually into the table and data to be imported and exported in JSON format.

### 1. HTML structure (index.html) and styling (style.css):
 - The &lt;!DOCTYPE html&gt; tag defines the document type and the version of HTML.
 - In the &lt;head&gt; area, the document is provided with metadata, including the character encoding (&lt;meta charset="UTF-8"&gt;) and the view configuration for mobile devices (&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;).


### 2. Table:
 - A table (&lt;table&gt;) with three columns (last name, first name, e-mail) and three editable rows is defined.
 - Each cell (&lt;td&gt;) is provided with contenteditable="true" so that users can enter data directly.


### 3. JavaScript (script.js):
 - Two buttons are defined: "Import data" and "Export data", which are identified by their id attributes (import_Files_btn and export_Files_btn).

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

 - Selects all rows (&lt;tr&gt;) of the table and creates an empty array to store the row data.

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

 - Iterates over each table row and extracts the data from the cells (&lt;td&gt;). The data is formatted as an object (rowData) and inserted into the data array.

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

- Converts the data array to JSON, creates a Blob object from it and generates a URL. A temporary &lt;a&gt; element is created to allow the file to be downloaded and is removed after the click.

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
