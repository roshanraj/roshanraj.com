// JavaScript Document
function backListener()
{
	//alert('fa');
	$("#builoveh").animate({  opacity:"0"    }, 400 ,function(){$("#builoveh").css("visibility","hidden"); 
	
	document.getElementById("contentHolder").innerHTML = "<h1>We do everything with our core values of connecting people, bringing change, hard work and care.</h1>";
	
	$(("#1")).stop().animate({top:"92px" , left: "0px",opacity:"1"    }, 500 );
	$(("#2")).stop().animate({top:"0px" , left: "140px",opacity:"1"    }, 500 );
	$(("#3")).stop().animate({top:"92px" , left: "280px",opacity:"1"    }, 500 );
	$(("#4")).stop().animate({top:"245px" , left: "220px",opacity:"1"    }, 500 );
	$(("#5")).stop().animate({top:"245px" , left: "55px",opacity:"1"    }, 500 );
	});
}

$(function() {
    $("a").bind('click', function(event) {
		if($(this).hasClass("sign-up"))
		{
			$("#slide-4 .form-control").focus();
		}
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
		$(".content-section").css({"padding-top":(pt/2)-82, "padding-bottom":(pt/2)-82});
		$("#welcome-content").css({"padding-top":((pt-102)/2), "padding-bottom":((pt-102)/2)});
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
	$(".item-list .social-link a").tooltip();
	$(".i-menu li").click(function(){
		
		var target = $(this).attr("class");
		var id =  $(this).attr("id");
		//alert ( ((parseInt(id)+2)%5)+" "+ ((parseInt(id)+1)%5)+" left"+ id + "right "+ ((id-1))+" "+ (id-2));
		//alert ($('.'+target).position().top+"  "+$('.'+target).position().left);
		
		 var rightlast =  ( ((parseInt(id)+2)%5)==0 )?5:((parseInt(id)+2)%5);
		 var rightfirst =  ( ((parseInt(id)+1)%5)==0 )?5:((parseInt(id)+1)%5);
		// alert(rightlast+"  "+rightfirst)
		
		 var leftlast =((id-2)==0)?5:(((id-2)==-1)?4:(id-2));
		 var leftfirst =((id-1)==0)?5:(id-1);
		//alert(leftlast+"  "+leftfirst)
		
		//alert ( (rightlast)+" "+ (rightfirst)+" left"+ id + "right "+ (leftfirst)+" "+ (leftlast));
		
		$(("#"+rightlast)).animate({top: $('#'+rightfirst).position().top, left: $( '#'+rightfirst).position().left,opacity:"0"    }, 500 );
		$(("#"+leftlast)).animate({top: $('#'+leftfirst).position().top, left: $( '#'+leftfirst).position().left,opacity:"0"    }, 500 );
		
		$((("#"+rightfirst+",#"+leftfirst))).animate({top: $(("#"+ id)).position().top, left: $(("#"+ id)).position().left,opacity:"0"    }, 500 ,
		function(){
			
			
			if (id==1)
			{
				$("#imgcon").attr("src","images/love-icon-w.png");
				document.getElementById("text").innerHTML ="Love";
				document.getElementById("contentHolder").innerHTML = "<h1>Our universe has been built with a love for healthy living. Our fifth intention is to share Love and compassion with people.</h1>";
			}
			
			if (id==2)
			{
				document.getElementById("text").innerHTML ="Change";
				$("#imgcon").attr("src","images/change-icon-w.png");
				document.getElementById("contentHolder").innerHTML = "<h1>Too many people around the world are unhealthy, technology has potential to change this. Menias' first intention is to bring a change in the way your healthcare is delivered and approached.</h1>";
			}
			
			if (id==3)
			{
				document.getElementById("text").innerHTML ="Experience";
				$("#imgcon").attr("src","images/exp-icon-w.png");
				document.getElementById("contentHolder").innerHTML = "<h1>While love and care form the base for a beautiful and hearty life, experience makes the base solid and firm. Menias' second intention is to succeed by focusing on experience. We deeply care for an amazing user experience.</h1>";
			}
			
			if (id==4)
			{
				document.getElementById("text").innerHTML ="Care";
				$("#imgcon").attr("src","images/care-icon-w.png");
				document.getElementById("contentHolder").innerHTML = "<h1>Care isn't just about the doctor's office or emergency units, nor is it just about face-to-face relationships between people and doctors. It's about everything that affects people. Our third intention is to care for people.</h1>";
			}
			
			if (id==5)
			{
				document.getElementById("text").innerHTML ="People";
				$("#imgcon").attr("src","images/people-icon-w.png");
				document.getElementById("contentHolder").innerHTML = "<h1>We believe Care is all about sharing. The first step towards providing a better service is to connect people and units together, where People play the central role. Our fourth intention is to connect people and healthcare units on a social platform for care.</h1>";
			}
			
			
			//$(("#"+id)).animate({top:"200px" , left: "136px",opacity:"0"    }, 500 );
			$("#builoveh").css("visibility","visible").animate({opacity:"1"}, 500 );
			//$("#builove").fadeIn();
			//$(".i-menu").stop().hide('slide', {direction: 'left'}, 500 );
			
			$(("#1,#2,#3,#4,#5")).animate({top:"160px" , left: "136px",opacity:"0"}, 500 );
			});
		
		//$("#"+target).stop().show('slide', {direction: 'right'}, 500 );
		//$(".i-menu").stop().hide('slide', {direction: 'left'}, 500 );
		//$(window).resize();
	});

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