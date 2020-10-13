//attach listener on window resize and run it once to start
window.addEventListener("resize", resizer);
resizer(); //hack to try to allow time for the image to load (could do this more robustly but that seems more complicated than necessary)

function resizer(){

	//resize the image if necessary
	var img = document.getElementById('paraImage')
	var hnow = img.getBoundingClientRect().height;
	var wnow = img.getBoundingClientRect().width;
	var aspect = 1080/1620;  //I'd rather not hard code this in, but it appears like I need to for this method to work
	var w = 0.44*window.innerWidth; //again, I'd rather not hardcode this (since it's in the style sheet), but it seems necessary
	var h = w*aspect;
	if (h > window.innerHeight*0.4){
		w = Math.min(0.4*window.innerHeight/aspect, 0.44*window.innerWidth);
		h = w*aspect;
	}
	img.height = h;
	img.width = w;
	img.style.paddingLeft = (document.getElementById('paraColumn').getBoundingClientRect().width -  w)/2. + "px";


	//resize the paragraph
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