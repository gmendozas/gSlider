var Image = function(src, alt, link) {
	this.src = src;
	this.alt = alt;
	this.link = link;
};

var images = new Array();
var i = 0, speed = 2000;
var firstTime = true;

$(document).ready(function() {
	images[0] = new Image("images/img1.jpg", "Imagen 1", "http://www.google.com");
	images[1] = new Image("images/img2.jpg", "Imagen 2", "http://www.compartamos.com.mx");
	images[2] = new Image("images/img3.jpg", "Imagen 3", "http://es.wikipedia.com");
	images[3] = new Image("images/img4.jpg", "Imagen 4", "http://www.outlook.com");
	images[4] = new Image("images/img5.jpg", "Imagen 5", "http://twitter.com");
	images[5] = new Image("images/img6.jpg", "Imagen 6", "http://www.facebook.com");
	images[6] = new Image("images/img7.jpg", "Imagen 7", "http://www.microsoft.com");

	$("#bannerLink").hover(function() {
			$(".bottomLabelImg").show();
		},
		function() {
			$(".bottomLabelImg").hide();
		}		
	);

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
}

function showImage(next) {
	var newIndex = next ? i + 1 : i - 1;
	if (firstTime) {--newIndex;
		firstTime = false;
	}
	newIndex = newIndex < 0 ? images.length - 1 : (newIndex >= images.length ? 0 : newIndex);
	showNextImage(newIndex, true);
	return false;
}
