//Changes the label of the file type export
$(".file-type-selector").click(function(){
	var fileToSetTo = $(this).text();
	$("#file-type-btn").text(fileToSetTo);
});