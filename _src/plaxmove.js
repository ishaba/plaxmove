(function(factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }

}(function($) {

  'use strict';

  var Plaxmove = window.Plaxmove || {};

	Plaxmove = (function() {

		var instanceUid = 0;

		function Plaxmove(element, settings) {

			var _ = this, dataSettings;

			_.defaults = {
				$canvas: $(window),
				$layer: $(element),
				center: {
					x: 0,
					y: 0
				},
				initialСoordinates: {
					x: 0,
					y: 0
				},
				ratio: {
					x: 0.2,
					y: 0.2
				}
			};

			_.setСoordinates = $.proxy(_.setСoordinates, _);
			_.moveHandler = $.proxy(_.moveHandler, _);
			_.animateProps = $.proxy(_.animateProps, _);

			_.instanceUid = instanceUid++;

			dataSettings = $(element).data('plaxmove') || {};

			_.options = $.extend({}, _.defaults, dataSettings, settings);

			_.init(true);

		}

		return Plaxmove;

	}());

  Plaxmove.prototype.init = function(creation) {

    var _ = this;

    if (!$(_.$layer).hasClass('plaxmove-initialized')) {

      $(_.$layer).addClass('plaxmove-initialized');

      _.initializeEvents();

    }

  };

  Plaxmove.prototype.initializeEvents = function() {

    var _ = this;

    _.options.$canvas.on('touchmove.plaxmove mousemove.plaxmove', {
        action: 'move'
    }, _.moveHandler.throttle(100) );

    $(window).on('resize.plaxmove.plaxmove-' + _.instanceUid, _.setСoordinates);

    $(window).on('load.plaxmove.plaxmove-' + _.instanceUid, _.setСoordinates);
    $(document).on('ready.plaxmove.plaxmove-' + _.instanceUid, _.setСoordinates);

  };

  Plaxmove.prototype.setСoordinates = function() {

    var _ = this;

		var offset = _.options.$layer.offset();

		_.options.initialСoordinates = {
			x: offset.left,
			y: offset.top
		}

		_.options.center = {
			x: _.options.$canvas.outerWidth() / 2 - _.options.$layer.outerWidth() / 2,
			y: _.options.$canvas.outerHeight() / 2 - _.options.$layer.outerHeight() / 2
		}

  };

  Plaxmove.prototype.moveHandler = function(event) {

		var _ = this;

		var x = _.options.initialСoordinates.x + ( event.pageX - _.options.center.x ) * _.options.ratio.x;
		var y =  _.options.initialСoordinates.y + ( event.pageY - _.options.center.y ) * _.options.ratio.y;

		_.animateProps(x,y);

	};

  Plaxmove.prototype.animateProps = function(x,y) {

		var _ = this;

		var prefix = (function () {
		  var styles = window.getComputedStyle(document.documentElement, ''),
		    pre = (Array.prototype.slice
		      .call(styles)
		      .join('')
		      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
		    )[1],
		    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		  return {
		    dom: dom,
		    lowercase: pre,
		    css: '-' + pre + '-',
		    js: pre[0].toUpperCase() + pre.substr(1)
		  };
		})();

		var transform = prefix.css+'transform';

		_.options.$layer.css({transform: 'translate('+x+'px,'+y+'px)'});

	};

  $.fn.plaxmove = function() {
    var _ = this,
      opt = arguments[0],
      args = Array.prototype.slice.call(arguments, 1),
      l = _.length,
      i = 0,
      ret;
    for (i; i < l; i++) {
      if (typeof opt == 'object' || typeof opt == 'undefined')
        _[i].plaxmove = new Plaxmove(_[i], opt);
      else
        ret = _[i].plaxmove[opt].apply(_[i].plaxmove, args);
      if (typeof ret != 'undefined') return ret;
    }
    return _;
  };

	/**
	* throttle
	* @param {integer} milliseconds This param indicates the number of milliseconds
	*     to wait between calls before calling the original function.
	* @return {function} This returns a function that when called will wait the
	*     indicated number of milliseconds between calls before
	*     calling the original function.
	*/
	Function.prototype.throttle = function (milliseconds) {
	    var baseFunction = this,
	        lastEventTimestamp = null,
	        limit = milliseconds;

	    return function () {
	        var self = this,
	            args = arguments,
	            now = Date.now();

	        if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
	            lastEventTimestamp = now;
	            baseFunction.apply(self, args);
	        }
	    };
	};

}));
