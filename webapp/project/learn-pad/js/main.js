

	var arr=[];
    var op;

$(document).ready(function(e) {
   // $("#lk").mouseover(function() {
///	$("#lk_text").hide();   
	///$("#lk").css({ witdh: "2px" });
	$("#lk").animate({ width: "350px" }, 1000 );
	//$("#lk_text").fadeIn(1000); 
	var height = $("#container").height();
	//$('.scroll-pane').css('height',height);
	//$("#lk").css({ borderTop: "2px #333 solid" }); 
	//alert("hello");
//});


		$( ".but" ).draggable();
			
			$( "#drag_holder" ).droppable({
			  drop: function( event, ui ) 
			  {
			     //alert(ui.draggable.attr('id'));
				 
				 
				 
				 
				
					 num = parseInt(ui.draggable.attr('id'));
					 algo(ui.draggable.attr('id'));
					 if (isNaN(num))
					 op = ui.draggable.attr('id');
					 else
					 arr.push(num);
				
				
				if (arr.length>=2)
				$("#cover").animate({ left: "0px" }, 1000 );
				
				if(arr.length>=2 && isNaN(num))
				$("#cover").animate({ width: "800px" }, 1000 );
				
				init();
				
				//alert(op +"   "+ arr); 
			  }
			});
			
		
		});
		
		
		
	var cEditor ;	
		
		
		
		
		
		
		$(function()
{
	
	//alert(height);
	$('.scroll-pane').jScrollPane();
	
	 cEditor = CodeMirror.fromTextArea(document.getElementById("c-code"), {
        lineNumbers: true,
        matchBrackets: true,
        mode: "text/x-csrc"
      });
	 
	
	
	
});






function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}






var json = { "class": "go.GraphLinksModel",
  "linkFromPortIdProperty": "fromPort",
  "linkToPortIdProperty": "toPort",
  "nodeDataArray": [
{"category":"Comment", "loc":"360 -10", "text":"Operations on two number", "key":-13},
{"key":0, "category":"Start", "loc":"575 0", "text":"Start"},
{"key":2, "loc":"475 70", "text":"Take 8 as a"},
{"key":3, "loc":"375 140", "text":"Take 7 as b"},
{"key":4, "loc":"275 210", "text":"Sum = a+b"},
{"key":5, "loc":"175 280", "text":"Display Sum"},
{"key":-2, "category":"End", "loc":"75 350", "text":"Enjoy!"}
 ],
  "linkDataArray": [
{"from":0, "to":2, "fromPort":"B", "toPort":"T"},
{"from":2, "to":3, "fromPort":"B", "toPort":"T"},
{"from":3, "to":4, "fromPort":"B", "toPort":"T"},
{"from":4, "to":5, "fromPort":"B", "toPort":"T"},
{"from":5, "to":-2, "fromPort":"B", "toPort":"T"}
 ]};


var tjson ={ "class": "go.GraphLinksModel",
  "linkFromPortIdProperty": "fromPort",
  "linkToPortIdProperty": "toPort",
  "nodeDataArray": [
{"category":"Comment", "loc":"360 -10", "text":"Operations on two number", "key":-13},

 ],
  "linkDataArray": [

 ]};








var i=1;
var iy=1;

var vari ='a';
var sum = '';
var text = '';
var code ='';

/// for json file variable ///
var loca1 = 575;
var loca2 = 0;

function algo(valve)
{
	var objw = tjson;
 
	if (text=='')
	{
		text = text + '<table>'+
                            '    	<tr><td><b>Step <span style="color:#F63;">'+i+'</span></b> </td><td style="color:#333;">Start</td></tr>';
		code = code + '#include <stdio.h>\n'+
					'#include <conio.h>\n'+
					'void main()\n'+
					'{\n';					
					
		objw['nodeDataArray'].push({"key":(iy-1), "category":"Start",  "loc":(loca1+' '+loca2), "text":"Start"});
		objw['linkDataArray'].push({"from":(iy-1), "to":iy, "fromPort":"B", "toPort":"T"});
	    loca1 = loca1-100;
		loca2 = loca2+70;
		iy++;
	}
							
    if (isNaN(valve))
	{
		
		
		
		sum = sum.substring(0,sum.lastIndexOf("+"));
		
		
		if (valve=='+')
			sum ='Sum = '+ sum.replace(/[+]/g,"+");
		if (valve=='-')
			sum ='Sub = '+sum.replace(/[+]/g,"-");
		if (valve=='*')
			sum ='mul = '+ sum.replace(/[+]/g,"*");
		if (valve=='/')
			sum ='div = '+ sum.replace(/[+]/g,"/");
		//alert(sum + "   "+ (valve=='*')+"  "+( sum.replace(/[+]/g,"/")));
		
		text = text + '<tr><td><b>Step <span style="color:#F63;">'+(i+1)+'</span></b> </td><td style="color:#333;">'+sum+'</td></tr>';
		i++;
		
		text = text + '<tr><td><b>Step <span style="color:#F63;">'+(i+1)+'</span></b> </td><td style="color:#333;">Display '+sum.substring(0,3)+' </td></tr>';
	    i++; 
		                          
	    text = text + '  <tr><td><b>Step <span style="color:#F63;">'+(i+1)+'</span></b> </td><td style="color:#333;">Stop</td></tr>';
		
		
		
		objw['nodeDataArray'].push({"key":(iy-1), "loc":(loca1+' '+loca2), "text":sum});
		objw['linkDataArray'].push({"from":(iy-1), "to":iy, "fromPort":"B", "toPort":"T"});
		loca1 = loca1-100;
		loca2 = loca2+70;
		iy++;
		
		objw['nodeDataArray'].push({"key":(iy-1),  "loc":(loca1+' '+loca2), "text": ('Display '+sum.substring(0,3))});
		objw['linkDataArray'].push({"from":(iy-1), "to":iy, "fromPort":"B", "toPort":"T"});
		loca1 = loca1-100;
		loca2 = loca2+70;
		iy++;
		
		objw['nodeDataArray'].push({"key":(iy-1), "category":"End", "loc":(loca1+' '+loca2), "text":"Stop"});
		objw['linkDataArray'].push({"from":(iy-1), "to":-2, "fromPort":"B", "toPort":"T"});
		iy++;		
		
		code = code +'\t int '+sum.substring(0,3)+' = '+sum+';\n'+
		'\t printf("%d",'+sum.substring(0,3)+');\n \t getch();\n'+
		'}\n'
		
        //alert("$");                      
	}
	else
	{
		//alert("#");
		text = text + '<tr><td><b>Step <span style="color:#F63;">'+(i+1)+'</span></b> </td><td style="color:#333;">Take '+valve+' as '+vari+'</td></tr>';
		code = code + '\t int '+vari+' = '+valve+';\n';
		
		objw['nodeDataArray'].push({"key":(iy-1),  "loc":(loca1+' '+loca2), "text":('Take '+valve+' as '+vari) });
		objw['linkDataArray'].push({"from":(iy-1), "to":(iy), "fromPort":"B", "toPort":"T"});
		loca1 = loca1-100;
		loca2 = loca2+70;
		iy++;
		
		
		sum = sum + vari + '+';
		
		vari = nextChar(vari);
	}
	
	document.getElementById("Algorithm").innerHTML = text;
	//document.getElementById("c-code").value = "";	
	//document.getElementById("c-code").value = code;	
	//console.log (tjson);
	var str = JSON.stringify(tjson);
	 myDiagram.model = go.Model.fromJson(str);
	 document.getElementById("mySavedModel").value =JSON.stringify(tjson);
	 
    myDiagram.model.undoManager.isEnabled = true;
	//var editor = cEditor.fromTextArea(textArea);
	cEditor.getDoc().setValue(code);
	
	i++;
	
	
}







/*
function algo()
{
	var text = '';
	text = text + '<table>'+
                            '    	<tr><td><b>Step <span style="color:#F63;">1</span></b> </td><td style="color:#333;">Start</td></tr>';
							
							
    
								
	var vari = 'a';
	var sum = '';
	var i = 0;
	for(i = 0; i<arr.length;i++)
	{
		text = text + '<tr><td><b>Step <span style="color:#F63;">'+(i+1)+'</span></b> </td><td style="color:#333;">Take '+arr[i]+' as '+vari+'</td></tr>';
		sum = sum + vari + '+';
		vari++;
	}
	text = text + '<tr><td><b>Step <span style="color:#F63;">'+(i+1)+'</span></b> </td><td style="color:#333;">Sum = '+sum+'</td></tr>';
	i++;
	text = text + '<tr><td><b>Step <span style="color:#F63;">'+(i+1)+'</span></b> </td><td style="color:#333;">Display sum </td></tr>';
	                              
   text = text + '  <tr><td><b>Step <span style="color:#F63;">'+(i+1)+'</span></b> </td><td style="color:#333;">Stop, time for a cup of hot tea</td></tr>'+
                                '</table>';
	
	
	document.getElementById("Algorithm").innerHTML = text;
	
}


*/



function Ope()
{
	var len = arr.length;
	var sum =0;
	if (op=='+')
		alert((arr[0]+arr[1]));
	if (op=='-')
		alert((arr[0]-arr[1]));
	if (op=='*')
		alert((arr[0]*arr[1]));
	if (op=='/')
		alert((arr[0]/arr[1]));
		init();
}




////////////////////////////////////////////////////////////////////make flow chart ///////////////////////// for everyone //////////////////////////////


function init() {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates

    myDiagram =
      $(go.Diagram, "myDiagram",  // must name or refer to the DIV HTML element
        { allowDrop: true });  // must be true to accept drops from the Palette

    myDiagram.addDiagramListener("Modified", function(e) {
      var button = document.getElementById("SaveButton");
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });

    // helper definitions for node templates

    // Don't show shadows on mobile devices for performance reasons
    var shadows = !("ontouchstart" in window);

    function nodeStyle() {
      return {
        // the Node.location is at the center of each node
        locationSpot: go.Spot.Center,
        //isShadowed: shadows,
        //shadowColor: "#242424",
        // handle mouse enter/leave events to show/hide the ports
        mouseEnter: function (e, obj) { showPorts(obj.part, true); },
        mouseLeave: function (e, obj) { showPorts(obj.part, false); }
      };
    }

    // Define a function for creating a "port" that is normally transparent.
    // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
    // and where the port is positioned on the node, and the boolean "output" and "input" arguments
    // control whether the user can draw links from or to the port.
    function makePort(name, spot, output, input) {
      // the port is basically just a small circle that has a white stroke when it is made visible
      return $(go.Shape, "Circle",
               {
                  fill: "transparent",
                  stroke: null,  // this is changed to "white" in the showPorts function
                  desiredSize: new go.Size(6, 6),
                  alignment: spot, alignmentFocus: spot,  // align the port on the main Shape
                  portId: name,  // declare this object to be a "port"
                  fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
                  fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
                  cursor: "pointer"  // show a different cursor to indicate potential link point
               });
    }

    // define the Node template for regular nodes

    var lightText = 'whitesmoke';
    var darkText = '#454545';
    var startColor = "#79C900";
    var mainColor = "#00A9C9";
    var endColor = "#DC3C00";

    myDiagram.nodeTemplateMap.add("",  // the default category
      $(go.Node, "Spot", nodeStyle(),
        // The Node.location comes from the "loc" property of the node data,
        // converted by the Point.parse method.
        // If the Node.location is changed, it updates the "loc" property of the node data,
        // converting back using the Point.stringify method.
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
        $(go.Panel, "Auto",
          $(go.Shape, "Rectangle",
            { fill: mainColor, stroke: null },
            new go.Binding("figure", "figure")),
          $(go.TextBlock,
            { font: "bold 11pt Helvetica, Arial, sans-serif",
              stroke: lightText,
              margin: 8,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              editable: true },
            new go.Binding("text", "text").makeTwoWay())
        ),
        // four named ports, one on each side:
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, true, true),
        makePort("R", go.Spot.Right, true, true),
        makePort("B", go.Spot.Bottom, true, false)
      ));

    myDiagram.nodeTemplateMap.add("Start",
      $(go.Node, "Spot", nodeStyle(),
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, "Auto",
          $(go.Shape, "Octagon",
            { minSize: new go.Size(40, 60), fill: startColor, stroke: null }),
          $(go.TextBlock, "Start",
            { margin: 5,
                font: "bold 11pt Helvetica, Arial, sans-serif",
              stroke: lightText })
        ),
        // three named ports, one on each side except the top, all output only:
        makePort("L", go.Spot.Left, true, false),
        makePort("R", go.Spot.Right, true, false),
        makePort("B", go.Spot.Bottom, true, false)
      ));

    myDiagram.nodeTemplateMap.add("End",
      $(go.Node, "Spot", nodeStyle(),
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, "Auto",
          $(go.Shape, "Octagon",
            { minSize: new go.Size(40, 60), fill: endColor, stroke: null }),
          $(go.TextBlock, "End",
            { margin: 5,
              font: "bold 11pt Helvetica, Arial, sans-serif",
              stroke: lightText })
        ),
        // three named ports, one on each side except the bottom, all input only:
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, false, true),
        makePort("R", go.Spot.Right, false, true)
      ));

    myDiagram.nodeTemplateMap.add("Comment",
      $(go.Node, "Auto", nodeStyle(),
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "File",
          { fill: "#EFFAB4", stroke: null }),
        $(go.TextBlock,
          { margin: 5,
            maxSize: new go.Size(200, NaN),
            wrap: go.TextBlock.WrapFit,
            textAlign: "center",
            editable: true,
            font: "bold 12pt Helvetica, Arial, sans-serif",
            stroke: '#454545'
          },
          new go.Binding("text", "text").makeTwoWay())
        // no ports, because no links are allowed to connect with a comment
      ));


    // replace the default Link template in the linkTemplateMap
    myDiagram.linkTemplate =
      $(go.Link,  // the whole link panel
        { routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5, toShortLength: 4,
          relinkableFrom: true, relinkableTo: true, reshapable:true },
        new go.Binding("points").makeTwoWay(),
        $(go.Shape,  // the link path shape
          { isPanelMain: true,
            stroke: "gray", strokeWidth: 2 }),
        $(go.Shape,  // the arrowhead
          { toArrow: "standard",
          stroke: null, fill: "gray"}),
        $(go.Panel, "Auto",
          { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5},
          new go.Binding("visible", "visible").makeTwoWay(),
          $(go.Shape, "RoundedRectangle",  // the link shape
            { fill: "#F8F8F8", stroke: null }),
          $(go.TextBlock, "Yes",  // the label
            { textAlign: "center",
              font: "10pt helvetica, arial, sans-serif",
              stroke: "#919191",
              margin: 2, editable: true },
            new go.Binding("text", "text").makeTwoWay())
        )
      );

    // make link labels visible if coming out of a "conditional" node
    myDiagram.addDiagramListener("LinkDrawn", function(e) {
      if (e.subject.fromNode.data.figure === "Diamond") {
        var label = e.subject.findObject("LABEL");
        if (label !== null) label.visible = true;
      }
    })

    // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
    myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
    myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

    load();  // load an initial diagram from some JSON text

    // initialize the Palette that is on the left side of the page
    myPalette =
      $(go.Palette, "myPalette",  // must name or refer to the DIV HTML element
        {
          nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
          model: new go.GraphLinksModel([  // specify the contents of the Palette
            { category: "Start", text: "Start" },
            { text: "Step" },
            { text: "???", figure: "Diamond" },
            { category: "End", text: "End" },
            { category: "Comment", text: "Comment", figure: "RoundedRectangle" }
          ])
        });

  }

  // Make all ports on a node visible when the mouse is over the node
  function showPorts(node, show) {
    var diagram = node.diagram;
    if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
    var it = node.ports;
    while (it.next()) {
      var port = it.value;
      port.stroke = (show ? "white" : null);
      //port.fill = (show ? "white" : null);
    }
  }


  // Show the diagram's model in JSON format that the user may edit
  function save() {
    var str = myDiagram.model.toJson();
    document.getElementById("mySavedModel").value = str;
    myDiagram.isModified = false;
  }
  function load() {
    var str = document.getElementById("mySavedModel").value;
    myDiagram.model = go.Model.fromJson(str);
    myDiagram.model.undoManager.isEnabled = true;
  }

  function makeSVG() {
    var svg = myDiagram.makeSVG({
        scale: 0.5
      });
    svg.style.border = "1px solid black";
    obj = document.getElementById("SVGArea");
    obj.appendChild(svg);
  }