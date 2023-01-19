# debug-html

Add/remove debug text from div elements in html files.

## Usage
After installing the extension, two commands will now be available from the command palette.  
- `Add Debug`: adds .#. after each div element in the html file currently open in the vs code editor  
  - Optionally enter a letter in following text box to help differentiate files
  - Ex: Entering `x` will output .x#. and empty input will output .#.
- `Remove Debug`: removes the .#. added by the previous command

These should help to quickly identify elements on an html page that has many div elements.

## Example
Before:  
`<html>`  
&nbsp;&nbsp;`<div>start</div>`  
&nbsp;&nbsp;`<head>`  
&nbsp;&nbsp;&nbsp;&nbsp;`<div>head</div>`  
&nbsp;&nbsp;`</head>`  
&nbsp;&nbsp;`<body>`  
&nbsp;&nbsp;&nbsp;&nbsp;`<div>body</div>`  
&nbsp;&nbsp;`</body>`  
&nbsp;&nbsp;`<div>end</div>`  
`</html>`

After:  
`<html>`  
&nbsp;&nbsp;`<div>start</div>`.1.  
&nbsp;&nbsp;`<head>`  
&nbsp;&nbsp;&nbsp;&nbsp;`<div>head</div>`.2.  
&nbsp;&nbsp;`</head>`  
&nbsp;&nbsp;`<body>`  
&nbsp;&nbsp;&nbsp;&nbsp;`<div>body</div>`.3.  
&nbsp;&nbsp;`</body>`  
&nbsp;&nbsp;`<div>end</div>`.4.  
`</html>`

**Hope this helps!**
