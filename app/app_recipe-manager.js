var host = window.location.protocol+"//tiddlyspace.com",
	load = function() {
		console.log('loading');
		init();
	},	
	/*$.ajax({
			url: host ? host+url : url,
			dataType: 'json',
			success: stripTiddlers,
			headers: {
				'X-ControlView': false
			}
		});*/
	init = function() {
		$('#spaceSubmit').click(function() {
			var name = $('#space').val()+"_public",
				recipe = new TiddlyWeb.Recipe(name, host);
			recipe.get(function(r) {
				console.log(r);
				listRecipe('#public', r);
			}, function() {
				console.log('fail', arguments);
			});
		});
		
		$('#publicSubmit').click(function() {
			var name = $('#space').val()+"_public",
				recipe = new TiddlyWeb.Recipe(name, host),
				r = [],
				bags = $('#public').val().split('\n');
			$.each(bags, function(i, bag) {
				r.push([bag, ""]);
			});
			recipe.recipe = r;
			console.log(r);
			recipe.put(function() {
				console.log('succesPUT', arguments);
			}, function() {
				console.log('errPUT', arguments);
			});
		});
	},
	listRecipe = function(elem, recipe) {
		var bags = [];
		$.each(recipe.recipe, function(i, item) {
			bags.push(item[0]);
		});
		$(elem).val(bags.join('\n'));
	};

$(document).ready(function() {
	var q = window.location.search,
		s = q.indexOf('space=');
	if(q && s!==-1) {
		$('#space').val(q.substring(s+6));
	}
	// we're waiting for the iframe-comms to catch up
	$(document).bind('crossDomainAjaxLoaded', load);
});