eval('AngryAjax.goToUrl3 = '+AngryAjax.goToUrl.toString().replace("url = url.replace('#', '');",''));
(function() {
	if (location.href.search(/.moswar\.ru/)==-1 && location.href.search(/moswar\.net/)==-1) return;

	var charName = $('#personal > .name > b').html().match(/(.+)\s\[\d+\]/)[1];

	var sc = document.createElement('script');
	sc.innerHTML = '\n\	var findNPC = false;\n\
	$(".group:last .user .level").each(function() {\n\
		var o = $(\'<b class="user-to-chat" style="cursor: pointer; margin-left: 3px;">\' + $(this).html() + \'</b>\');\n\
		$(this).after(o);\n\
		o.on("click", function() {\n\
			if ($("#chat-textarea").length > 0) {\n\
				var name = $(this).parent().children("a:last").html();\n\
				$("#chat-textarea").val(name);\n\
			}\n\
		});\n\
		$(this).remove();\n\
	});\n\
	$(document).on("ajaxComplete", function() {\n\
		if (location.href.search(/[/]fight[/]/)!=-1) {\n\
			var avaddon = {};\n\
			avaddon.s1 = 0;\n\
			avaddon.s2 = 0;\n\
    		$(".group:first .alive .number").each(function() {\n\
      			if (!$(this).find(".question-icon")[0]) {avaddon.s1 += Number($(this).text().match(/\\d+/))}\n\
    		});\n\
    		$(".group:last .alive .number").each(function() {\n\
      			if (!$(this).find(".question-icon")[0]) {avaddon.s2 += Number($(this).text().match(/\\d+/))}\n\
    		});\n\
			$(".allhp").remove();\n\
			$(\'#avaddon-summ-hp1\').remove();\n\
			$(\'#avaddon-summ-hp2\').remove();\n\
    		$(".group1").append(\'<div id="avaddon-summ-hp1" style="top:0.5em;color:#2B7C12;font-size:10px;">\' + avaddon.s1.toString() + "</div>");\n\
    		$(".group2").append(\'<div id="avaddon-summ-hp2" style="top:0.5em;color:#2B7C12;font-size:10px;">\' + avaddon.s2.toString() + "</div>");\n\
			var l = $("#fightGroupForm span.level").length;\n\
			for(var i = 0; l>i; i++){\n\
				var sp = $("#fightGroupForm span.level:eq(" + i + ")");\n\
				var o = $(\'<b class="user-to-chat" style="cursor: pointer; margin-left: 3px;">\' + sp.html() + \'</b>\');\n\
				sp.after(o);\n\
				o.on("click", function() {\n\
					if ($("#chat-textarea").length > 0) {\n\
						var name = $(this).parent().children("a:last").html();\n\
						$("#chat-textarea").val(name);\n\
						ChatMini.doSendMessage();\n\
					}\n\
				});\n\
				sp.remove();\n\
			};\n\
			\n\			if ($(".use-chat").length == 0) {\n\
			var html = \'<small style="position: absolute; width: 155px; margin-left: -6px; line-height: 20px; margin-top: 10px; background-color: #f6e5b6; border: 1px solid #c5a75c; border-radius: 5px; padding: 10px;">\';\n\
			html += \'<a href="#" class="use-chat">Грены</a> &#0149; <a href="#" class="use-chat">Залп</a> &#0149; <a href="#" class="use-chat">Греним или</a>  &#0149; \';\n\
			html += \'<a href="#" class="use-chat">По неписи</a> &#0149; <a href="#" class="use-chat">Сыр</a>  &#0149; \';\n\
			html += \'<a href="#" class="use-chat">Зовем непись</a> &#0149; <a href="#" class="use-chat">Рандом</a>  &#0149; <a href="#" class="use-chat">Кидаем омон, пугала, медведей</a>  &#0149; \';\n\
			html += \'<a href="#" class="use-chat">Непись разбираем</a> &#0149; <a href="#" class="use-chat">Щиты</a> &#0149; <a href="#" class="use-chat">Еще</a>  &#0149; \';\n\
			html += \'<a href="#" class="use-chat">Половина гренят, половина бьют руками</a>  &#0149; <a href="#" class="use-chat">Кусаю</a> &#0149; <a href="#" class="use-chat">Корка</a> &#0149; <a href="#" class="use-chat">Кальяны и греним</a> &#0149; <a href="#" class="use-chat">Сносим фронт и генералов</a>  &#0149; \';\n\
			html += \'<a href="#" class="use-chat">Греним до упора или бьем самого толстого</a></small>\';\n\
			$("#miniChat .write-message").append(html);\n\
			$(".use-chat").on("click", function(e) {\n\
				e.preventDefault();\n\
				var val = $(this).html().toLowerCase();\n\
				$("#chat-textarea").val(val);\n\
				ChatMini.doSendMessage();\n\
			});\n\
			}\n\
			\n\		}\n\		if (location.href.search(/search/) != -1) {\n\
			if (findNPC) {\n\
				if ($(".fighter2 .user i").length > 0) {\n\
					if ($(".fighter2 .user i").prop("title") == "Гражданин") {\n\
						findNPC = false;\n\
					}\n\
					else {\n\
						$(".button-search a").click();\n\
					}\n\
				}\n\
			}\n\
			else {\n\
				if ($(".button-search-npc").length == 0) {\n\
					var html = \'<div class="button button-search-npc" style="width: auto; margin: 0 12px;"><a class="f" href="/alley/search/again/"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">Искать Агента</div></a></div>\';\n\
					$(".button-search").after(html);\n\
					$(".button-search-npc").on("click", function(e) {\n\
						e.preventDefault();\n\
						findNPC = true;\n\
						$(".button-search a").click();\n\
					});\n\
				}\n\
			}\n\
		}\n\
		else\n\
			findNPC = false;\n\	});\n\
	var mustFound = ["2763", "3928", "6273", "958", "3817", "3797", "3348", "3349", "3350", "3365", "4023", "4022", "4021", "5791"];\n\
	$(document).on("ajaxComplete", function() {\n\
		var foundCake = 0;\n\
		var foundPrize = 0;\n\
		var foundBox = 0;\n\
		var foundAll = {};\n\
		$(".object-thumb div.padding img").each(function() {\n\
			var st = $(this).data("st");\n\
			for (var i = 0; i < mustFound.length; i++) {\n\
				if (typeof(foundAll[mustFound[i]]) == "undefined") {\n\
					foundAll[mustFound[i]] = 0;\n\
				}\n\
				if (st == mustFound[i]) {\n\
					if (foundAll[mustFound[i]] > 0) {\n\
						$(this).parent().parent().remove();\n\
					}\n\
					foundAll[mustFound[i]]++;\n\
				}\n\
			}\n\
		});\n\
		for (var i = 0; i < mustFound.length; i++) {\n\
			if (foundAll[mustFound[i]] > 1)\n\
				$(".object-thumb div.padding img[data-st=\'" + mustFound[i] + "\']").after(\'<div class="count">#\' + foundAll[mustFound[i]] + \'</div>\');\n\
		}\n\
	});\n\
	$(document).on("ajaxComplete", function() {\n\
		if (location.href.search(/sovet/) != -1) {\n\
			$(".progress > .council-bar > span.percent[style=\'width: 100%;\']").each(function () {\n\
				$(this).parent().parent().children(".button[onclick]").click();\n\
			});\n\
		}\n\
	});\n\
	';
	document.getElementsByTagName('head')[0].appendChild(sc);
})();
(function() {
		function doSaveEq() {
		if (location.href.search(/[/]fight[/]/)!=-1) {
			if (typeof(window.localStorage.fightEq) == 'undefined' || window.localStorage.fightEq == null) {
				window.localStorage.fightEq = JSON.stringify({'zero0' : ''});
			}
			var fightEq = JSON.parse(window.localStorage.fightEq);

			$('.user-already-eq').remove();
			$('.group .list-users li').each(function() {
				var name = $(this).find('.user').children('a[href^="/player/"]').html();
				var lvl = $(this).find('.user').children('.user-to-chat').html();
				if (lvl == null) {
					lvl = $(this).find('.user').children('.level').html();
				}
				var name = name + '&nbsp;' + lvl;
				var html = '<span class="user-already-eq"><br><div class="fight-log" style="position: absolute; margin-top: -10px;">';
				for (var i = 0; i < 6; i++) {
					if (typeof(fightEq[name]) == 'undefined')
						html += '';
					else if (typeof(fightEq[name][i]) != 'undefined')
						html += '<div style="display: inline-block; margin: 6px 2px;">' + fightEq[name][i].image + '<small style="margin-top: -3px; display: block; position: absolute;">#' + fightEq[name][i].count + '</small></div>';
				}
				html += '</div><div style="height: 25px;"></div></span>';
				if ($(this).children('label').length == 1)
					$(this).children('label').append(html);
				else
					$(this).append(html);
			});
		}
	};
	var eq = [
		{title: 'Пробковая каска [Ультра]', name: 'helmet', image: '<span class="icon icon-helmet" style="margin: 0;"></span>'},
		{title: 'Пробковая каска', name: 'helmet', image: '<span class="icon icon-helmet" style="margin: 0;"></span>'},
		{title: 'Ароматным сыром', name: 'cheese', image: '<span class="icon icon-cheese" style="margin: 0;"></span>'},
		{title: 'Щит [Ультра]', name: 'antigranata', image: '<img src="http://www.inteist.com/mw/img/eq/4.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Щит', name: 'antigranata', image: '<span class="icon icon-antigranata" style="margin: 0;"></span>'},
		{title: 'Коварная пружина', name: 'reflect', image: '<span class="icon icon-reflect" style="margin: 0;"></span>'},
		{title: 'Коварная пружина [Ультра]', name: 'reflect', image: '<span class="icon icon-reflect" style="margin: 0;"></span>'},
		{title: 'Тыква «Колхозная»', name: 'tikva', image: '<img src="http://www.inteist.com/mw/img/eq/22.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Орех «Кокосовый»', name: 'oreh', image: '<img src="http://www.inteist.com/mw/img/eq/21.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Роллы «Огурцовые» [Ультра]', name: 'rolls_ultra', image: '<img src="http://www.inteist.com/mw/img/eq/13.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Роллы «Огурцовые» [Мега]', name: 'rolls_mega', image: '<img src="http://www.inteist.com/mw/img/eq/13.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Роллы «Огурцовые»', name: 'rolls', image: '<img src="http://www.inteist.com/mw/img/eq/13.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Гранат «Осколочный»', name: 'granat', image: '<img src="http://www.inteist.com/mw/img/eq/24.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Дуриан «Заморский»', name: 'durian', image: '<img src="http://www.inteist.com/mw/img/eq/23.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Вкусный воккер', name: 'vokker', image: '<img src="http://www.inteist.com/mw/img/eq/16.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Вкусный воккер [Ультра]', name: 'vokker', image: '<img src="http://www.inteist.com/mw/img/eq/15.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Икорка на черством хлебушке', name: 'ikorka', image: '<img src="http://www.inteist.com/mw/img/eq/12.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Кластерная граната', name: 'klaster', image: '<img src="http://www.inteist.com/mw/img/eq/10.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Кластерная граната [Ультра]', name: 'klaster_ultra', image: '<img src="http://www.inteist.com/mw/img/eq/9.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Кластерная граната [Мега]', name: 'klaster_mega', image: '<img src="http://www.inteist.com/mw/img/eq/9.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Коктейль Молотова', name: 'molotov', image: '<img src="http://www.inteist.com/mw/img/eq/7.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Коктейль Молотова [Ультра]', name: 'molotov_ultra', image: '<img src="http://www.inteist.com/mw/img/eq/8.jpg" style="width: 16px; height: 16px; vertical-align: middle;">'},
		{title: 'Стальной щит', name: 'o_shield', image: '<span class="icon icon-antigranata" style="margin: 0;"></span>'}
	];
	function analyzeEq() {
		if (typeof(window.localStorage.fightEq) == 'undefined' || window.localStorage.fightEq == null) {
			window.localStorage.fightEq = JSON.stringify({'0' : ''});
		}

		if (location.href.search(/[/]fight[/]/)!=-1) {
			var fightId = location.href.replace('http://', '').split('/')[2];
			if (fightId != window.localStorage.fightId) {
				window.localStorage.fightId = fightId;
				window.localStorage.fightEq = JSON.stringify({'0' : ''});
			}
		}
		var fightEq = JSON.parse(window.localStorage.fightEq);

		var step = $('.block-rounded .current').html();
		$('.fight-log .text p').each(function() {
			var name = $(this).children('.name-arrived').children('b').html();
			if (name == null)
				name = $(this).children('.name-resident').children('b').html();
			if (typeof(fightEq[name]) == 'undefined')
				fightEq[name] = [];
			for (var j = 0; j < eq.length; j++) {
				if ($(this).children('b').html() == eq[j].title) {
					var f = -1;
					for (var i = 0; i < 6; i++) {
						if (typeof(fightEq[name][i]) != 'undefined') {
							if (fightEq[name][i].type == eq[j].name)
								f = i;
						}
					}
					if (f == -1)
						fightEq[name].push({type: eq[j].name, image: eq[j].image, count: 1, steps: [step]});
					else {
						var found = false;
						for (var t = 0; t < fightEq[name][f].steps.length; t++) {
							if (fightEq[name][f].steps[t] == step)
								found = true;
						}
						if (!found) {
							fightEq[name][f].count++;
							fightEq[name][f].steps.push(step);
						}
					}
				}
			}
		});
		window.localStorage.fightEq = JSON.stringify(fightEq);
	};
	doSaveEq();
	analyzeEq();
	function showmetrowar() {
		if (location.href.search(/[/]metrowar[/]/)!=-1) {
			$('#avaddon-metrowar').remove();

			var npc = '<i class="npc"></i> НПС';
			var html = '<div id="avaddon-metrowar">';
			html += '<div style="background-color: #f5f5dc; padding: 6px;">';
			html += '<div class="avaddon-metro-line" style="background-color: #eee6a3; width: 100%; padding: 3px 0;" data-i="1"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">1</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '<div class="avaddon-metro-line" style="background-color: #eee6a3; width: 100%; padding: 3px 0;" data-i="16"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">2</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '<div class="avaddon-metro-line" style="background-color: #f2e8c9; width: 100%; padding: 3px 0;" data-i="12"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">3</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '<div class="avaddon-metro-line" style="background-color: #f2e8c9; width: 100%; padding: 3px 0;" data-i="5"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">4</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '</div>';
			html += '<div style="background-color: #f5f5dc; padding: 6px;">';
			html += '<div class="avaddon-metro-line" style="background-color: #eee6a3; width: 100%; padding: 3px 0;" data-i="7"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">5</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '<div class="avaddon-metro-line" style="background-color: #eee6a3; width: 100%; padding: 3px 0;" data-i="10"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">6</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '<div class="avaddon-metro-line" style="background-color: #f2e8c9; width: 100%; padding: 3px 0;" data-i="3"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">7</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '<div class="avaddon-metro-line" style="background-color: #f2e8c9; width: 100%; padding: 3px 0;" data-i="14"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">8</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '</div>';
			html += '<div style="background-color: #f5f5dc; padding: 6px;">';
			html += '<div class="avaddon-metro-line" style="background-color: #eee6a3; width: 100%; padding: 3px 0;" data-i="13"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">9</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '<div class="avaddon-metro-line" style="background-color: #eee6a3; width: 100%; padding: 3px 0;" data-i="4"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">10</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '<div class="avaddon-metro-line" style="background-color: #f2e8c9; width: 100%; padding: 3px 0;" data-i="8"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">11</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '<div class="avaddon-metro-line" style="background-color: #f2e8c9; width: 100%; padding: 3px 0;" data-i="9"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">12</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '</div>';
			html += '<div style="background-color: #f5f5dc; padding: 6px;">';
			html += '<div class="avaddon-metro-line" style="background-color: #eee6a3; width: 100%; padding: 3px 0;" data-i="6"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">13</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '<div class="avaddon-metro-line" style="background-color: #eee6a3; width: 100%; padding: 3px 0;" data-i="11"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">14</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '<div class="avaddon-metro-line" style="background-color: #f2e8c9; width: 100%; padding: 3px 0;" data-i="15"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">15</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '<div class="avaddon-metro-line" style="background-color: #f2e8c9; width: 100%; padding: 3px 0;" data-i="2"><div class="avaddon-metro-num" data-t="999" style="width: 15px; display: inline-block; text-align: center; cursor: pointer;">16</div><div class="avaddon-metro-name" style="display: inline-block;">' + npc + '</div></div>';
			html += '</div>';
			html += '</div>';

			$('.metrowar-station-description').before(html);

			var icon = '<i class="icon reload-icon" id="avaddon-reload-station"></i>';
			$('#avaddon-reload-station').remove();
			$('#station-select').after(icon);

			$('#avaddon-reload-station').on('click', function() {
				var st = parseInt($('#station-select').val());
				metrowarShowStation(st);
			});

			$('#servertime2').remove();
			var oo = $('#servertime').clone(true);
			oo.prop('id', 'servertime2').addClass('avaddon-st').css({position: 'relative', left: 'auto', backgroundColor: 'transparent', border: '0', margin: '16px 0', display: 'block', textAlign: 'center', fontSize: '20px'});
			$('#station').before(oo);

			var i = 0;
			$('#metrowar-challangers-clans-list table tr').each(function() {
				if (i > 0) {
					var num = $(this).children('.num').html().replace('.', '');
					var clan = $(this).find('.clan-name').html();
					var tugri = 0;
					if (i != 1)
						tugri = $(this).find('.tugriki').html().replace(',', '');
					else {
						if ($(this).find('.tugriki').length == 1) {
							tugri = $(this).find('.tugriki').html().replace(',', '');
						}
						else {
							tugri = 999;
						}
					}
					$('.avaddon-metro-line[data-i="' + i + '"] .avaddon-metro-name').html(clan);
					$('.avaddon-metro-line[data-i="' + i + '"] .avaddon-metro-num').data('t', tugri);
				}
				i++;
			});
			for (t = i+1; t<17; t++) {
				$('.avaddon-metro-line[data-i="' + t + '"] .avaddon-metro-num').html('');
			}

			$('.avaddon-metro-num').on('click', function() {
				var tugri = parseInt($(this).data('t'));
				tugri++;
				var st = parseInt($('#station-select').val());
				$.post('/metrowar/cancel_bet/' + st + '/', {"action": "cancel_bet", "station_id": st, "ajax": 1}, function(data) {
					metrowarBet(st, tugri);
				});
			});
		}
	}

	var autoTugri = 0;
	function doClickAutoTugri(round) {
		autoTugri--;
		$(".factory-nanoptric p button[type='submit']").click();
	}
	if (typeof(window.localStorage.avaddonAutoTugri) == 'undefined')
		window.localStorage.avaddonAutoTugri = 0;

		var newTimer = function() {
				var timeOffset = parseInt($("#timeoffset").attr("rel"));
				AngryAjax.setInterval(function(){
					var time = parseInt($("#servertime2").attr("rel"));
					var d = new Date();
					d.setTime((time + timeOffset) * 1000); // серверное время здесь
					var m = d.getUTCMinutes();
					if (m < 10) {
						m = "0" + m;
					}
					var s = d.getUTCSeconds();
					if (s < 10) {
						s = "0" + s;
					}
					$("#servertime2").html(d.getUTCHours() + ":" + m + ":" + s);
					time ++;
					$("#servertime2").attr("rel", time);
				}, "1000");
		};
	showmetrowar();
			newTimer();
		$(document).on("ajaxComplete", function() {
				showmetrowar();
				if (location.href.search(/[/]fight[/]/)!=-1) {
						analyzeEq();
			doSaveEq();

			if ($('.fight-log .text .attack_i')[0] !== undefined) {
				if ($('.group .me img:last') !== undefined) {
					var pet_u = $('.attack_i:first').next();
					$('.fight-log .text').prepend($('.attack_i'));
					$('.attack_i:first').after(pet_u);
				}
				else {
					$('.fight-log .text').prepend($('.attack_i'));
				}
			}
			if ($('.fight-log .text .attack_me')[0] !== undefined) {
				$('.fight-log .text').prepend($('.attack_me'));
			}
		}

				if (location.href.search(/[/]player[/]/)!=-1) {
			window.localStorage.avaddonAutoTugri = parseInt($('.object-thumb div img[data-st="960"]').parent().children('.count').text().replace('#', ''));
		}
		if (location.href.search(/[/]factory[/]/)!=-1) {
			if (autoTugri > 0)
				doClickAutoTugri(autoTugri);
			$('#avaddon-create-auto-tugri').remove();
			var money = parseInt($('#personal .wallet .tugriki-block').prop('title').replace("Монет: ", ""));
			var ruda = parseInt($('#personal .wallet .ruda-block').prop('title').replace("Руды: ", ""));
			var needMoney = parseInt($(".factory-nanoptric p button[type='submit'] .c .tugriki").text().replace(",", ""));
			var needRuda = parseInt($(".factory-nanoptric p button[type='submit'] .c .ruda").text().replace(",", ""));
			var round = Math.min(parseInt(window.localStorage.avaddonAutoTugri), Math.min(Math.floor(ruda/needRuda), Math.floor(money/needMoney)));
			if (round > 1) {
				var html = '<button style="margin-left: 14px;" class="button" id="avaddon-create-auto-tugri"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">Сделать на все <span class="ruda">' + (round*needRuda) + '<i></i></span> + <span class="tugriki">' + (round*needMoney) + '<i></i></span> (' + round + ' раз)</div></span></button>';
				$(".factory-nanoptric p button[type='submit']").after(html);
				$('#avaddon-create-auto-tugri').on("click", function(e) {
					autoTugri = round;
					e.preventDefault();
					doClickAutoTugri(autoTugri);
				});
			}
		}
			});
		$(document).ready(function() {
		var search_bar = $('#servertime');
		var margin = 0;
		var left = parseInt(search_bar.offset().left)-14;
		var borderY = search_bar.offset().top - margin;
		var search_bar2 = $('#timeout');
		var left2 = search_bar2.offset().left;
		var borderY2 = search_bar2.offset().top;

		search_bar.css('z-index', 50000000);
		search_bar2.css('z-index', 50000000);

		$(window).on('scroll', function() {
			if (left2 == 0) {
				search_bar2 = $('#timeout');
				left2 = search_bar2.offset().left;
				borderY2 = search_bar2.offset().top;
			}
			var currentY = $(document).scrollTop();

			if(currentY > borderY) {
	      		search_bar.css({position: 'fixed', top: margin + 'px', left: left + 'px', backgroundColor: '#fcdd76', padding: '5px 10px', borderRadius: '15px', fontSize: '13px', color: '#000000', fontWeight: 'bold', border: '2px solid #ffffff'});
	    	}
	    	else if(currentY < borderY) {
				search_bar.css({position: 'absolute', left: '-180px', top: 0, backgroundColor: 'transparent', padding: '0', borderRadius: '0', fontSize: '90%', color: '#c27a1d', fontWeight: 'normal', border: '0'});
	    	}
			if (currentY > borderY2) {
				search_bar2.css({position: 'fixed', top: '0', left: left2 + 'px'});
			}
			else {
				search_bar2.css({position: 'absolute', top: '60px', left: '322px'});
			}
		});
	});
	})();

$(document).on("ajaxComplete", function() {
	if (location.href.search(/[/]gypsy[/]/) != -1) {
		if ($("#avaddon-auto-gypsy").length == 0) {
			$(".history").after('<div class="button" id="avaddon-auto-gypsy" style="margin: -45px -21px 0px 5px; width: 40px; float: right;"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">+</div></span></div>');
			$("#avaddon-auto-gypsy").on("click", function() {
				Gypsy.restart(0);
				setTimeout('Gypsy.feelLucky()', 500);
			});
		}
	}
});
	$(document).on("ajaxComplete", function() {
	if (location.href.search(/[/]alley[/]/) != -1) {
		if ($("#avaddon-auto-fight-alley").length == 0) {
			var html = '<div class="button" id="avaddon-auto-fight-alley" style="margin: 12px 0;"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">Бить агентов каждые 5 минут</div></span></div><br>';
			$("#searchForm").before(html);
			if (typeof(window.localStorage.avaddonAutoFightAlleyNum) == 'undefined') {
				window.localStorage.avaddonAutoFightAlleyNum = 0;
				window.localStorage.avaddonAutoFightAlley = 0;
				window.localStorage.avaddonAutoFightAlleyLvl = 0;
			}
			$("#avaddon-auto-fight-alley").on("click", function() {
				var html = '<p align="center">Количество боев: <input id="avaddon-num-fights" value="20"></p>';
				html += '<p align="center">Уровень для битья: <input id="avaddon-lvl-fights" value="21"></p>';
				var buttons = [];
				buttons.push({
					title: "Начать",
					callback: function(obj) {
						alertsData = [];
						AvaddonAutoFightAlley($("#avaddon-num-fights").val(), $("#avaddon-lvl-fights").val());
						closeAlert(obj);
					}
				});
				buttons.push({title: "Отмена", callback: null});
				showConfirm(html, buttons, {"__title": "Начать бои"});
			});
			if (window.localStorage.avaddonAutoFightAlley == '1') {
				if ($("input[name='minlevel']").length == 1) {
					$("input[name='minlevel']").val(window.localStorage.avaddonAutoFightAlleyLvl);
					$("input[name='maxlevel']").val(window.localStorage.avaddonAutoFightAlleyLvl);
					window.localStorage.avaddonAutoFightAlley = 2;
					$("#searchLevelForm").trigger('submit');
				}
			}
			else if (window.localStorage.avaddonAutoFightAlley == '2') {
				if (location.href.search(/[/]search[/]/) != -1) {
					if ($(".fighter2 .user i").length > 0) {
						if ($(".fighter2 .user i").prop("title") == "Гражданин") {
							$(".button-fight a").click();
							setTimeout('window.localStorage.avaddonAutoFightAlley = 3', 1000);
							setTimeout("AngryAjax.goToUrl3('/alley/')", 2000);
						}
						else {
							$(".button-search a").click();
						}
					}
				}
			}
			else if (window.localStorage.avaddonAutoFightAlley == '3') {
				var hp = $(".life > .bar > .plus-icon").css("display") == 'none' ? false : true;
				if (hp) {
					$(".life > .bar > .plus-icon").click();
				}
				if ($("#timeout").length == 1) {
					setTimeout('AvaddonAutoFightAlley(window.localStorage.avaddonAutoFightAlleyNum, window.localStorage.avaddonAutoFightAlleyLvl)', 305000);
				}
				else
					AvaddonAutoFightAlley(window.localStorage.avaddonAutoFightAlleyNum, window.localStorage.avaddonAutoFightAlleyLvl);
			}
		}
	}
});

function AvaddonAutoFightAlley(num, lvl) {
	num = parseInt(num);
	num--;
	window.localStorage.avaddonAutoFightAlleyNum = num;
	window.localStorage.avaddonAutoFightAlleyLvl = lvl;
	if (num < 0) {
		window.localStorage.avaddonAutoFightAlley = 0;
	}
	else {
		window.localStorage.avaddonAutoFightAlley = 1;
		setTimeout("AngryAjax.goToUrl3('/alley/')", 1000);
	}
}

	$(document).on("ajaxComplete", function() {
	if (location.href.search(/[/]shaurburgers[/]/) != -1) {
		if ($("#shaurma-btn").length == 1 && $("#avaddon-auto-shaurma").length == 0) {
			$("#shaurma-btn").after('<span id="avaddon-auto-shaurma" style="margin-left: 16px;" class="button"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">Работать как таджик</div></span></span>');
			$("#avaddon-auto-shaurma").on("click", function() {
				var time = parseInt($("select[name='time']").val());
				var html = '<p align="center">Количество смен: <input id="num-shaurma" value="8"></p>';
				var buttons = [];
				buttons.push({
					title: "Начать",
					callback: function(obj) {
						alertsData = [];
						AvaddonAutoShaurma($("#num-shaurma").val(), time);
						closeAlert(obj);
					}
				});
				buttons.push({title: "Отмена", callback: null});
				showConfirm(html, buttons, {"__title": "Начать работу"});
			});
		}
		if (typeof(window.localStorage.avaddonNumShaurma) != 'undefined') {
			var num = parseInt(window.localStorage.avaddonNumShaurma);

			if (num >= 0) {
				var a = $("#workForm > div > span > span > div").html();
				if (a == "Улизнуть с работы") {
					$("#workForm > div > span > span > div").html("Прервать. Осталось " + num).on("click", function() {
						window.localStorage.avaddonNumShaurma = -1;
					});

				}
			}

			if (num >= 0 && window.localStorage.avaddonAutoShaurma == 1) {
				var time = parseInt(window.localStorage.avaddonTimeShaurma);
				$("select[name='time']").val(window.localStorage.avaddonTimeShaurma);
				window.localStorage.avaddonAutoShaurma = 0;
				$("#shaurma-btn").click();
				setTimeout("AvaddonAutoShaurma(" + window.localStorage.avaddonNumShaurma + ", " + time + ")", (time * 60 * 60 * 1000 + 5000));
			}
		}
	}
});

function AvaddonAutoShaurma(numShaurma, timeShaurma) {
	numShaurma = parseInt(numShaurma);
	numShaurma--;
	window.localStorage.avaddonNumShaurma = numShaurma;
	window.localStorage.avaddonTimeShaurma = timeShaurma;

	if (numShaurma < 0) {
		window.localStorage.avaddonNumShaurma = -1;
		window.localStorage.avaddonTimeShaurma = 0;
		window.localStorage.avaddonAutoShaurma = 0;
	}
	else {
		setTimeout("AngryAjax.goToUrl3('/shaurburgers/')", 1000);
		window.localStorage.avaddonAutoShaurma = 1;
	}
}
		(function() {
		$(document).on("ajaxComplete", function() {
			if (location.href.search(/[/]alley[/]/) != -1) {
				if (parseInt(window.localStorage.avaddonAutoPatrolNum) > -1) {
					if ($("a[href='/desert/']").length > 0) {
						$("a[href='/desert/]").click();
						setTimeout("AngryAjax.goToUrl3('/desert/rob/')", 2000);
						setTimeout("AngryAjax.goToUrl3('/alley/')", 4000);
						setTimeout("CheckPatrolCamels()", 6000);
					}
					if ($("#alley-patrol-button").length == 1 && window.localStorage.avaddonAutoPatrolUse == 1) {
						window.localStorage.avaddonAutoPatrolUse = 0;
						$("#patrolForm").trigger("submit");
						setTimeout("AvaddonAutoPatrol(" + window.localStorage.avaddonAutoPatrolNum + ")", 605000);
					}
				}
				if ($("#alley-patrol-button").length == 1 && $("#avaddon-auto-patrol").length == 0) {
					$("#alley-patrol-button").after('<div class="button" id="avaddon-auto-patrol" style="margin: 0 9px; vertical-align: middle;"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">Автопатруль</div></span></div>');
					$("#avaddon-auto-patrol").on("click", function() {
						var time = parseInt($("select[name='time'] option:last-child").prop("value"))/10;
						var html = '<p align="center">Количество патрулей: <input id="num-patrols" value="' + time + '"></p>';
						var buttons = [];
						buttons.push({
							title: "Начать",
							callback: function(obj) {
								alertsData = [];
								AvaddonAutoPatrol($("#num-patrols").val());
								closeAlert(obj);
							}
						});
						buttons.push({title: "Отмена", callback: null});
						showConfirm(html, buttons, {"__title": "Запустить автопатруль"});
					});
				}
			}
		});
	}
	)();

	function AvaddonAutoPatrol(num) {
		window.localStorage.avaddonAutoPatrolNum = num;
		var patrolNum = parseInt(window.localStorage.avaddonAutoPatrolNum)-1;
		if (patrolNum < 0) {
			window.localStorage.avaddonAutoPatrolUse = 0;
			window.localStorage.avaddonAutoPatrolNum = '-1';
			moswar.showPopup('Закончили время патрулирования', 'Все готово!', 4000);
		}
		else {
			window.localStorage.avaddonAutoPatrolUse = 1;
			window.localStorage.avaddonAutoPatrolNum = patrolNum;
			setTimeout("AngryAjax.goToUrl3('/alley/');", 2000);
		}
	}

	function CheckPatrolCamels() {
		var t = parseInt($(".tugriki-block").prop("title").replace("Монет: ", ""));
		if (t > 200000) {
			var r = Math.floor(t / 750);
			setTimeout("AngryAjax.goToUrl3('/bank/')", 2000);
			setTimeout("$('#ruda_count').val('" + r + "');$('.bank-robbery form').submit()", 6000);
			setTimeout("AngryAjax.goToUrl3('/alley/')", 8000);
		}
	}
