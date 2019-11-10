//Changes the label of the file type export
$(".file-type-selector").click(function(){
	var fileToSetTo = $(this).text();
	$("#file-type-btn").text(fileToSetTo);
});

$("#mode-rec-btn").click(function(){
	setModeText("RECTANGLE SNIP");
	$("#adv-select-section").css({"display" : "none", "visibility": "hidden"});
	$(".btn-mode-active").toggleClass('btn-mode-active');
	$(this).addClass('btn-mode-active');
	modeRec = true;
	modeCir = false;
	modePoly = false;
});
$("#mode-circ-btn").click(function(){
	setModeText("CIRCLE SNIP");
	$(".btn-mode-active").toggleClass('btn-mode-active');
	$(this).addClass('btn-mode-active');
	modeRec = false;
	modeCir = true;
	modePoly = false;
});
$("#mode-poly-btn").click(function(){
	setModeText("POLYGON SNIP");
	$(".btn-mode-active").toggleClass('btn-mode-active');
	$(this).addClass('btn-mode-active');
	modeRec = false;
	modeCir = false;
	modePoly = true;
});
$("#mode-adv-btn").click(function(){
	setModeText("ADVANCED");
	$(".btn-mode-active").toggleClass('btn-mode-active');
	$(this).addClass('btn-mode-active');
	modeRec = false;
	modeCir = false;
	modePoly = true;

});



function setModeText(stringToSet){
	$("#modeText").text(stringToSet);
}