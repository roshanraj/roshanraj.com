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

$(document).ready(function(e){
	//alert(($(window).height() - $("#main-panel").height()) / 2);
	
	//$("#top-blk").css('margin-top', (($(window).height() - $("#main-panel").height()) / 2) );
	//$("#loader").css("visibility","visible").fadeIn();
///	$(".modal").modal({show:"true"});
	//$('.modal').css('background-color','#FFF');
//	$("#top-blk").css('margin-top', (($(window).height() - $(".spinner").height()) / 2)-100);
	
		$(".spinner").css('margin-top', (($(window).height() - $(".spinner").height()) / 2)-100);
	 $(".item-list .social-link a").tooltip();
	
	try
	{
	
	//modal initialization////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	modal = $('.modal-dialog');
	//$('.modal').modal({show:"true"});
	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////
	}catch(ss)
	{}
	
	
	$(".q-links").click(function(){
		$(".f-content").toggle();
		$(this).toggleClass("open");
		$('html, body').animate({ scrollTop: $("footer").height() }, 500);
		$(window).resize();
		
		
	});
		
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
	
	//$(".i-content-w .back").click(function(){
		//var target = $(this).parents(".i-content-w").attr("id");
	//	$("#"+target).stop().hide('slide', {direction: 'right'}, 500 );
	//	$(".i-menu").stop().show('slide', {direction: 'left'}, 500 );
		//$(window).resize();
	//});
	
	var mTop = $(window).height() - $(".container_box").height() - 90;
	if (mTop >= 105){
		//$(".container_box").css({"margin-top":(mTop/2)+60})
	}
	else
	{
		//$(".container_box").css({"margin-top":105})
	}
	
	if(($("body").height()-$("footer").height()+113)< $(window).height()){
		$("footer").css({"position":"fixed", "width":"100%", "bottom":0});
		$("body").css({"padding-bottom":$("footer").height()});
	}
	else{
		$("footer").removeAttr("style");
		$("body").css({"padding-bottom":0});
		}
});

$(window).resize(function(e) {
	
	//$("#top-blk").css('margin-top', (($(window).height() - $("#top-blk").height()) / 2));
	
	
	var mTop = $(window).height() - $(".container_box").height() - 90;
	if (mTop >= 105){
		//$(".container_box").css({"margin-top":(mTop/2)+60});
	}
	else
	{
		//$(".container_box").css({"margin-top":105});
	}

	if(($("body").height()-$("footer").height()+113)< $(window).height()){
		$("footer").css({"position":"fixed", "width":"100%", "bottom":0});
		$("body").css({"padding-bottom":$("footer").height()});
	}
	else{
		$("footer").removeAttr("style");
		$("body").css({"padding-bottom":0});
		}
});

/////////////////////////////////////////// INTEGRATION SECTION ////////////////////////////////////////////
var type ="";
var name = "";
var emailId = "";
var area = "";
var lattitude = "";
var longitude = "";
var bloodGroup = "";
var contactNumber = "";

function initializeParameters() {
	type = "";
	name = "";
	emailId ="";
	area = "";
	//lattitude = "";
	//longitude = "";

	contactNumber = "";
	
}

function setLocation(lat,log) {
	lattitude = lat;
	longitude = log;
	//alert (">>>"+lattitude+"  "+longitude);
}


function setBloodGroup(bgroup) {
	bloodGroup = bgroup;
	$(".btn-continue").fadeIn("slow");
}

function onRegister(typing) {
	initializeParameters();
	var dataString = "";
	
	type=typing;
	
	var flag =0;
	 
	name = document.getElementById('nameP').value;
	type = "user";
	emailId= document.getElementById('emailIdP').value;
	area = document.getElementById('areaP').value;
	
	
	 dataString = 'type='+ type +
					'&name='+ name +
					'&emailId='+ emailId +
					'&area='+ area +
					'&lattitude='+ lattitude +
					'&longitude='+ longitude;
	 
	// if(type == "Pharmacy" || type == "Lab") {
		// dataString += '&contactNumber='+ contactNumber;
	// } else if (type == "People" || type == "Doctor") {
		 dataString += '&bloodGroup='+ bloodGroup;
		// alert(dataString);
		 
	// } else {
	//	 console.log("i dont care for this one");
	 //}
	 
	var json;
	var Message;
	//alert (flag);
	if (flag == 0)
	{	
	$("#loader").css("visibility","visible").fadeIn();
	
	$.post("registerWithBasicDetails", dataString,
            function(data) {
		var message ="";
		
		if(data == "success") {
			
			message =  "We appreciate your connection.";
			clearFields()
			$("#contact-info").fadeOut('slow',function(){
					$("#thanks").fadeIn('slow');
				});
			//alert("Data Inserted");
		} else if (data == "duplicate") {
			
			message = "Already connected. We will get back to you soon with more updates.";
			$("#contact-info").fadeOut('slow',function(){
					$("#dup").fadeIn('slow');
				});
			//clearFields()
			//alert("Already Exists!");
			
		}
		
		//$(".tab-pane").removeClass("active");
		//$(".home-blk-menu li").removeClass("active");

		//document.getElementById("modal-text").innerHTML = message;
		//document.getElementById("modal-textarea").value = "Become a part of the Menias universe, a revolutionary online platform that lets you share, save and search medical histories. In this fast-paced era, care is interconnected.";
		$("#loader").fadeOut().css("visibility","hide");
		//$('.modal').modal({show:"true"});
		//$('.modal').css('background-color','#FFF');
		//$('.modal').css('opacity','0.5');
		//modal.css('margin-top', ($(window).height() - modal.height()) / 2);
            },"text");
	}
}


///////////////////////// function to handle modal spread message ///////////////////////////
function modal_spread()
{
	var email = document.getElementById("modal-email").value;
	if (email=="" || email==null)
	{
		document.getElementById("modal-email").focus();
		 $("#modal-email").css("border-color","#f00");
	}else
		{
				var messageF = document.getElementById("modal-textarea").value;
				//alert(email+"  "+message+"   "+'&name='+ name +
				//		'&emailId='+ emailId );
			
				
				 dataString = 'fromEmailId='+ emailId +
								'&fromName='+ name +
								'&emailIds='+ email +
								'&message='+ messageF ;
				
				 $("#loader").css("visibility","visible").fadeIn();
					
					$.post("inviteFriends", dataString,
				            function(data) {
						var message ="";
						$("#loader").fadeOut().css("visibility","hide");
						
						if(data == "Email Sent") 
						{
							
							$('.modal').modal('hide');
							
							//alert("Data Inserted");
						} else {
							//alert("Failed");
							//message = "Please try again after some time.";
						}
					});				
		}
}

///////////////////////////////clear fields //////////////////////////////////////////////////

function clearFields()
{
	var elements = document.getElementsByClassName("form-control");
	for (var i = 0; i < elements.length; i++) {
	    elements[i].value = '';
	}
}
///////////////////////////////////////// INTEGRATION SECTION ////////////////////////////////////////////