(function(){
	var clicked=false;
	var hover={
		accordian:function(viewPort,cards,hoverdCard,flag){  //flag checks that mouse enters or exits the div
			var hoveredClass=hoverdCard.getAttribute("class");
			var cardNo=hoveredClass[hoveredClass.length-1]-1;
			for(i=0;i<cards.length;i++)
			{
				var viewWidth=viewPort[0].offsetWidth;
				if(i>cardNo)
				{
					if(flag===0)
					{
						var rightShift=(parseInt(cards.eq(i).attr("data-posDisp"))/viewWidth)*100;
						rightShift=rightShift+"%";
						var origPos=parseInt(cards.eq(i).attr("data-origPos"));
						cards.eq(i).css({"transition":"left 0.5s ease"});
						cards.eq(i).css({"left":rightShift});
					}
					else if(flag===1)
					{
						var pos=(cards.eq(i).attr("data-origPos")/viewWidth)*100;
						pos=pos+"%";
						cards.eq(i).css({"transition":"left 0.5s ease"});
						cards.eq(i).css({"left":pos});
					}
				}
				else if(i<=cardNo)
				{
					if(flag===0)
					{
						var leftShift=(parseInt(cards.eq(i).attr("data-negDisp"))/viewWidth)*100;
						leftShift=leftShift+"%";
						var origPos=parseInt(cards.eq(i).attr("data-origPos"));
						cards.eq(i).css({"transition":"left 0.5s ease"});
						cards.eq(i).css({"left":leftShift});
					}
					else if(flag===1)
					{
						var pos=(cards.eq(i).attr("data-origPos")/viewWidth)*100;
						pos=pos+"%";
						cards.eq(i).css({"transition":"left 0.5s ease"});
						cards.eq(i).css({"left":pos});
					}
				}
			}
		},

		slide:function(viewPort,cards,clickedCard,flag){ //flag checks that wheather to slide out or in 
			if(flag===0)
			{
				var clickedClass=clickedCard.getAttribute("class");
				var cardNo=clickedClass[clickedClass.length-1]-1;
				var c=1.4;
				for(i=0;i<cards.length;i++)
				{
					if(i===cardNo)
					{
						cards.eq(i).css({"transition":"left 0.5s ease"});
						cards.eq(i).css({"left":"0%"});
						var back=cards.eq(i).children("div.back");
						back.eq(0).css({"transition":"opacity 0.5s ease"});
						back.eq(0).css({"opacity":"0.1"});
					}
					if(i<cardNo)
					{
						cards.eq(i).css({"transition":"left 0.5s ease"});
						cards.eq(i).css({"left":"-"+(i+1)*10+"%"});
					}
					else if(i>cardNo)
					{
						cards.eq(i).css({"transition":"left 0.5s ease"});
						cards.eq(i).css({"left":"101%"});
					}
					c=c-0.1;
				}
			}
			else if(flag===1)
			{
				var viewWidth=viewPort[0].offsetWidth;
				for(i=0;i<cards.length;i++)
				{
					var origPos=(cards.eq(i).attr("data-origPos")/viewWidth)*100;
					origPos=origPos+"%";
					cards.eq(i).css({"transition":"left 0.5s ease"});
					cards.eq(i).css({"left":origPos});
					var back=cards.eq(i).children("div.back");
					back.eq(0).css({"transition":"opacity 0.5s ease"});
					back.eq(0).css({"opacity":"0"});
				}
			}
		},

		init:function(){
			var viewPort=$("div.viewPort");
			var cards=$("div.viewPort div.card");
			var backButtons=$("div.viewPort div.card div.back");
			var pd=cards.length+1;
			var nd=0;
			for(i=0;i<cards.length;i++)
			{
				cards[i].setAttribute("data-origPos",cards[i].offsetLeft);
				var d1=pd*10;
				var d2=nd*10;
				if(i==0)
				{
					cards[i].setAttribute("data-posDisp",0);
					cards[i].setAttribute("data-negDisp",0);
				}
				else
				{
					cards[i].setAttribute("data-posDisp",d1+parseInt(cards.eq(i).attr("data-origPos")));
					cards[i].setAttribute("data-negDisp",parseInt(cards.eq(i).attr("data-origPos"))-d2);
				}
				pd--;
				nd++;
			}
			for(i=0;i<cards.length;i++)
			{
				cards.eq(i).mouseenter(function(){
					if(!clicked)
					{
						hover.accordian(viewPort,cards,this,0);
					}
				});
				cards.eq(i).mouseleave(function(){
					if(!clicked)
					{
						hover.accordian(viewPort,cards,this,1);
					}
				});
				cards.eq(i).click(function(){
					clicked=true;
					hover.slide(viewPort,cards,this,0);
				});
			}

			for(i=0;i<backButtons.length;i++)
			{
				backButtons.eq(i).click(function(e){
					if(clicked)
					{
						e.stopPropagation();
					}
					hover.slide(viewPort,cards,this,1);
					clicked=false;
				});
				backButtons.eq(i).mouseenter(function(e){
					if(clicked)
					{
						e.stopPropagation();
						var back=$(this);
						back.css({"transition":"opacity 0.5s ease"});
						back.css({"opacity":"0.5"});
					}
				});
				backButtons.eq(i).mouseleave(function(e){
					if(clicked)
					{
						e.stopPropagation();
						var back=$(this);
						back.css({"transition":"opacity 0.5s ease"});
						back.css({"opacity":"0.1"});
					}
				});
			}
		},
	}
	$(document).ready(function(){
		hover.init();
	});
})();