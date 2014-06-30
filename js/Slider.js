/**
 * Represents an image.
 * url: Location of image, it coudl be local.
 * alt: Alternative text, if you activate "label" option, alternative text will appear.
 * link: Destination, URL for image when you make click 
 */
function Image(src, alt, link) {
	this.src = src;
	this.alt = alt;
	this.link = link;
};

/**
 * Defines the properties of Slider.
 * 
 * bullets: Let show or hide how many images are, it shows the selected one. Use "yes" to show them and "no" in otherwise. Default value: "yes". 
 * controls: Let show or hide play and pause controls. Use "yes" to show them and "no" in otherwise. Default value: "yes",
 * effect: Set of value that defines Slider effect.
 * 			name: Name of effect. You can use "fade" or "toggle". Default value: "fade".
 * 			opacity: Value of opacity, Define when effect is "fade", value is between 0 and 1, where 1 is normal opacity and 0 totally opaque. Default value 0.9
 * ffControls: Let show or hide fast and forward controls. Use "yes" to show them and "no" in otherwise. Defaul value: "yes".
 * url: You can use a request to get an XML or JSON answer. Defines url with this option. 
 * frame: Let show or hide a frame for Slider. User "yes" to show it and "no" in otherwise. Default value: "no".
 * images: You can use an array of Image objects to fill Slider. Note that you might use JSON notation.
 * label: Let show or hide a label that shows a little information on the bottom of the image. Use "yes" to show it and "no" in otherwise. Default Value: "yes".
 * preview: When you use label option, bullets can show a preview image over itself. This option let you show or hide a preview one, Use "yes" to show it and "no" in otherwise. Default value: "yes". 
 * speed: Defines the time that image going to change. It must be in miliseconds. Default value: 3000 miliseconds.
 * type: When you use a request to get images you must define data format, you can use "json" or "xml".
 */
function Slider(options) {
	this.bullets = options.bullets == undefined ? "yes" : options.bullets;
	this.controls = options.controls == undefined ? "yes" : options.controls;
	this.effect = options.effect;
	this.effect.name = this.effect.name == undefined ? "fade" : options.effect.name;
	this.effect.opacity = this.effect.opacity == undefined ? 0.9 : options.effect.opacity;
	this.ffControls = options.ffControls == undefined ? "yes" : options.ffControls;
	this.url = options.url;
	this.frame = options.frame == undefined ? "no" : "yes";
	this.images = options.images.images != undefined ? options.images.images : new Array();
	this.label = options.label == undefined ? "yes" : options.label;
	this.preview = options.preview == undefined ? "yes" : options.preview;
	this.speed = options.speed == undefined ? 3000 : option.speed;
	this.type = options.type;	
}

/**
 * Function that loads images to array. Use parameters defined in Slider constructor.
 * @return true if it's successful, error message in otherwise.
 *  
 */
Slider.prototype.loadImagesData = function() {	
	try {
		if(this.url != undefined) {			
			var imgs = new Array();
			var format = this.type;
			$.ajax({
				type: "GET",
				url: this.url,
				dataType: format,
				success: function(result){
					if(format == "xml") {						
						$(result).find('image').each(function(){
							var image = new Image($(this).find('src').text(), $(this).find('alt').text(), $(this).find('link').text());
							imgs.push(image);
						});
					} else if(format == "json") {						
						$(result.images).each(function() {
							imgs.push(this);
						});
					}					
				},
				error: function() {
					return "An error occurred while processing " + format + " file.";
				}				
			});
			this.images = imgs;
		}
	} catch(err) {
		return err;
	}
	return true;
};

// Slider code
var i = 0;
var firstTime = true;

function startAnimation() {
	if(s.effect.name == "fade")
		$("#bannerImage").fadeTo(1000, s.effect.opacity);
	/*else if(s.effect.name == "slide")
		$("#bannerImage").slideDown(s.speed);*/
	else if(s.effect.name == "toggle")
		$("#bannerImage").toggle(s.effect.kind);
}

function stopAnimation() {
	if(s.effect.name == "fade")
		$("#bannerImage").fadeTo(1500, s.effect.opacity);
	/*else if(s.effect.name == "slide")
		$("#bannerImage").slideUp(s.speed);*/
	else if(s.effect.name == "toggle")
		$("#bannerImage").toggle(s.effect.kind);
}

function startBanner() {
	if (i == s.images.length)
		i = 0;
	showNextImage(i, false);	
	startAnimation();
	timer = setTimeout("startBanner();", s.speed);	
	stopAnimation();
};

function showNextImage(index, keepShow) {
	if (keepShow)
		clearTimeout(timer);

	i = i > s.images.length ? 0 : (i < 0 ? s.images.length - 1 : i);

	$("#bannerImage").attr("src", s.images[index].src);
	$("#bannerImage").attr("alt", s.images[index].alt);
	$("#bannerLink").attr("href", s.images[index].link);
	$(".bSelector a img").removeClass("selectedCircle");
	$(".bSelector a img:eq(" + (index) + ")").attr("class", "selectedCircle");
	$(".bottomLabelImg").text(s.images[index].alt);
	if (keepShow) {
		i = index;				
		timer = setTimeout("startBanner();", s.speed);		
	} else
		i++;
	if(s.controls == "yes")
		showAndHideControls();
};

function showImage(next) {
	var newIndex = next ? i + 1 : i - 1;
	if (firstTime) {
		--newIndex;
		firstTime = false;
	}
	newIndex = newIndex < 0 ? s.images.length - 1 : (newIndex >= s.images.length ? 0 : newIndex);
	showNextImage(newIndex, true);
	if(s.controls == "yes")
		showAndHideControls();
	return false;
};

function showAndHideControls(){
	$(".stop").show();
	$(".play").hide();
};

$(document).ready(function() {	
	s.loadImagesData();
	
	if(s.frame != undefined) { // Show or hide frame
		if(s.frame == "no") {
			$("#mainContainer").css("border", "none");
			$("#mainContainer").css("box-shadow", "none");
			$("#mainContainer").css("-webkit-box-shadow", "none");
		}
	}
	
	if(s.bullets != undefined) { // Show or hide bullets
		if(s.bullets == "yes") {
			$(".bSelector").show();			
			
			$(s.images).each(function() { // Create bullets using number of images to show	
				$(".bSelector").append('<a><img src="images/circle.png"/></a>');
			});
			
			$(".bSelector a").click(function() {
				showNextImage($('.bSelector a').index($(this)), true);
			});					
			
			if(s.preview != undefined) { // Show or hide image preview
				if(s.preview == "yes") {
					$(".bSelector a img").hover(function() {
						var index = $(".bSelector a").index(this.parentElement);
						$(".bSelector .preview").attr("src", s.images[index].src);
						$(".bSelector .preview").show();
						$(".labelImg").text(s.images[index].alt);
					}, function() {
						$(".bSelector .preview").hide();
					});
				}
			}	
		}
		else if(s.bullets == "no")
			$(".bSelector").hide(); 
	}
	
	if(s.label != undefined) { // Show or hide image label
		if(s.label == "yes") {
			$("#bannerLink").hover(function() {
					$(".bottomLabelImg").show();
				},
				function() {
					$(".bottomLabelImg").hide();
				}		
			);
			
			$(".labelImg").click(function(){
				$("#bannerImage").click();
			});		
		} else {
			$(".labelImg").hide();
		}		
	}
		
	if(s.controls != undefined) { // Show or hide play/pause controls
		if(s.controls == "yes") {
			$(".play").hover(
				function(){
					$(this).attr("src", "images/play_hover.png");
				},
				function(){
					$(this).attr("src", "images/play.png");
				}
			);
			
			$(".play").click(function() {
				startBanner();
				$(this).hide();
				$(".stop").show();
			});
			
			$(".stop").click(function() {
				clearTimeout(timer);
				$(this).hide();
				$(".play").show();
			});	
		} else {
			$(".slider .play").hide();
			$(".slider .stop").hide();
		}		
	}		
	
	if(s.ffControls != undefined) { // Show or hide fast and forward controls
		if(s.ffControls == "yes") {
			$(".previous").click(function() {
				showImage(false);  
			});
		
			$(".previous").hover(
				function(){
					$(this).attr("src", "images/left_hover.png");
				},
				function(){
					$(this).attr("src", "images/left.png");
				}
			);
		
			$(".next").click(function() {
				showImage(true);  
			});
				
			$(".next").hover(
				function(){
					$(this).attr("src", "images/right_hover.png");
				},
				function(){
					$(this).attr("src", "images/right.png");
				}
			);	
		} else {
			$(".previous").hide();
			$(".next").hide();
		}
	}	
	
	setTimeout("startBanner();", 30);
});