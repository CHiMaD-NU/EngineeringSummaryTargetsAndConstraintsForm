//attach listener on window resize and run it once to start
window.addEventListener("resize", resizer);
resizer();

function resizer(){

	var lim = 0.1*window.innerHeight; //pixel limit to allow
	var nLim = 50; //limit the number of iterations for text resizing

	//resize the paragraph font size so the para fills the screen height
	var para = document.getElementById('paraColumn');
	var fs = parseFloat(window.getComputedStyle(para, null).getPropertyValue('font-size'));
	var rect = para.getBoundingClientRect();
	var height = window.innerHeight - rect.top;
	var diff = height - rect.height;
	var nTrial = 0;
	var fac = 0.5;

	while ((Math.abs(diff) > lim || diff < 0) & nTrial < nLim){
		var mult = fac*(1. + nTrial/nLim);
		if (diff > 0){
			mult =  2. - mult;
		}
		para.style.fontSize = fs*mult + 'px';
		fs = parseFloat(window.getComputedStyle(para, null).getPropertyValue('font-size'));
		rect = para.getBoundingClientRect();
		diff = height - (rect.height + 0.005*window.innerWidth); //adding to account for of form?

		nTrial += 1
	}
	document.getElementById('form').height = rect.height 
}