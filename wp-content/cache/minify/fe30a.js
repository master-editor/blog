var disqus_shortname=countVars.disqusShortname;(function(){var nodes=document.getElementsByTagName('span');for(var i=0,url;i<nodes.length;i++){if(nodes[i].className.indexOf('dsq-postid')!=-1&&nodes[i].parentNode.tagName=='A'){nodes[i].parentNode.setAttribute('data-disqus-identifier',nodes[i].getAttribute('data-dsqidentifier'));url=nodes[i].parentNode.href.split('#',1);if(url.length==1){url=url[0];}
else{url=url[1];}
nodes[i].parentNode.href=url+'#disqus_thread';}}
var s=document.createElement('script');s.async=true;s.type='text/javascript';s.src='https://'+disqus_shortname+'.disqus.com/count.js';(document.getElementsByTagName('HEAD')[0]||document.getElementsByTagName('BODY')[0]).appendChild(s);}());;jQuery(document).ready(function($){var newWidth,oldWidth=$('.dae-shortcode-download-wrapper').parent().width();function daeAddMediaQuery(){$('.dae-shortcode-download-wrapper').addClass('dae-shortcode-download-wrapper-wide');}
function daeRemoveMediaQuery(){$('.dae-shortcode-download-wrapper').removeClass('dae-shortcode-download-wrapper-wide');}
if(oldWidth>1000){daeAddMediaQuery();}
$(window).resize(function(){newWidth=$('.dae-shortcode-download-wrapper').parent().width();if(newWidth>1000&&oldWidth<=1000){daeAddMediaQuery();}
if(newWidth<1000&&oldWidth>=1000){daeRemoveMediaQuery();}
oldWidth=newWidth;});});