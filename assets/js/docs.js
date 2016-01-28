$(window).bind("create.xrayhtml",function(a){var b=$(a.target),c=b.hasClass("docs--prism");c&&"Prism"in window&&($(".docs--prism").find("code").addClass("language-markup"),Prism.highlightAll());var d=b.prev().hasClass("docs--copy-code-btn");if(d&&"ZeroClipboard"in window){var e=b.prev(),f=b.find(".snippet").html().toString().trim(),g=new ZeroClipboard(e);g.on("ready",function(a){g.on("copy",function(a){a.clipboardData.setData("text/plain",f)}),g.on("afterCopy",function(a){console.log("Copied some shizz to clipboard!")})})}}),$(document).ready(function(){function a(a,b,c){c?h.push(new Chart(a)[b](f[b][c],g)):h.push(new Chart(a)[b](f[b],g))}if($(".docs--collapser").on("click",function(a){$(this).toggleClass("docs--collapser--open")}),$(".docs--sidebar li.active").length>0){var b=$(".docs--sidebar li.active");b.parents(".collapse").addClass("in"),b.parents(".collapse").prev().addClass("docs--collapser--open")}var c={data:[749,4028,1302,250,9,21,5,2,102,18,133,371,27,82,440,246,235,540,87,324,525,807,301,345,706,17,3,1591,2358,2271,3595,4141,240,234,5174,3474,3397,2813,3649,258,93,2800,4579,9158,4158,4649,486,623,2639,146],labels:["09/05","09/07","09/08","09/09","09/10","09/11","09/13","09/14","09/15","09/16","09/17","09/18","09/19","09/21","09/22","09/23","09/24","09/25","09/26","09/27","09/28","09/29","09/30","10/01","10/02","10/03","10/04","10/05","10/06","10/07","10/08","10/09","10/10","10/11","10/12","10/13","10/14","10/15","10/16","10/17","10/18","10/19","10/20","10/21","10/22","10/23","10/24","10/25","10/26","10/27"]},d=[{value:33894,label:"translate-keys",color:"#F7464A",highlight:"#FF5A5E"},{value:27097,label:"content-responses",color:"#46BFBD",highlight:"#5AD3D1"},{value:12356,label:"app_opens"},{value:609,label:"translate-languages"},{value:89,label:"notify-messages-views"},{value:66,label:"feedback"},{value:34,label:"notify-messages"},{value:21,label:"notify-updates"},{value:14,label:"notify-rate_reminders-views"},{value:11,label:"notify-updates-views"},{value:5,label:"geographic-languages"},{value:3,label:"geographic-continents"},{value:1,label:"geographic-countries"},{value:1,label:"other"}],e=[{value:29705,label:"Danica Quiz",color:"#F7464A",highlight:"#FF5A5E"},{value:20830,label:"NStack",color:"#46BFBD",highlight:"#5AD3D1"},{value:12697,label:"Akostik"},{value:5082,label:"Tattoodo"},{value:3007,label:"eBoks"},{value:943,label:"Alarmeringsapp"},{value:831,label:"Eovendo"},{value:345,label:"Sunday SweetSpot"},{value:332,label:"BrushLinks"},{value:205,label:"Mo2tion"},{value:187,label:"27"},{value:36,label:"3"},{value:1,label:"20"}],f={Line:{labels:c.labels,datasets:[{label:"My First dataset",fillColor:"rgba(220,220,220,0.2)",strokeColor:"rgba(220,220,220,1)",pointColor:"rgba(220,220,220,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(220,220,220,1)",data:c.data}]},Pie:{a:d,b:e}},g={responsive:!0},h=[];$("[data-demo-chart]").each(function(){var b=$(this)[0].getContext("2d"),c=$(this).data("demo-chart"),d=$(this).data("demo-chart-child")||!1;console.log(b,c,d),a(b,c,d)})}),/*! X-rayHTML - v2.0.0 - 2015-09-15
 * https://github.com/filamentgroup/x-rayhtml
 * Copyright (c) 2015 ; Licensed MIT */
window.jQuery=window.jQuery||window.shoestring,function(a){function b(){f||(a(d.initSelector)[c](),f=!0)}var c="xrayhtml",d={text:{open:"View Source",close:"View Demo"},classes:{button:"btn btn-small",open:"view-source",sourcepanel:"source-panel"},initSelector:"[data-"+c+"]",defaultReveal:"inline"},e={_create:function(){return a(this).each(function(){var b=a(this).data("init."+c);return b?!1:void a(this).data("init."+c,!0)[c]("_init").trigger("create."+c)})},_init:function(){var b=a(this).attr("data-"+c)||d.defaultReveal;"flip"===b&&a(this)[c]("_createButton"),a(this).addClass(c+" method-"+b)[c]("_createSource")},_createButton:function(){var b=document.createElement("a"),c=document.createTextNode(d.text.open),e=a(this);b.setAttribute("class",d.classes.button),b.href="#",b.appendChild(c),a(b).bind("click",function(a){var c=e.attr("class").indexOf(d.classes.open)>-1;e[c?"removeClass":"addClass"](d.classes.open),b.innerHTML=c?d.text.open:d.text.close,a.preventDefault()}).insertBefore(e)},_createSource:function(){var b=this,c=document.createElement("pre"),e=document.createElement("code"),f=document.createElement("div"),g=document.createElement("div"),h=b.innerHTML.replace(/\=\"\"/g,""),i=document.createTextNode(h);f.setAttribute("class","snippet"),a(b).wrapInner(f),e.appendChild(i),c.appendChild(e),g.setAttribute("class",d.classes.sourcepanel),g.appendChild(c),this.appendChild(g)}};a.fn[c]=function(b,d,e,f){return this.each(function(){return b&&"string"==typeof b?a.fn[c].prototype[b].call(this,d,e,f):a(this).data(c+"data")?a(this):(a(this).data(c+"active",!0),void a.fn[c].prototype._create.call(this))})},a.extend(a.fn[c].prototype,e);var f;a(document).bind("beforeenhance",b),a(b)}(jQuery);