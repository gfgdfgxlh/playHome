$(function(){var a=$(".index-pro").width()/4;$(".index-probox").width(a-2);$(window).resize(function(){var c=$(".index-pro").width()/4;$(".index-probox").width(c-2)});$(".index-probox").hover(function(){$(this).children("div").stop().fadeIn(800);$(this).find("h3").delay(200).stop().animate({marginTop:[80,"easeOutCirc"]},800)},function(){$(this).children("div").stop().fadeOut();$(this).find("h3").stop().animate({marginTop:[46,"easeOutCirc"]},800)});$(".index-newsri dl").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")});var b=$(".index-brand").width()/4;$(".index-brandbox").width(b-1);$(window).resize(function(){var c=$(".index-brand").width()/4;$(".index-brandbox").width(c-1)});$("#brandbox1").hover(function(){$(this).stop().animate({marginTop:"-17px",paddingTop:"17px",paddingBottom:"17px"},300).css({background:"#ff6666"}).addClass("hover")},function(){$(this).stop().animate({marginTop:"0",paddingTop:"0",paddingBottom:"0"},300).css({background:"#F4F4F4"}).removeClass("hover")});$("#brandbox2").hover(function(){$(this).stop().animate({marginTop:"-17px",paddingTop:"17px",paddingBottom:"17px"},300).css({background:"#9933ff"}).addClass("hover")},function(){$(this).stop().animate({marginTop:"0",paddingTop:"0",paddingBottom:"0"},300).css({background:"#F4F4F4"}).removeClass("hover")});$("#brandbox3").hover(function(){$(this).stop().animate({marginTop:"-17px",paddingTop:"17px",paddingBottom:"17px"},300).css({background:"#66cc99"}).addClass("hover")},function(){$(this).stop().animate({marginTop:"0",paddingTop:"0",paddingBottom:"0"},300).css({background:"#F4F4F4"}).removeClass("hover")});$("#brandbox4").hover(function(){$(this).stop().animate({marginTop:"-17px",paddingTop:"17px",paddingBottom:"17px"},300).css({background:"#3366cc"}).addClass("hover")},function(){$(this).stop().animate({marginTop:"0",paddingTop:"0",paddingBottom:"0"},300).css({background:"#F4F4F4"}).removeClass("hover")});$(".cooper li").hover(function(){$(this).find(".iconcover2").stop().fadeIn();$(this).find(".iconbg").stop().animate({top:[-73,"easeOutCirc"]},400)},function(){$(this).find(".iconcover2").stop().fadeOut();$(this).find(".iconbg").stop().animate({top:[0,"easeOutCirc"]},400)});$(".job-list li").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")});$(".partner li").hover(function(){$(this).find("img").stop().animate({marginTop:[15,"easeOutElastic"]},800)},function(){$(this).find("img").stop().animate({marginTop:[0,"easeOutElastic"]},800)});$(".goleft").hover(function(){$(this).children().animate({left:"-5px"},200,function(){$(this).animate({left:"0px"},200,function(){$(this).animate({left:"-5px"},200,function(){$(this).animate({left:"0px"},200)})})})},function(){});$(".goright").hover(function(){$(this).children().animate({left:"5px"},200,function(){$(this).animate({left:"0px"},200,function(){$(this).animate({left:"5px"},200,function(){$(this).animate({left:"0px"},200)})})})},function(){})});function goTop(){$("html,body").animate({scrollTop:0},600)}function DY_scroll(g,c,f,e,a,d){var g=$(g);var c=$(c);var f=$(f);var e=$(e).find("ul");var i=e.find("li").outerWidth(true);var h=e.find("li").width();var b=e.find("li").length;var j=a;e.width(b*i);f.click(function(){if(!e.is(":animated")){e.animate({"margin-left":[-i,"easeOutCirc"]},600,function(){e.find("li").eq(0).appendTo(e);e.css({"margin-left":0})})}});c.click(function(){if(!e.is(":animated")){e.find("li:last").prependTo(e);e.css({"margin-left":-i});e.animate({"margin-left":[0,"easeOutCirc"]},600)}});if(d==true){ad=setInterval(function(){f.click()},j*1000);g.hover(function(){clearInterval(ad)},function(){ad=setInterval(function(){f.click()},j*1000)})}};