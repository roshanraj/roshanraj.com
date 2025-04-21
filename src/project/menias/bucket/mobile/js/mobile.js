// JavaScript Document

$(function() {
    $("a").bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });
});

function pageH(){
	var ph = $(window).height();
	var rh = $(".content-section .row").height();
	var pt = ph - rh;
	if (pt > 0){
		$(".content-section").css({"padding-top":(pt/2)-18, "padding-bottom":(pt/2)-18});
		$("#welcome-content").css({"padding-top":((pt-62)/2), "padding-bottom":((pt-62)/2)});
	}
	else
	{
		$(".content-section").css({"padding-top":"auto", "padding-bottom":"auto"});
		$("#welcome-content").css({"padding-top":"auto", "padding-bottom":"auto"});
	}
	//alert(pt);
}

$(document).ready(function(e) {
	pageH();
});

$(document).scroll(function(e) {
	pageH();
});

$(window).load(function(e) {
	pageH();
});

$(window).resize(function(e) {
	pageH();
});