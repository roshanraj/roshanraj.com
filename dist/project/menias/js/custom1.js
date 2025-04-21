function backListener()
{
	//alert('fa');
	$("#builoveh").animate({  opacity:"0"    }, 400 ,function(){$("#builoveh").css("visibility","hidden"); 
	
	document.getElementById("contentHolder").innerHTML = "<h1>Menias brings about the revolution with a perfect and rich blend of love, care and experience.</h1>";
	
	$(("#1")).stop().animate({top:"92px" , left: "0px",opacity:"1"    }, 500 );
	$(("#2")).stop().animate({top:"0px" , left: "140px",opacity:"1"    }, 500 );
	$(("#3")).stop().animate({top:"92px" , left: "280px",opacity:"1"    }, 500 );
	$(("#4")).stop().animate({top:"245px" , left: "220px",opacity:"1"    }, 500 );
	$(("#5")).stop().animate({top:"245px" , left: "55px",opacity:"1"    }, 500 );
	});
}

$(document).ready(function(e){
	
	$("#container_box").css('margin-top', ($(window).height() - ($("#container_box")).height()) / 2);
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
		
		$((("#"+rightfirst+",#"+leftfirst))).animate({top: $(("#"+ id)).position().top, left: $(("#"+ id)).position().left,opacity:"0"    }, 1000 ,
		function(){
			
			
			if (id==1)
			{
				$("#imgcon").attr("src","images/love-icon-w.png");
				document.getElementById("text").innerHTML ="Love";
				document.getElementById("contentHolder").innerHTML = "<h1>Our universe has been built with a love for healthy living. It’s not just practical; it is also an extremely passionate movement.</h1>";
			}
			
			if (id==2)
			{
				document.getElementById("text").innerHTML ="Change";
				$("#imgcon").attr("src","images/change-icon-w.png");
				document.getElementById("contentHolder").innerHTML = "<h1>The number of healthcare professionals using social media has increased significantly. Menias is a social media platform that believes in change with time. It is being used to educate as well as engage for an enlightening new experience in health care.</h1>";
			}
			
			if (id==3)
			{
				document.getElementById("text").innerHTML ="Experience";
				$("#imgcon").attr("src","images/exp-icon-w.png");
				document.getElementById("contentHolder").innerHTML = "<h1>While love and care form the base for a beautiful and hearty life, experience makes the base solid and firm. Menias is a podium full of experienced patients, doctors, labs and pharmacists you can trust.</h1>";
			}
			
			if (id==4)
			{
				document.getElementById("text").innerHTML ="Care";
				$("#imgcon").attr("src","images/care-icon-w.png");
				document.getElementById("contentHolder").innerHTML = "<h1>A healthy life is incomplete without proper care. Love and affection go hand in hand for a fit and long life.</h1>";
			}
			
			if (id==5)
			{
				document.getElementById("text").innerHTML ="People";
				$("#imgcon").attr("src","images/people-icon-w.png");
				document.getElementById("contentHolder").innerHTML = "<h1>People are core to Menias. Menias is by the people, for the people.</h1>";
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
	
	$(".site-menu").css({"top":($(window).height()-136)/2});
	
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
	$(".site-menu").css({"top":($(window).height()-136)/2});
	
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
	//alert(bloodGroup);
	
}


function onRegister(typing) {
	
	//alert(bloodGroup);
	
	initializeParameters();
	var dataString = "";
	
	type=typing;
	
	
	
	
	//alert (">>>"+lattitude+"  "+longitude);
	var flag =0;
	 
	if(type == "People") 
	{
		
		name=$("#nameP").val();
		emailId=$("#emailIdP").val();
		area=$("#areaP").val();
		if (name=="" || name==null)
		{
			$("#nameP").css("border-color","#900");
			document.getElementById("nameP").focus();
			flag = 1;
		}else
		
		if (emailId=="" || emailId==null)
		{
			$("#emailIdP").css("border-color","#900");
			document.getElementById("emailIdP").focus();
			flag = 1;
		}else
		
		if (area=="" || area==null)
		{
			$("#areaP").css("border-color","#900");
			document.getElementById("areaP").focus();
			flag = 1;
		}
		else
		{
			flag = 0;
		}
		
		
		
	}
	
	if(type == "Doctor") 
	{
		name=$("#nameD").val();
		emailId=$("#emailIdD").val();
		area=$("#areaD").val();
		
		
		if (name=="" || name==null)
		{
			$("#nameD").css("border-color","#900");
			document.getElementById("nameD").focus();
			flag = 1;
		}else
		
		
		if (emailId=="" || emailId==null)
		{
			$("#emailIdD").css("border-color","#900");
			document.getElementById("emailIdD").focus();
			flag = 1;
		}else
		
		
		if (area=="" || area==null)
		{
			$("#areaD").css("border-color","#900");
			document.getElementById("areaD").focus();
			flag = 1;
		}else
		{
			flag = 0;
		}
		
		
		
		
		
	}
	
	if(type == "Lab") 
	{
		name=$("#nameL").val();
		emailId=$("#emailIdL").val();
		area=$("#areaL").val();
		contactNumber=$("#contactNumberL").val();
		
		
		if (name=="" || name==null)
		{
			$("#nameL").css("border-color","#900");
			document.getElementById("nameL").focus();
			flag = 1;
		}else
		if (emailId=="" || emailId==null)
		{
			$("#emailIdL").css("border-color","#900");
			document.getElementById("emailIdL").focus();
			flag = 1;
		}else
		if (area=="" || area==null)
		{
			$("#areaL").css("border-color","#900");
			document.getElementById("areaL").focus();
			flag = 1;
		}else
		if (contactNumber=="" || contactNumber==null)
		{
			$("#contactNumberL").css("border-color","#900");
			document.getElementById("contactNumberL").focus();
			flag = 1;
		}
		else
		{
			flag = 0;
		}
		
		
	}
	
	if(type == "Pharmacy") {
		name=$("#namePh").val();
		emailId=$("#emailIdPh").val();
		area=$("#areaPh").val();
		contactNumber=$("#contactNumberPh").val();
		
		if (name=="" || name==null)
		{
			$("#namePh").css("border-color","#900");
			document.getElementById("namePh").focus();
			flag = 1;
		}else
		if (emailId=="" || emailId==null)
		{
			$("#emailIdPh").css("border-color","#900");
			document.getElementById("emailIdPh").focus();
			flag = 1;
		}else
		if (area=="" || area==null)
		{
			$("#areaPh").css("border-color","#900");
			document.getElementById("areaPh").focus();
			flag = 1;
		}else
		if (contactNumber=="" || contactNumber==null)
		{
			$("#contactNumberPh").css("border-color","#900");
			document.getElementById("contactNumberPh").focus();
			flag = 1;
		}else
		{
			flag = 0;
		}
		
		
	}
	
	//lattitude="0";
	// longitude="0";
	
	
	 
	 //alert(bloodGroup);


	 dataString = 'type='+ type +
					'&name='+ name +
					'&emailId='+ emailId +
					'&area='+ area +
					'&lattitude='+ lattitude +
					'&longitude='+ longitude  
					
					;
	 
	 
	 if(type == "Pharmacy" || type == "Lab") {
		 
		 dataString += '&contactNumber='+ contactNumber;
		 
	 } else if (type == "People" || type == "Doctor") {
		 dataString += '&bloodGroup='+ bloodGroup;
		 
		 
	 } else {
		 console.log("i dont care for this one");
	 }
	 
	 //alert(bloodGroup);
	 //alert (dataString);

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
			clearFields();
			
			//alert("Data Inserted");
		} else if (data == "duplicate") {
			
			message = "Already connected. We will get back to you soon with more updates.";
			clearFields()
			//alert("Already Exists!");
			
			
		} else {
			//alert("Failed");
			message = "Please try again after some time.";
			
		}
		
		 $(".tab-pane").removeClass("active");
			$(".home-blk-menu li").removeClass("active");
			
		
		document.getElementById("modal-text").innerHTML = message;
		document.getElementById("modal-textarea").value = "Become a part of the Menias universe, a revolutionary online platform that lets you share, save and search medical histories. In this fast-paced era, care is interconnected.";
		//alert
		$("#loader").fadeOut().css("visibility","hide");
		$('.modal').modal({show:"true"});
		modal.css('margin-top', ($(window).height() - modal.height()) / 2);
		
		
		
		
		
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
		 $("#modal-email").css("border-color","#900");
	}else
		{
				var message = document.getElementById("modal-textarea").value;
				alert(email+"  "+message+"   "+'&name='+ name +
						'&emailId='+ emailId );
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



