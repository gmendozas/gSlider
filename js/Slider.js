function Image(src, alt, link) {
	this.src = src;
	this.alt = alt;
	this.link = link;
};
//var images = new Array();
//var i = 0, speed = 2000;
//var firstTime = true;

$(document).ready(function() {	
	/*images[0] = new Image("images/img4.jpg", "Imagen 4", "http://www.google.com");
	images[1] = new Image("images/img5.jpg", "Imagen 5", "http://twitter.com");
	images[2] = new Image("images/img6.jpg", "Imagen 6", "http://www.facebook.com");
	images[3] = new Image("images/img7.jpg", "Imagen 7", "http://www.microsoft.com");

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
		$(".bSelector .preview").attr("src", images[index].src);
		$(".bSelector .preview").show();
		$(".labelImg").text(images[index].alt);
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
	
	startBanner();*/
});


function Slider(speed) {
	this.images = new Array();
	this.i = 0;
	this.speed = speed;
	this.firstTime = true;	
	//onLoaded();
	//startBanner();
}

Slider.prototype.onLoaded = function() {
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
		$(".bSelector .preview").attr("src", images[index].src);
		$(".bSelector .preview").show();
		$(".labelImg").text(images[index].alt);
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
};

Slider.prototype.startBanner = function() {
	if (this.i == this.images.length)
		this.i = 0;
	showNextImage(this.i, false);
	$("#bannerImage").fadeTo(1000, 1);
	timer = setTimeout("startBanner();", this.speed);
	$("#bannerImage").fadeTo(1500, 0.9);
};

Slider.prototype.showNextImage = function(index, keepShow) {
	if (keepShow)
		clearTimeout(timer);

	this.i = this.i > this.images.length ? 0 : (this.i < 0 ? this.images.length - 1 : this.i);

	$("#bannerImage").attr("src", this.images[index].src);
	$("#bannerImage").attr("alt", this.images[index].alt);
	$("#bannerLink").attr("href", this.images[index].link);
	$(".bSelector a img").removeClass("selectedCircle");
	$(".bSelector a img:eq(" + (index) + ")").attr("class", "selectedCircle");
	$(".bottomLabelImg").text(this.images[index].alt);
	if (keepShow) {
		this.i = index;
		timer = setTimeout("startBanner();", this.speed);
	} else
		this.i++;
	showAndHideControls();
};

Slider.prototype.showImage = function(next) {
	var newIndex = next ? this.i + 1 : this.i - 1;
	if (this.firstTime) {
		--newIndex;
		this.firstTime = false;
	}
	newIndex = newIndex < 0 ? this.images.length - 1 : (newIndex >= this.images.length ? 0 : newIndex);
	showNextImage(newIndex, true);
	showAndHideControls();
	return false;
};

Slider.prototype.showAndHideControls = function(){
	$(".stop").show();
	$(".play").hide();
};

Slider.prototype.loadImagesData = function(data, type) {
	type = type == undefined ? "json" : type;
	try {
		if(type == "json")
			this.images = $.parseJSON(data).images;
		else
			return "Type format not supported";
	} catch(err) {
		return err;
	}
	return true;
};
