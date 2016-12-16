OBJETIVO
==========

Realizar importação de arquivo excel para pai x filho - ECM / Fluig

### Pré - requisitos

* Arquivo excel de importação deve conter na sua primeira linha nome corresponde a informação da coluna.

* O nome da coluna deve ser informado para função que realiza a importação. 

** Exemplo:

Para linha 1 e coluna A temos como descrição 'item' sem aspas.
Para linha 1 e coluna B temos como descrição 'quantidade' sem aspas.

Portanto na linha 50 do arquivo 'appImport.js' temos:
	
	<pre><code> adicionaItem(output[i].item,output[i].quantidade); </code></pre>


Projeto está aberto para melhorias e correções.



### Créditos

	SheetJS/js-xlsx - (https://github.com/SheetJS/js-xlsx)
	