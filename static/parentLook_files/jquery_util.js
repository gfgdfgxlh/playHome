jQuery.fn.extend({
	/*doctype: function(label) {
		if ($('HTML')[0].previousSibling) {
			alert($('HTML')[0].html());
			var previousSibling = $('HTML')[0].previousSibling.text;
			previousSibling = previousSibling.replace(/\</g, '');
			previousSibling = $.trim(previousSibling.replace(/\>/g, ''));
			var startIndex = previousSibling.indexOf('HTML');
			if (startIndex > -1) {
				if (previousSibling.substring(startIndex, startIndex-1) == 'X') {
					previousSibling = previousSibling.substring(startIndex-1);
				}
				else {
					previousSibling = previousSibling.substring(startIndex);
				}
				var endIndex = previousSibling.indexOf('//');
				previousSibling = previousSibling.substring(0, endIndex);
			}
			else {
				previousSibling = 'HTML 5.0';
			}
			var ary = previousSibling.split(/\s/);
			var lab = ['type', 'version', 'mode', 'fullname']
			var obj = [];
			$.each(ary, function(i, item) {
				obj[lab[i]] = item;
			});
			obj[lab[2]] = (obj[lab[2]] == undefined) ? null : obj[lab[2]];
			obj[lab[3]] = previousSibling;
			if (label && label.indexOf(label) > -1) {
				return obj[label];
			}
			else {
				return obj;
			}
		}
		else {
			return null;
		}
	}*/
	
	Val: function() {
		var ary = [];
		var obj = this;
		var lab;
		if ($(obj).is('input[type="checkbox"]') || $(obj).is('input[type="radio"]')) {
			lab = ':checked';
		}
		$obj = (lab) ? $(obj).filter(lab) : $(obj);
		$.each($obj, function(i, item) {
			ary.push($(item).val());
		});
		return ary;
	},
	
	Index: function() {
		var ary = [];
		var obj = this;
		var lab;
		if ($(obj).is('input[type="checkbox"]') || $(obj).is('input[type="radio"]')) {
			lab = ':checked';
		}
		$.each($(obj), function(i, item) {
			if ($(item).is($(lab))) {
				ary.push(i);
			}
		});
		return ary;
	},
	
	rePopWin: function(conf) {
		var obj = $(this).data('obj');
		var conf = $.extend($(this).data('conf'), conf || {});
		var $popwin = $(this);
		var _obj = $(obj).is('body') ? conf.window : obj;
		var top = ($.WindowSize(_obj, 'height') - conf.height) / 2 + $(_obj).scrollTop();
		var left = ($.WindowSize(_obj, 'width') - conf.width) / 2 + $(_obj).scrollLeft();
		$popwin.css({
			position: 'absolute',
			top: top,
			left: left,
			overflow: 'hidden',
			background: '#666666',
			width: conf.width - conf.border * 2,
			height: conf.height - conf.border * 2,
			margin: 0,
			padding: conf.border,
			display: 'block'
		});
		var t;
		if (conf.scroll) {
			$(_obj).bind('resize scroll', function() {
				top = ($.WindowSize(_obj, 'height') - $popwin.outerHeight(true)) / 2 + $(_obj).scrollTop();
				left = ($.WindowSize(_obj, 'width') - $popwin.outerWidth(true)) / 2 + $(_obj).scrollLeft();
				if ($.browser.msie) {
					clearTimeout(t);
					t = setTimeout(function(){
						$popwin.css({top: top, left: left});
					}, 100);
				} else {
					$popwin.css({top: top, left: left});
				}
			});
		}
		$popwin.data('obj', obj);
		$popwin.data('conf', conf);
	},
	
	setPopWin: function(data, conf) {
		var obj = $(this).data('obj');
		var conf = $.extend($(this).data('conf'), conf || {});
		var $popwin = $(this);
		var intervalId;
		$popwin.rePopWin(conf);
		//loading, alert, popwin
		/*
		 * conf.type = 'popwin'
		 * conf.border = 4
		 */
		var pophtml = '<div id="window_popwin_html" />';
		$popwin.html($(pophtml));
		var $pophtml = $popwin.find('#window_popwin_html');
		$pophtml.css({
			backgroundColor: '#FFFFFF',
			width: $popwin.width() - 2,
			height: $popwin.height() - 2,
			border: '1px #333333 solid',
			margin: 0,
			padding: 0
		});
		if (!conf.htmlhead && !conf.htmlbody && !conf.htmlfoot) {
			
		}
		if (conf.htmlhead) {
			var htmlhead = '<div id="window_popwin_htmlhead" />';
			$pophtml.append($(htmlhead));
			var $htmlhead = $popwin.find('#window_popwin_htmlhead');
			$htmlhead.css({
				backgroundColor: '#CCCCCC',
				width: $pophtml.width(),
				height: 30,
				borderBottom: '1px #999999 solid'
			});
			if (conf.close) {
				var $closebtn = $('<div></div>');
				$htmlhead.append($closebtn);
				$closebtn.attr(conf.close.normal.indexOf(':') > -1 ? 'style' : 'class', conf.close.normal)
				.hover(function() {
					$(this).attr(conf.close.hover.indexOf(':') > -1 ? 'style' : 'class', conf.close.hover)
				}, function() {
					$(this).attr(conf.close.normal.indexOf(':') > -1 ? 'style' : 'class', conf.close.normal);
				})
				.click(function() {
					$popwin.PopClose();
				});
				$popwin.data('closebtn', $closebtn);
			}
			var $title = $('<div />');
			$htmlhead.append($title);
			$title.css({
				float: 'left',
				width: $htmlhead.width() - 50,
				height: '18px',
				margin: '5px 0px',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				display: 'inline',
				lineHeight: '20px',
				paddingLeft: '10px',
				textAlign: 'left',
				fontSize: '14px',
				fontWeight: 'bold',
				color: '#444444',
				fontFamily: "'微软雅黑', '宋体', Arial, Helvetica, sans-serif"
			});
			if (conf.title) {
				$title.html(conf.title);
			}
		}
		if (conf.htmlbody) {
			var htmlbody = '<div id="window_popwin_htmlbody" />';
			$pophtml.append($(htmlbody));
			var $htmlbody = $popwin.find('#window_popwin_htmlbody');
			$htmlbody.css({
				backgroundColor: '#EEEEEE',
				width: $pophtml.width(),
				height: $pophtml.height() - parseInt(conf.htmlhead ? $htmlhead.outerHeight(true) : 0),
				textAlign: 'center',
				overflow: 'hidden',
				display: 'block',
				clear: 'both'
			});
			if (!conf.htmlhead && !conf.htmlfoot) {
				var $loadingdiv = $('<span />');
				$htmlbody.append($loadingdiv);
				$loadingdiv.css({
					margin: 'auto',
					padding: '0px',
					fontSize: conf.height >= 60 ? '18px' : '14px',
					fontWeight: 'bold',
					color: '#444444',
					fontFamily: "'微软雅黑', '宋体', Arial, Helvetica, sans-serif"
				})
				.html('<img src="' + conf.loading.imgurl + '" align="absMiddle" />&nbsp; ' + conf.text + '&nbsp;');
				
				//alert($loadingdiv.outerWidth(true));
				//alert(conf.width - $pophtml.innerWidth());
				if ($pophtml.innerWidth() > $loadingdiv.outerWidth(true) + 30) {
					$popwin.setPopWin(null, {
						width: $loadingdiv.outerWidth(true) + conf.width - $pophtml.innerWidth() + 30
					});
				}
				$htmlbody.css({
					paddingTop: parseInt($htmlbody.height() - $loadingdiv.outerHeight(true)) / 2,
					height: $htmlbody.height() - parseInt($htmlbody.height() - $loadingdiv.outerHeight(true)) / 2
				});
				//alert(parseInt($htmlbody.height() - $loadingdiv.outerHeight(true)) / 2);
				return;
			}
			if (conf.url) {
				var framename = 'frame' + $.Random(10000, 99999);
				var $iframe = $('<iframe name="' + framename + '" src="' + conf.url + '" frameborder="0" scrolling="auto" width="100%" height="100%" />');
				$htmlbody.append($iframe);
				var oFrm = window.top.frames[$('iframe', window.top.document).index($iframe)];
				var frmhtml, title;
				oFrm.onload = oFrm.onreadystatechange = function() {
				     if (this.readyState && this.readyState != 'complete') {
				    	 
				     } else {
				    	 if ($title && !conf.title) {
				    		 $title.html($('title', oFrm.document).html());
				    	 }
				     }
				}
				
				
				
				
				
			}
		}
		if (conf.htmlfoot) {
			var htmlfoot = '<div id="window_popwin_htmlfoot" />';
			$pophtml.append($(htmlfoot));
			var $htmlfoot = $popwin.find('#window_popwin_htmlfoot');
			$htmlfoot.css({
				backgroundColor: '#EEEEEE',
				width: $pophtml.width(),
				height: 42,
				overflow: 'hidden',
				display: 'block',
				clear: 'both',
				textAlign: 'center'
			});
			$htmlbody.css({
				height: $pophtml.height() - parseInt(conf.htmlhead ? $htmlhead.outerHeight(true) : 0) - $htmlfoot.outerHeight(true)
			});
			
			var $footbtnbox = $('<div id="window_popwin_htmlfoot_btnbox" />');
			$htmlfoot.append($footbtnbox);
			//$footbtnbox.append($('<ul style="list-style-type:none;margin:0px;" />'));
			//var alignAry = new Array('left', 'right');
			if ($.inArray(conf.button.align, ['left', 'right']) > -1 || conf.autoclose) {
				$footbtnbox.css({float: $.inArray(conf.button.align, ['left', 'right']) > -1 ? conf.button.align : 'right', margin: '0px 4px'});
			} else {
				$footbtnbox.css('margin', 'auto');
			}
			var bs = 0;
			if (conf.button.OKBtn) {
				var $okbtn = $('<button>' + conf.button.OKBtn.label + '</button>');
				$footbtnbox.append($okbtn);
				$popwin.data('okbtn', $okbtn);
				$okbtn.click(function() {
					if (conf.button.OKBtn.func) eval(conf.button.OKBtn.func + "()");
					$popwin.PopClose();
				});
				bs++;
			}
			if (conf.button.CancelBtn) {
				var $cancelbtn = $('<button>' + conf.button.CancelBtn.label + '</button>');
				$footbtnbox.append($cancelbtn);
				$cancelbtn.click(function() {
					if (conf.button.CancelBtn.func) eval(conf.button.CancelBtn.func + "()");
					$popwin.PopClose();
				});
				bs++;
			}
			var pluscss = 'margin: 0px 4px;' + (!conf.autoclose ? 'width: ' + parseInt(($htmlfoot.width() - 8) / bs - 8) + 'px;' : '');
			$footbtnbox.find('button').attr('style', conf.button.style.normal + pluscss);
			if (conf.button.style.hover) {
				$footbtnbox.find('button').hover(function() {
					$(this).attr('style', conf.button.style.hover + pluscss);
				}, function() {
					$(this).attr('style', conf.button.style.normal + pluscss);
				});
			}
			 
			$footbtnbox.css({
				marginTop: ($htmlfoot.height() - $footbtnbox.outerHeight(true)) / 2
				
			});
			var $footplusbox;
			if (conf.autoclose) {
				
				$footplusbox = $('<div id="window_popwin_htmlfoot_plusbox">' + conf.autoclose.text + '</div>');
				$htmlfoot.append($footplusbox);
				
				
				$footplusbox.find('span').text(conf.autoclose.time);
				intervalId = setInterval(function() {
					$footplusbox.find('span').text(parseInt($footplusbox.find('span').text()) - 1);
					if (parseInt($footplusbox.find('span').text()) <= 0) {
						//alert($footplusbox.find('span').text())
						$popwin.PopClose();
						//clearInterval(intervalId);
					}
				}, 1000);
				$(this).data('intervalId', intervalId);
				$footplusbox.css({
					float: $footbtnbox.css('float') == 'left' ? 'right' : 'left',
					textAlign: $footbtnbox.css('float') == 'left' ? 'right' : 'left',
					color: '#444444',
					fontFamily: "'微软雅黑', '宋体', Arial, Helvetica, sans-serif",
					fontSize: '12px',
					lineHeight: '24px',
					height: '24px',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
					display: 'inline',
					margin: '0px 8px',
					width: $htmlbody.width() - $footbtnbox.outerWidth(true) - 20
				});
				$footplusbox.css({
					marginTop: ($htmlfoot.height() - $footplusbox.outerHeight(true)) / 2 + 1
				});
			}
			$htmlbody.css({
				padding: '8px',
				width: $htmlbody.width() - 16,
				height: $htmlbody.height() - 16,
				color: '#444444',
				fontFamily: "'微软雅黑', '宋体', Arial, Helvetica, sans-serif",
				fontSize: '12px',
				lineHeight: '180%',
				overflow: 'auto'
			});
			
			if (conf.html && conf.html.length > 0) {
				$htmlbody.html(conf.html);
			} else {
				$htmlbody.html('<table border="0" width="100%" height="100%"><tr><td align="center">'+conf.text+'</td></tr></table>');
			}
			
		}
		/*if ($.inArray())
		if (conf.type == 'loading') {
			
		}*/
		switch (conf.type) {
			case 'loading':
			
				break;
			case 'alert':
				
				break;
			case 'popwin':
			default:
				
				break;
		}
		//$popwin.html(data);
	},
	
	PopClose: function() {
		if ($(this).data('mask')) $(this).data('mask').remove();
		clearInterval($(this).data('intervalId'));
		$(this).remove();
	}
});

jQuery.extend({
	
	IsWindow: function() {
		return window.parent.document == window.document ? true : false;
	},
	
	WindowSize: function(obj, tag) {
		var width = $(obj).outerWidth(true);
		var height = $(obj).outerHeight(true);
		return tag == 'height' ? height : width;
	},
	
	IsHtml: function(str) {
		var reg = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;
		return reg.test(str);
	},
	
	Mask: function(obj, conf) {
		obj = obj == null ? 'body' : obj;
		conf = $.extend({
			opacity: 0.4,
			bgcolor: '#000000'
		}, conf || {});
		var $obj = $(obj);
		/*if ($obj.find('#window_mask').length == 0) {
			$obj.append('<div id="window_mask" />');
		}
		var $mask = $obj.find('#window_mask');*/
		var $mask = $('<div id="window_mask' + $.Random(10000, 99999) + '" />');
		$obj.append($mask);
		$mask.css({
			position: 'absolute',
			left: '0px',
			top: '0px',
			backgroundColor: conf.bgcolor,
			overflow: 'hidden',
			filter: 'alpha(opacity=' + parseInt(conf.opacity * 100) + ')',
			opacity: conf.opacity,
			width: '100%',
			height: '100%',
			display: 'block'
		});
		return $mask;
	},
	
	PopWin: function(obj, conf, type) {
		obj = obj == null ? 'body' : obj;
		type = type == null ? 'popwin' : type;
		conf = $.extend($.PopWinSett[type], conf || {});
		var $mask = conf.mask ? $.Mask(obj) : null;
		var $popwin = $('<div id="window_popwin' + $.Random(10000, 99999) + '" />');
		var $obj = $(obj);
		$obj.append($popwin);
		
		/*$mask = $.Mask(obj);
		conf.mask ? $mask.show() : $mask.hide();
		var $obj = $(obj);
		if ($obj.find('#window_popwin').length == 0) {
			$obj.append('<div id="window_popwin" />');
		}
		var $popwin = $obj.find('#window_popwin');*/
		$popwin.data('obj', obj);
		$popwin.data('conf', conf);
		$(obj).css('overflow-x', 'hidden');
		$popwin.data('mask', $mask);
		if ($mask) {
			$mask.height($.WindowSize($(obj).is('body') ? conf.window.document : obj, 'height'));
		}
		//$popwin.rePopWin(conf);
		$popwin.setPopWin(null, conf);
		return $popwin;
	},
	
	setPopWinConf: function(sett) {
		$.PopWinSett = $.extend($.PopWinSett, sett || {});
	},
	
	PopWinSett: {
		popwin: {
			width: 500,
			height: 400,
			border: 4,
			htmlhead: true,
			htmlbody: true,
			htmlfoot: false,
			close: {
				normal: "float: right; width: 10px; height: 16px; margin: 7px 10px; overflow: hidden; display: inline; background: url('" + jsPath() + "icon.png') -820px -720px no-repeat; cursor: pointer; filter: alpha(opacity=60); opacity: 0.6;", 
				hover: "float: right; width: 10px; height: 16px; margin: 7px 10px; overflow: hidden; display: inline; background: url('" + jsPath() + "icon.png') -820px -720px no-repeat; cursor: pointer; filter: alpha(opacity=100); opacity: 1;"
			},
			title: '窗口标题',
			mask: true,
			scroll: true,
			window: window
		},
		alert: {
			width: 280,
			height: 180,
			border: 4,
			htmlhead: true,
			htmlbody: true,
			htmlfoot: true,
			close: {
				normal: "float: right; width: 10px; height: 16px; margin: 7px 10px; overflow: hidden; display: inline; background: url('" + jsPath() + "icon.png') -820px -720px no-repeat; cursor: pointer; filter: alpha(opacity=60); opacity: 0.6;", 
				hover: "float: right; width: 10px; height: 16px; margin: 7px 10px; overflow: hidden; display: inline; background: url('" + jsPath() + "icon.png') -820px -720px no-repeat; cursor: pointer; filter: alpha(opacity=100); opacity: 1;"
			},
			title: '系统提示',
			text: '抱歉，您输入的用户名小于 3 个字符，请输入一个较长的用户名',
			html: '',
			button: {
				OKBtn: {
					label: '确 定', func: null
				},
				CancelBtn: {
					label: '取 消', func: null
				},
				style: {
					normal: "border: 1px #707678 solid; background: url('" + jsPath() + "icon.png') 0px -830px repeat-x; height: 28px; color: #555555;"
						  + "line-height: 24px; line-height: 28px\9; font-size: 12px; font-family: '微软雅黑', '宋体', Arial, Helvetica, sans-serif;",
					hover: "border: 1px #707678 solid; background: url('" + jsPath() + "icon.png') 0px -870px repeat-x; height: 28px; color: #333333;"
						  + "line-height: 24px; line-height: 28px\9; font-size: 12px; font-family: '微软雅黑', '宋体', Arial, Helvetica, sans-serif;"
				},
				/*style: {
					normal: "border: 1px #446279 solid; background: url('" + jsPath() + "icon.png') 0px -910px repeat-x; height: 28px; color: #FFFFFF;"
						  + "line-height: 24px; line-height: 28px\9; font-size: 12px; font-family: '微软雅黑', '宋体', Arial, Helvetica, sans-serif;",
					hover: "border: 1px #446279 solid; background: url('" + jsPath() + "icon.png') 0px -950px repeat-x; height: 28px; color: #FFFFFF;"
						  + "line-height: 24px; line-height: 28px\9; font-size: 12px; font-family: '微软雅黑', '宋体', Arial, Helvetica, sans-serif;"
				},*/
				align: 'center'
			},
			//autoclose: {text: '<span>0</span> 秒后自动关闭', time: 15},
			mask: true,
			scroll: true,
			window: window
		},
		loading: {
			width: 300,
			height: 50,
			border: 4,
			htmlhead: false,
			htmlbody: true,
			htmlfoot: false,
			text: '页面加载中...',
			loading: {
				imgurl: jsPath() + 'loading2.gif'
			},
			mask: true,
			scroll: true,
			window: window
		}
	},
	
	Alert: function(text, title, okbtn, cancelbtn) {
		var conf = {window: window.top};
		$.IsHtml(text) ? conf.html = text : conf.text = text;
		if (title != null) conf.title = title;
		conf.button = $.PopWinSett.alert.button;
		if (okbtn != null) conf.button.OKBtn = $.extend(conf.button.OKBtn, okbtn || {});
		conf.button.CancelBtn = cancelbtn ? $.extend(conf.button.CancelBtn, cancelbtn || {}) : null;
		return $.PopWin($('body', window.top.document), conf, 'alert');
	},
	
	Loading: function(text) {
		var conf = {window: window.top, text: text};
		return $.PopWin($('body', window.top.document), conf, 'loading');
	},
	
	popWin: function(url, title, width, height, mask, scroll) {
		var conf = {window: window.top, url: url, title: title};
		if (width !=  null) conf.width = width;
		if (height !=  null) conf.height = height;
		if (mask !=  null) conf.mask = mask;
		if (scroll !=  null) conf.scroll = scroll;
		$.PopWin($('body', window.top.document), conf, 'popwin');
	},
	
	Random: function(under, over) {
		return parseInt(Math.random() * (over - under + 1) + under);
	}
	
});

function jsPath() {
	var js = document.scripts;
	return js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf('/') + 1);
}

function urlExt(url, pram) {
	var str = url + ((url.indexOf('?') == -1) ? '?' : '&amp;');
	str += pram;
	return str;
}

function obj2str(o) {
	var r = [];
	if (typeof o == "string" || o == null) {
		return o;
	}
	if (typeof o == "object") {
		if (!o.sort){
	       r[0] = "{";
	       for (var i in o) {
	         r[r.length] = i;
	         r[r.length] = ":";
	         r[r.length] = obj2str(o[i]);
	         r[r.length] = ",";
	       }
	       r[r.length-1] = "}";
		} else {
	       r[0] = "[";
	       for (var i = 0; i < o.length; i++){
	         r[r.length] = obj2str(o[i]);
	         r[r.length] = ",";
	       }
	       r[r.length-1] = "]";
		}
		return r.join("");
	}
	return o.toString();
}

function Append_zore(temp) {  
	if (temp<10) {  
		return "0"+temp;  
	} else {  
		return temp;  
	}  
}

//alert(obj2str(personID('310106197107010013')));
function credits(person_id) {
	if (person_id == '') {
		return {code: -1, city: null, birthday: null};
	}
	//身份证的地区代码对照  
	var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
	
	//合法性验证  
	var sum = 0;
	//出生日期
	var birthday; 
	//验证长度与格式规范性的正则
	var pattern = new RegExp(/(^\d{15}$)|(^\d{17}(\d|x|X)$)/i);
    
	if (pattern.exec(person_id)) {
		//验证身份证的合法性的正则
		pattern = new RegExp(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/);
		if(pattern.exec(person_id)) {
			//获取15位证件号中的出生日期并转位正常日期
			birthday = "19"+person_id.substring(6,8)+"-"+person_id.substring(8,10)+"-"+person_id.substring(10,12);
		} else {   
			person_id = person_id.replace(/x|X$/i,"a");
			//获取18位证件号中的出生日期
			birthday = person_id.substring(6,10)+"-"+person_id.substring(10,12)+"-"+person_id.substring(12,14);
	                          
			//校验18位身份证号码的合法性
			for (var i = 17; i >= 0; i--) {  
				sum += (Math.pow(2, i) % 11) * parseInt(person_id.charAt(17 - i), 11);
			}
			if (sum % 11 != 1) {
				return {code: -3, city: null, birthday: null};
			}
		}
		//检测证件地区的合法性
		if (aCity[parseInt(person_id.substring(0, 2))] == null) {  
			return {code: -4, city: null, birthday: null};
		}  
		var dateStr = new Date(birthday.replace(/-/g, "/"));                  
		if (birthday != (dateStr.getFullYear()+"-"+ Append_zore(dateStr.getMonth()+1)+"-"+ Append_zore(dateStr.getDate()))) {  
			return {code: -5, city: null, birthday: null};
		}
		var city = aCity[parseInt(person_id.substring(0, 2))];
		return {code: person_id, city: city, birthday: birthday};
	} else {          
		return {code: -2, city: null, birthday: null};
	}
}

