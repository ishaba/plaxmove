(function($){
	$.fn.plaxmove = function(options) {

		this.defaults = {
			ratioH: 0.2,
			ratioV: 0.2,
			offsetX: 0,
			offsetY: 0,
			reversed: false
		};
		
		var settings = $.extend({},this.defaults,options),
			layer = $(this),
			center = {
				x: window.innerWidth/2-layer.width()/2,
				y: window.innerHeight/2-layer.height()/2
			},
			y0 = layer.position().top,
			x0 = layer.position().left;
			
		var eqH = function(e) {
			return x0+(e.pageX - center.x)*settings.ratioH + settings.offsetX;
		};

		var eqW = function(e) {
			return y0+(e.pageY - center.y)*settings.ratioV + settings.offsetY;
		};        

		if(settings.reversed) {
			var t = eqH; eqH = eqW; eqW = t;
		}

		$('html').on('mousemove', function(e) {

				x = eqH(e)
				y = eqW(e)

				$(layer).css({top:y,left:x})

		});

	};
})(jQuery);
