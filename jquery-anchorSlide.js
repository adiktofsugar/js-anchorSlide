(function ($) {

	//this will set an onclick event on the given object
	//if the object has an href attribute, I will find the
	//object with that id and set it as the target
	//When the click event is fired, it will scroll the window 
	//to that object.
	var 
	dataKey = 'anchorSlide_dataKey',
	methods = {
	
	init : function ( options ) {
		options = $.extend({
			topOffset : 0,
			slideTime : 250
		}, options);
		
		return this.each(function () {
			
			var $this = $(this),
				data = $this.data(dataKey);
				
			if (!data) {
			
				var href = $this.attr('href'),
					$slideTarget;
					
				if (href && String(href).substring(0,1) == '#') {
					$slideTarget = $(href);
					
					data = {
						target : $this,
						slideTarget : $slideTarget,
						options : options,
					};
					$this.data(dataKey, data);
					
					$this.on('click.' + dataKey, methods.clickHandler);
				}
				
			}
			
		});
		
		
	},
	
	clickHandler : function (e) {
		e.preventDefault();
		var $this = $(this),
			data = $this.data(dataKey),
			options = data.options,
			slideTarget = data.slideTarget;
		
			
		$('html,body').animate({
			scrollTop : slideTarget.offset().top + options.topOffset
		}, options.slideTime);
	}
	
	};
	
	$.fn.anchorSlide = function ( options ) {
		return methods.init.call(this, options);
	};

}(jQuery));
