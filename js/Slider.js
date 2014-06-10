var Image = function(src, alt, link) {
	this.src = src;
	this.alt = alt;
	this.link = link;
};

var images = new Array();
var i = 0, speed = 2000;
var firstTime = true;

$(document).ready(function() {	
	images[0] = new Image("images/img4.jpg", "Imagen 4", "http://www.google.com");
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
	
	$(".previous").parent().click(function() {
		showImage(false);  
		return false;
	});

	$(".previous").hover(
		function(){
			$(this).attr("src", "images/left_hover.png");
		},
		function(){
			$(this).attr("src", "images/left.png");
		}
	);

	$(".next").parent().click(function() {
		showImage(true);  
		return false;
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
	
	startBanner();
});

function startBanner() {
	if (i == images.length)
		i = 0;
	showNextImage(i, false);
	$("#bannerImage").fadeTo(1000, 1);
	timer = setTimeout("startBanner();", speed);
	$("#bannerImage").fadeTo(1500, 0.9);
}

function showNextImage(index, keepShow) {
	if (keepShow)
		clearTimeout(timer);

	i = i > images.length ? 0 : (i < 0 ? images.length - 1 : i);

	$("#bannerImage").attr("src", images[index].src);
	$("#bannerImage").attr("alt", images[index].alt);
	$("#bannerLink").attr("href", images[index].link);
	$(".bSelector a img").removeClass("selectedCircle");
	$(".bSelector a img:eq(" + (index) + ")").attr("class", "selectedCircle");
	$(".bottomLabelImg").text(images[index].alt);
	if (keepShow) {
		i = index;
		timer = setTimeout("startBanner();", speed);
	} else
		i++;
	showAndHideControls();
}

function showImage(next) {
	var newIndex = next ? i + 1 : i - 1;
	if (firstTime) {
		--newIndex;
		firstTime = false;
	}
	newIndex = newIndex < 0 ? images.length - 1 : (newIndex >= images.length ? 0 : newIndex);
	showNextImage(newIndex, true);
	showAndHideControls();
	return false;
}

function showAndHideControls() {
	$(".stop").show();
	$(".play").hide();
}
