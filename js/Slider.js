// Class image
function Image(src, alt, link) {
	this.src = src;
	this.alt = alt;
	this.link = link;
};
// Class Slider
function Slider(speed, format, filename, data) {
	this.images = new Array();	
	this.speed = speed;
	this.format = format;
	this.filename = filename;
}
// Functions of Slider
Slider.prototype.loadImagesData = function() {	
	try {
		if(this.data != undefined && this.type == 'json') {
			if(type == "json")
				this.images = $.parseJSON(this.data).images;
		} else {
			var imgs = new Array();
			var format = this.format;
			$.ajax({
				type: "GET",
				url: this.filename,
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

function startBanner() {
	if (i == s.images.length)
		i = 0;
	showNextImage(i, false);
	$("#bannerImage").fadeTo(1000, 1);
	timer = setTimeout("startBanner();", s.speed);
	$("#bannerImage").fadeTo(1500, 0.9);
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
	showAndHideControls();
	return false;
};

function showAndHideControls(){
	$(".stop").show();
	$(".play").hide();
};

$(document).ready(function() {	
	s.loadImagesData();
	
	$("#bannerLink").hover(function() {
			$(".bottomLabelImg").show();
		},
		function() {
			$(".bottomLabelImg").hide();
		}		
	);
	
	$(".play").hover(
		function(){
			$(this).attr("src", "images/play_hover.png");
		},
		function(){
			$(this).attr("src", "images/play.png");
		}
	);
	
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
	
	$(".bSelector a").click(function() {
		showNextImage($('.bSelector a').index($(this)), true);
	});

	$(".bSelector a img").hover(function() {
		var index = $(".bSelector a").index(this.parentElement);
		$(".bSelector .preview").attr("src", s.images[index].src);
		$(".bSelector .preview").show();
		$(".labelImg").text(s.images[index].alt);
	}, function() {
		$(".bSelector .preview").hide();
	});
	
	$(".labelImg").click(function(){
		$("#bannerImage").click();
	});
	
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
	
	setTimeout("startBanner();", 30);
});