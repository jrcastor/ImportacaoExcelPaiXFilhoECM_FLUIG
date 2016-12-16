	var X = XLSX;
	var XW = {
		msg: 'xlsx',
		rABS: 'xlsxworker2.js',
		norABS: 'xlsxworker1.js',
		noxfer: 'xlsxworker.js'
	};

	var drop = document.getElementById('dropFile');
	function handleDrop(e) {
		e.stopPropagation();
		e.preventDefault();
		var files = e.dataTransfer.files;
		var f = files[0];
		{
			var reader = new FileReader();
			var name = f.name;
			reader.onload = function(e) {
				if(typeof console !== 'undefined') console.log("onload", new Date());
				var data = e.target.result;
					xw(data, process_wb);
			};
			reader.readAsBinaryString(f);
		}
	}

	function handleDragover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	}

	if(drop.addEventListener) {
		drop.addEventListener('dragenter', handleDragover, false);
		drop.addEventListener('dragover', handleDragover, false);
		drop.addEventListener('drop', handleDrop, false);
	}

	function xw(data, cb) {
		xw_xfer(data, cb);
	}

	function process_wb(wb) {

		var output = to_json(wb);
		

		for (var i=0; i<output.length; i++){

			adicionaItem(output[i].item,output[i].quantidade);

		}

		if(typeof console !== 'undefined') console.log("output", new Date());

	}

	function xw_xfer(data, cb) {
		var worker = new Worker(XW.rABS);
		worker.onmessage = function(e) {
			switch(e.data.t) {
				case 'ready': break;
				case 'e': console.error(e.data.d); break;
				default: xx=ab2str(e.data).replace(/\n/g,"\\n").replace(/\r/g,"\\r"); console.log("done"); cb(JSON.parse(xx)); break;
			}
		};
		var val = s2ab(data);
		worker.postMessage(val[1], [val[1]]);
	}

	function ab2str(data) {
		var o = "", l = 0, w = 10240;
		for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint16Array(data.slice(l*w,l*w+w)));
		o+=String.fromCharCode.apply(null, new Uint16Array(data.slice(l*w)));
		return o;
	}

	function s2ab(s) {
		var b = new ArrayBuffer(s.length*2), v = new Uint16Array(b);
		for (var i=0; i != s.length; ++i) v[i] = s.charCodeAt(i);
		return [v, b];
	}

	function to_json(workbook) {
		var result = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
			if(roa.length > 0){
				result = roa;
			}
		});
		return result;
	}