	$('#imgAddItem').on('click', function(ev){
		wdkAddChild('tbItem');
	});

	function adicionaItem(item,quantidade){
		
		var idx = wdkAddChild('tbItem');
		
		$("#txtCodigo___"+idx).val(item);
		$("#txtQtd___"+idx).val(quantidade);
		
		
	}