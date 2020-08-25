/*
filedrag.js - HTML5 File Drag & Drop demonstration
Featured on SitePoint.com
Developed by Craig Buckler (@craigbuckler) of OptimalWorks.net
*/

(function() {
    
   	// getElementById
	function $id(id) {
		return document.getElementById(id);
	} 

	// file selection
	function FileSelectHandler(e) {
		
			// fetch FileList object
			var files = e.target.files || e.dataTransfer.files;
			
			ParseFile(files[0]);
			
	}

	// output file information
	function ParseFile(file) {
			hashMe(file);
	}


	// initialize
	function Init() {

		var fileselect = $id("fileselect"),
			submitbutton = $id("genrom");

		// file select
		fileselect.addEventListener("change", FileSelectHandler, false);
		submitbutton.disabled = true;

	}

	// call initialization file
	if (window.File && window.FileList && window.FileReader) {
		Init();
	}


})();