!function(e,n){e.wp=e.wp||{},e.wp.mediaelement=new function(){var e={};return{initialize:function(){(e="undefined"!=typeof _wpmejsSettings?n.extend(!0,{},_wpmejsSettings):e).classPrefix="mejs-",e.success=e.success||function(e){var n,t;e.rendererName&&-1!==e.rendererName.indexOf("flash")&&(n=e.attributes.autoplay&&"false"!==e.attributes.autoplay,t=e.attributes.loop&&"false"!==e.attributes.loop,n&&e.addEventListener("canplay",function(){e.play()},!1),t&&e.addEventListener("ended",function(){e.play()},!1))},e.customError=function(e,n){if(-1!==e.rendererName.indexOf("flash")||-1!==e.rendererName.indexOf("flv"))return'<a href="'+n.src+'">'+mejsL10n.strings["mejs.download-file"]+"</a>"},n(".wp-audio-shortcode, .wp-video-shortcode").not(".mejs-container").filter(function(){return!n(this).parent().hasClass("mejs-mediaelement")}).mediaelementplayer(e)}}},n(e.wp.mediaelement.initialize)}(window,jQuery);
;/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
!function a(o,s,u){function c(t,e){if(!s[t]){if(!o[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(l)return l(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var i=s[t]={exports:{}};o[t][0].call(i.exports,function(e){return c(o[t][1][e]||e)},i,i.exports,a,o,s,u)}return s[t].exports}for(var l="function"==typeof require&&require,e=0;e<u.length;e++)c(u[e]);return c}({1:[function(e,t,n){"use strict";var T={promise:null,load:function(e){"undefined"!=typeof Vimeo?T._createPlayer(e):(T.promise=T.promise||mejs.Utils.loadScript("https://player.vimeo.com/api/player.js"),T.promise.then(function(){T._createPlayer(e)}))},_createPlayer:function(e){var t=new Vimeo.Player(e.iframe);window["__ready__"+e.id](t)},getVimeoId:function(e){return null==e?null:(e=e.split("?")[0],parseInt(e.substring(e.lastIndexOf("/")+1),10))}},r={name:"vimeo_iframe",options:{prefix:"vimeo_iframe"},canPlayType:function(e){return~["video/vimeo","video/x-vimeo"].indexOf(e.toLowerCase())},create:function(m,e,t){var v=[],h={},y=!0,g=1,a=g,E=0,b=0,j=!1,U=0,w=null,n="";h.options=e,h.id=m.id+"_"+e.prefix,h.mediaElement=m;for(var N=function(e){m.generateError("Code "+e.name+": "+e.message,t)},r=mejs.html5media.properties,i=function(i){var e=""+i.substring(0,1).toUpperCase()+i.substring(1);h["get"+e]=function(){if(null===w)return null;switch(i){case"currentTime":return E;case"duration":return U;case"volume":return g;case"muted":return 0===g;case"paused":return y;case"ended":return j;case"src":return w.getVideoUrl().then(function(e){n=e}).catch(function(e){return N(e)}),n;case"buffered":return{start:function(){return 0},end:function(){return b*U},length:1};case"readyState":return 4}return null},h["set"+e]=function(e){if(null!==w)switch(i){case"src":var t="string"==typeof e?e:e[0].src,n=T.getVimeoId(t);w.loadVideo(n).then(function(){m.originalNode.autoplay&&w.play()}).catch(function(e){return N(e)});break;case"currentTime":w.setCurrentTime(e).then(function(){E=e,setTimeout(function(){var e=mejs.Utils.createEvent("timeupdate",h);m.dispatchEvent(e)},50)}).catch(function(e){return N(e)});break;case"volume":w.setVolume(e).then(function(){a=g=e,setTimeout(function(){var e=mejs.Utils.createEvent("volumechange",h);m.dispatchEvent(e)},50)}).catch(function(e){return N(e)});break;case"loop":w.setLoop(e).catch(function(e){return N(e)});break;case"muted":e?w.setVolume(0).then(function(){g=0,setTimeout(function(){var e=mejs.Utils.createEvent("volumechange",h);m.dispatchEvent(e)},50)}).catch(function(e){return N(e)}):w.setVolume(a).then(function(){g=a,setTimeout(function(){var e=mejs.Utils.createEvent("volumechange",h);m.dispatchEvent(e)},50)}).catch(function(e){return N(e)});break;case"readyState":var r=mejs.Utils.createEvent("canplay",h);m.dispatchEvent(r)}else v.push({type:"set",propName:i,value:e})}},o=0,s=r.length;o<s;o++)i(r[o]);for(var u=mejs.html5media.methods,c=function(e){h[e]=function(){if(null!==w)switch(e){case"play":return y=!1,w.play();case"pause":return y=!0,w.pause();case"load":return null}else v.push({type:"call",methodName:e})}},l=0,d=u.length;l<d;l++)c(u[l]);window["__ready__"+h.id]=function(e){if(m.vimeoPlayer=w=e,v.length)for(var t=0,n=v.length;t<n;t++){var r=v[t];if("set"===r.type){var i=r.propName,a=""+i.substring(0,1).toUpperCase()+i.substring(1);h["set"+a](r.value)}else"call"===r.type&&h[r.methodName]()}m.originalNode.muted&&(w.setVolume(0),g=0);for(var o=document.getElementById(h.id),s=void 0,u=function(e){var t=mejs.Utils.createEvent(e.type,h);m.dispatchEvent(t)},c=0,l=(s=["mouseover","mouseout"]).length;c<l;c++)o.addEventListener(s[c],u,!1);w.on("loaded",function(){w.getDuration().then(function(e){if(0<(U=e)&&(b=U*e,m.originalNode.autoplay)){j=y=!1;var t=mejs.Utils.createEvent("play",h);m.dispatchEvent(t)}}).catch(function(e){N(e)})}),w.on("progress",function(){w.getDuration().then(function(e){if(0<(U=e)&&(b=U*e,m.originalNode.autoplay)){var t=mejs.Utils.createEvent("play",h);m.dispatchEvent(t);var n=mejs.Utils.createEvent("playing",h);m.dispatchEvent(n)}var r=mejs.Utils.createEvent("progress",h);m.dispatchEvent(r)}).catch(function(e){return N(e)})}),w.on("timeupdate",function(){w.getCurrentTime().then(function(e){E=e;var t=mejs.Utils.createEvent("timeupdate",h);m.dispatchEvent(t)}).catch(function(e){return N(e)})}),w.on("play",function(){j=y=!1;var e=mejs.Utils.createEvent("play",h);m.dispatchEvent(e);var t=mejs.Utils.createEvent("playing",h);m.dispatchEvent(t)}),w.on("pause",function(){j=!(y=!0);var e=mejs.Utils.createEvent("pause",h);m.dispatchEvent(e)}),w.on("ended",function(){j=!(y=!1);var e=mejs.Utils.createEvent("ended",h);m.dispatchEvent(e)});for(var d=0,p=(s=["rendererready","loadedmetadata","loadeddata","canplay"]).length;d<p;d++){var f=mejs.Utils.createEvent(s[d],h);m.dispatchEvent(f)}};var p=m.originalNode.height,f=m.originalNode.width,_=document.createElement("iframe"),x="https://player.vimeo.com/video/"+T.getVimeoId(t[0].src),A=~t[0].src.indexOf("?")?"?"+t[0].src.slice(t[0].src.indexOf("?")+1):"",V=[];return m.originalNode.autoplay&&-1===A.indexOf("autoplay")&&V.push("autoplay=1"),m.originalNode.loop&&-1===A.indexOf("loop")&&V.push("loop=1"),A=A+(A?"&":"?")+V.join("&"),_.setAttribute("id",h.id),_.setAttribute("width",f),_.setAttribute("height",p),_.setAttribute("frameBorder","0"),_.setAttribute("src",""+x+A),_.setAttribute("webkitallowfullscreen","true"),_.setAttribute("mozallowfullscreen","true"),_.setAttribute("allowfullscreen","true"),_.setAttribute("allow","autoplay"),m.originalNode.parentNode.insertBefore(_,m.originalNode),m.originalNode.style.display="none",T.load({iframe:_,id:h.id}),h.hide=function(){h.pause(),w&&(_.style.display="none")},h.setSize=function(e,t){_.setAttribute("width",e),_.setAttribute("height",t)},h.show=function(){w&&(_.style.display="")},h.destroy=function(){},h}};mejs.Utils.typeChecks.push(function(e){return/(\/\/player\.vimeo|vimeo\.com)/i.test(e)?"video/x-vimeo":null}),mejs.Renderers.add(r)},{}]},{},[1]);
;;
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/
(function($){'use strict';$.fn.fitVids=function(options){var settings={customSelector:null,ignore:null};if(!document.getElementById('fit-vids-style')){var head=document.head||document.getElementsByTagName('head')[0];var css='.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';var div=document.createElement("div");div.innerHTML='<p>x</p><style id="fit-vids-style">'+css+'</style>';head.appendChild(div.childNodes[1]);}
if(options){$.extend(settings,options);}
return this.each(function(){var selectors=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]','object','embed'];if(settings.customSelector){selectors.push(settings.customSelector);}
var ignoreList='.fitvidsignore';if(settings.ignore){ignoreList=ignoreList+', '+settings.ignore;}
var $allVideos=$(this).find(selectors.join(','));$allVideos=$allVideos.not('object object');$allVideos=$allVideos.not(ignoreList);$allVideos.each(function(){var $this=$(this);if($this.parents(ignoreList).length>0){return;}
if(this.tagName.toLowerCase()==='embed'&&$this.parent('object').length||$this.parent('.fluid-width-video-wrapper').length){return;}
if((!$this.css('height')&&!$this.css('width'))&&(isNaN($this.attr('height'))||isNaN($this.attr('width'))))
{$this.attr('height',9);$this.attr('width',16);}
var height=(this.tagName.toLowerCase()==='object'||($this.attr('height')&&!isNaN(parseInt($this.attr('height'),10))))?parseInt($this.attr('height'),10):$this.height(),width=!isNaN(parseInt($this.attr('width'),10))?parseInt($this.attr('width'),10):$this.width(),aspectRatio=height/width;if(!$this.attr('name')){var videoName='fitvid'+$.fn.fitVids._count;$this.attr('name',videoName);$.fn.fitVids._count++;}
$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top',(aspectRatio*100)+'%');$this.removeAttr('height').removeAttr('width');});});};$.fn.fitVids._count=0;})(window.jQuery||window.Zepto);;
/*!
* easyPieChart
* Lightweight plugin to render simple, animated and retina optimized pie charts
*
* @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
* @version 2.1.5
*
* Modified to adapt the latest jQuery version (v3 above) included on WordPress 5.6:
* - (2020-12-15) - jQuery isFunction method is deprecated.
*/
(function(root,factory){if(typeof exports==='object'){module.exports=factory(require('jquery'));}
else if(typeof define==='function'&&define.amd){define(['jquery'],factory);}
else{factory(root.jQuery);}}(this,function($){var CanvasRenderer=function(el,options){var cachedBackground;var canvas=document.createElement('canvas');el.appendChild(canvas);if(typeof(G_vmlCanvasManager)!=='undefined'){G_vmlCanvasManager.initElement(canvas);}
var ctx=canvas.getContext('2d');canvas.width=canvas.height=options.size;var scaleBy=1;if(window.devicePixelRatio>1){scaleBy=window.devicePixelRatio;canvas.style.width=canvas.style.height=[options.size,'px'].join('');canvas.width=canvas.height=options.size*scaleBy;ctx.scale(scaleBy,scaleBy);}
ctx.translate(options.size/2,options.size/2);ctx.rotate((-1/2+options.rotate/180)*Math.PI);var radius=(options.size-options.lineWidth)/2;if(options.scaleColor&&options.scaleLength){radius-=options.scaleLength+2;}
Date.now=Date.now||function(){return+(new Date());};var drawCircle=function(color,lineWidth,percent,alpha){percent=Math.min(Math.max(-1,percent||0),1);var isNegative=percent<=0?true:false;ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2*percent,isNegative);ctx.strokeStyle=color;ctx.globalAlpha=alpha;ctx.lineWidth=lineWidth;ctx.stroke();};var drawScale=function(){var offset;var length;ctx.lineWidth=1;ctx.fillStyle=options.scaleColor;ctx.save();for(var i=24;i>0;--i){if(i%6===0){length=options.scaleLength;offset=0;}else{length=options.scaleLength*0.6;offset=options.scaleLength-length;}
ctx.fillRect(-options.size/2+offset,0,length,1);ctx.rotate(Math.PI/12);}
ctx.restore();};var reqAnimationFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};}());var drawBackground=function(){if(options.scaleColor)drawScale();if(options.trackColor)drawCircle(options.trackColor,options.lineWidth,1,options.trackAlpha);};this.getCanvas=function(){return canvas;};this.getCtx=function(){return ctx;};this.clear=function(){ctx.clearRect(options.size/-2,options.size/-2,options.size,options.size);};this.draw=function(percent){if(!!options.scaleColor||!!options.trackColor){if(ctx.getImageData&&ctx.putImageData){if(!cachedBackground){drawBackground();cachedBackground=ctx.getImageData(0,0,options.size*scaleBy,options.size*scaleBy);}else{ctx.putImageData(cachedBackground,0,0);}}else{this.clear();drawBackground();}}else{this.clear();}
ctx.lineCap=options.lineCap;var color;if(typeof(options.barColor)==='function'){color=options.barColor(percent);}else{color=options.barColor;}
drawCircle(color,options.lineWidth,percent/100,options.barAlpha);}.bind(this);this.animate=function(from,to){var startTime=Date.now();options.onStart(from,to);var animation=function(){var process=Math.min(Date.now()-startTime,options.animate.duration);var currentValue=options.easing(this,process,from,to-from,options.animate.duration);this.draw(currentValue);options.onStep(from,to,currentValue);if(process>=options.animate.duration){options.onStop(from,to);}else{reqAnimationFrame(animation);}}.bind(this);reqAnimationFrame(animation);}.bind(this);};var EasyPieChart=function(el,opts){var defaultOptions={barColor:'#ef1e25',barAlpha:1.0,trackColor:'#f9f9f9',trackAlpha:1.0,scaleColor:'#dfe0e0',scaleLength:5,lineCap:'round',lineWidth:3,size:110,rotate:0,render:true,animate:{duration:1000,enabled:true},easing:function(x,t,b,c,d){t=t/(d/2);if(t<1){return c/2*t*t+b;}
return-c/2*((--t)*(t-2)-1)+b;},onStart:function(from,to){return;},onStep:function(from,to,currentValue){return;},onStop:function(from,to){return;}};if(typeof(CanvasRenderer)!=='undefined'){defaultOptions.renderer=CanvasRenderer;}else if(typeof(SVGRenderer)!=='undefined'){defaultOptions.renderer=SVGRenderer;}else{throw new Error('Please load either the SVG- or the CanvasRenderer');}
var options={};var currentValue=0;var init=function(){this.el=el;this.options=options;for(var i in defaultOptions){if(defaultOptions.hasOwnProperty(i)){options[i]=opts&&typeof(opts[i])!=='undefined'?opts[i]:defaultOptions[i];if(typeof(options[i])==='function'){options[i]=options[i].bind(this);}}}
if(typeof(options.easing)==='string'&&typeof(jQuery)!=='undefined'&&'function'===typeof jQuery.easing[options.easing]){options.easing=jQuery.easing[options.easing];}else{options.easing=defaultOptions.easing;}
if(typeof(options.animate)==='number'){options.animate={duration:options.animate,enabled:true};}
if(typeof(options.animate)==='boolean'&&!options.animate){options.animate={duration:1000,enabled:options.animate};}
this.renderer=new options.renderer(el,options);this.renderer.draw(currentValue);if(el.dataset&&el.dataset.percent){this.update(parseFloat(el.dataset.percent));}else if(el.getAttribute&&el.getAttribute('data-percent')){this.update(parseFloat(el.getAttribute('data-percent')));}}.bind(this);this.update=function(newValue){newValue=parseFloat(newValue);if(options.animate.enabled){this.renderer.animate(currentValue,newValue);}else{this.renderer.draw(newValue);}
currentValue=newValue;return this;}.bind(this);this.disableAnimation=function(){options.animate.enabled=false;return this;};this.enableAnimation=function(){options.animate.enabled=true;return this;};init();};$.fn.easyPieChart=function(options){return this.each(function(){var instanceOptions;if(!$.data(this,'easyPieChart')){instanceOptions=$.extend({},options,$(this).data());$.data(this,'easyPieChart',new EasyPieChart(this,instanceOptions));}});};}));;
/*!
 * Salvattore 1.0.5 by @rnmp and @ppold
* https://github.com/rnmp/salvattore
* Licensed under the MIT license.
* Copyright (c) 2013-2014 Rolando Murillo and Giorgio Leveroni
*/
!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.salvattore=t()}(this,function(){
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),n=document.getElementsByTagName("script")[0],r=null;t.type="text/css",t.id="matchmediajs-test",n.parentNode.insertBefore(t,n),r="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle,e={matchMedium:function(e){var n="@media "+e+"{ #matchmediajs-test { width: 1px; } }";return t.styleSheet?t.styleSheet.cssText=n:t.textContent=n,"1px"===r.width}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}()),
/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
function(){"use strict";if(window.matchMedia&&window.matchMedia("all").addListener)return!1;var e=window.matchMedia,t=e("only all").matches,n=!1,r=0,a=[],i=function(){clearTimeout(r),r=setTimeout(function(){for(var t=0,n=a.length;n>t;t++){var r=a[t].mql,i=a[t].listeners||[],o=e(r.media).matches;if(o!==r.matches){r.matches=o;for(var c=0,l=i.length;l>c;c++)i[c].call(window,r)}}},30)};window.matchMedia=function(r){var o=e(r),c=[],l=0;return o.addListener=function(e){t&&(n||(n=!0,window.addEventListener("resize",i,!0)),0===l&&(l=a.push({mql:o,listeners:c})),c.push(e))},o.removeListener=function(e){for(var t=0,n=c.length;n>t;t++)c[t]===e&&c.splice(t,1)},o}}(),function(){"use strict";for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var n=(new Date).getTime(),r=Math.max(0,16-(n-e)),a=window.setTimeout(function(){t(n+r)},r);return e=n+r,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}(),"function"!=typeof window.CustomEvent&&!function(){"use strict";function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e}();var e=function(e,t){"use strict";var n={},r=[],a=[],i=[],o=function(e,t,n){e.dataset?e.dataset[t]=n:e.setAttribute("data-"+t,n)};return n.obtainGridSettings=function(t){var n=e.getComputedStyle(t,":before"),r=n.getPropertyValue("content").slice(1,-1),a=r.match(/^\s*(\d+)(?:\s?\.(.+))?\s*$/),i=1,o=[];return a?(i=a[1],o=a[2],o=o?o.split("."):["column"]):(a=r.match(/^\s*\.(.+)\s+(\d+)\s*$/),a&&(o=a[1],i=a[2],i&&(i=i.split(".")))),{numberOfColumns:i,columnClasses:o}},n.addColumns=function(e,r){for(var a,i=n.obtainGridSettings(e),c=i.numberOfColumns,l=i.columnClasses,s=new Array(+c),u=t.createDocumentFragment(),d=c;0!==d--;)a="[data-columns] > *:nth-child("+c+"n-"+d+")",s.push(r.querySelectorAll(a));s.forEach(function(e){var n=t.createElement("div"),r=t.createDocumentFragment();n.className=l.join(" "),Array.prototype.forEach.call(e,function(e){r.appendChild(e)}),n.appendChild(r),u.appendChild(n)}),e.appendChild(u),o(e,"columns",c)},n.removeColumns=function(n){var r=t.createRange();r.selectNodeContents(n);var a=Array.prototype.filter.call(r.extractContents().childNodes,function(t){return t instanceof e.HTMLElement}),i=a.length,c=a[0].childNodes.length,l=new Array(c*i);Array.prototype.forEach.call(a,function(e,t){Array.prototype.forEach.call(e.children,function(e,n){l[n*i+t]=e})});var s=t.createElement("div");return o(s,"columns",0),l.filter(function(e){return!!e}).forEach(function(e){s.appendChild(e)}),s},n.recreateColumns=function(t){e.requestAnimationFrame(function(){n.addColumns(t,n.removeColumns(t));var e=new CustomEvent("columnsChange");t.dispatchEvent(e)})},n.mediaQueryChange=function(e){e.matches&&Array.prototype.forEach.call(r,n.recreateColumns)},n.getCSSRules=function(e){var t;try{t=e.sheet.cssRules||e.sheet.rules}catch(n){return[]}return t||[]},n.getStylesheets=function(){return Array.prototype.concat.call(Array.prototype.slice.call(t.querySelectorAll("style[type='text/css']")),Array.prototype.slice.call(t.querySelectorAll("link[rel='stylesheet']")))},n.mediaRuleHasColumnsSelector=function(e){var t,n;try{t=e.length}catch(r){t=0}for(;t--;)if(n=e[t],n.selectorText&&n.selectorText.match(/\[data-columns\](.*)::?before$/))return!0;return!1},n.scanMediaQueries=function(){var t=[];if(e.matchMedia){n.getStylesheets().forEach(function(e){Array.prototype.forEach.call(n.getCSSRules(e),function(e){e.media&&e.cssRules&&n.mediaRuleHasColumnsSelector(e.cssRules)&&t.push(e)})});var r=a.filter(function(e){return-1===t.indexOf(e)});i.filter(function(e){return-1!==r.indexOf(e.rule)}).forEach(function(e){e.mql.removeListener(n.mediaQueryChange)}),i=i.filter(function(e){return-1===r.indexOf(e.rule)}),t.filter(function(e){return-1==a.indexOf(e)}).forEach(function(t){var r=e.matchMedia(t.media.mediaText);r.addListener(n.mediaQueryChange),i.push({rule:t,mql:r})}),a.length=0,a=t}},n.rescanMediaQueries=function(){n.scanMediaQueries(),Array.prototype.forEach.call(r,n.recreateColumns)},n.nextElementColumnIndex=function(e,t){var n,r,a,i=e.children,o=i.length,c=0,l=0;for(a=0;o>a;a++)n=i[a],r=n.children.length+(t[a].children||t[a].childNodes).length,0===c&&(c=r),c>r&&(l=a,c=r);return l},n.createFragmentsList=function(e){for(var n=new Array(e),r=0;r!==e;)n[r]=t.createDocumentFragment(),r++;return n},n.appendElements=function(e,t){var r=e.children,a=r.length,i=n.createFragmentsList(a);Array.prototype.forEach.call(t,function(t){var r=n.nextElementColumnIndex(e,i);i[r].appendChild(t)}),Array.prototype.forEach.call(r,function(e,t){e.appendChild(i[t])})},n.prependElements=function(e,r){var a=e.children,i=a.length,o=n.createFragmentsList(i),c=i-1;r.forEach(function(e){var t=o[c];t.insertBefore(e,t.firstChild),0===c?c=i-1:c--}),Array.prototype.forEach.call(a,function(e,t){e.insertBefore(o[t],e.firstChild)});for(var l=t.createDocumentFragment(),s=r.length%i;0!==s--;)l.appendChild(e.lastChild);e.insertBefore(l,e.firstChild)},n.registerGrid=function(a){if("none"!==e.getComputedStyle(a).display){if(jQuery(a).children('.column').length>0){return;}var i=t.createRange();i.selectNodeContents(a);var c=t.createElement("div");c.appendChild(i.extractContents()),o(c,"columns",0),n.addColumns(a,c),r.push(a)}},n.init=function(){var e=t.createElement("style");e.innerHTML="[data-columns]::before{visibility:hidden;position:absolute;font-size:1px;}",t.head.appendChild(e);var r=t.querySelectorAll("[data-columns]");Array.prototype.forEach.call(r,n.registerGrid),n.scanMediaQueries()},n.init(),{appendElements:n.appendElements,prependElements:n.prependElements,registerGrid:n.registerGrid,recreateColumns:n.recreateColumns,rescanMediaQueries:n.rescanMediaQueries,append_elements:n.appendElements,prepend_elements:n.prependElements,register_grid:n.registerGrid,recreate_columns:n.recreateColumns,rescan_media_queries:n.rescanMediaQueries}}(window,window.document);return e});