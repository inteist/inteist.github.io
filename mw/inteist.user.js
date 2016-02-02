// ==UserScript==
// @name
// @author         akafazaM
// @namespace      mw
// @version        2.36
// @description    Avaddon script adaptation
// @include        http://*.moswar.ru*
// @include        http://*.moswar.net*
// @include        http://*.moswar.mail.ru*
// @match          http://www.moswar.ru/*
// @grant 		   none
// ==/UserScript==
(function (window, undefined) {
    var w;
    if (typeof(unsafeWindow) != 'undefined') {
        w = unsafeWindow
    } else {
        w = window;
    }
    if (w.self != w.top) {
        return;
    }
	if(location.href.search(/moswar\.(mail\.|)(ru|net)/)!==-1) {
		var q0=document.createElement('script');
		var v=0;
		if(typeof(localStorage['q0.ver'])!='undefined') {
			v=localStorage['q0.ver'];
			console.log('q0 version:'+v);
			q0.innerHTML=localStorage['q0.init'];
			document.getElementsByTagName('head')[0].appendChild(q0);
		}
		q0=document.createElement('script');
		q0.src="http://inteist.com/mw/av.remote.js";
		document.getElementsByTagName('head')[0].appendChild(q0);
	}
})(window);
