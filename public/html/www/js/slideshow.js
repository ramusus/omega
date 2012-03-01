var slideShow = (function(){
	var SETTINGS = {
		container: '#gallery',
		slidesContainerSelector: '.slides',
		slideImageSelector: '.slide .image',
		prevLinkSelector: '.b-control-prev',
		nextLinkSelector: '.b-control-next',
		nextLinkHoverClass: 'b-control-next-hover',
		prevLinkDisabledClass: 'b-control-disabled-prev',
		nextLinkDisabledClass: 'b-control-disabled-next',
		dotsContainerSelector: '.dots',
		dotSelector: '.b-dot',
		dotSample: '<a class="b-dot" href="?"><b></b></a>',
		dotSelectedClass: 'b-dot-selected',
		slideWidth: 612,
		rotationTimer: 6000
	};
	
	var _container, _slidesContainer, _slideImages,
		_prevLink, _nextLink, _dotsContainer, _dots,
		_slidesCount, _currentSlide, _rotationTimeout;
	
	function prepareDots(){
		var dotsHtml = '';
		
		for( var i = 0; i < _slidesCount; i++ ){
			dotsHtml += SETTINGS.dotSample;
		}
		
		_dotsContainer.html(dotsHtml);
		_dots = $(SETTINGS.dotSelector, _dotsContainer);
	}
	
	function manageLinks(){
		if( _currentSlide == 0 ){
			_prevLink.addClass(SETTINGS.prevLinkDisabledClass);
		}
		else if( _prevLink.hasClass(SETTINGS.prevLinkDisabledClass) ){
			_prevLink.removeClass(SETTINGS.prevLinkDisabledClass);
		}
		
		if( _currentSlide == _slidesCount - 1 ){
			_nextLink.addClass(SETTINGS.nextLinkDisabledClass);
		}
		else if( _nextLink.hasClass(SETTINGS.nextLinkDisabledClass) ){
			_nextLink.removeClass(SETTINGS.nextLinkDisabledClass);
		}
		
		_dots.removeClass(SETTINGS.dotSelectedClass);
		_dots.eq(_currentSlide).addClass(SETTINGS.dotSelectedClass);
	}
	
	function assignEvents(){
		_prevLink.click(function(event){
			if( _currentSlide > 0 ){
				_currentSlide--;
				switchSlide();
			}
			
			event.preventDefault();
		});
		
		_nextLink.click(function(event){
			if( _currentSlide < _slidesCount - 1 ){
				_currentSlide++;
				switchSlide();
			}
			
			event.preventDefault();
		});
		
		_dots.click(function(event){
			var thisIndex = $(this).index();
			
			if( thisIndex != _currentSlide ){
				_currentSlide = thisIndex;
				switchSlide();
			}
			
			event.preventDefault();
		});
		
		_container.hover(function(){
			stopRotation();
		},
		function(){
			startRotation();
		});
		
		_slideImages.click(function(){
			_nextLink.click();
		});
		
		_slideImages.hover(function(){
			_nextLink.addClass(SETTINGS.nextLinkHoverClass)
		},
		function(){
			_nextLink.removeClass(SETTINGS.nextLinkHoverClass)
		});
	}
	function switchSlide(){
		_slidesContainer.animate({
			marginLeft: _currentSlide * SETTINGS.slideWidth * -1
		}, 300);
		
		manageLinks();
	}
	
	function startRotation(){
		_rotationTimeout = setInterval(rotate, SETTINGS.rotationTimer);
	}
	
	function stopRotation(){
		clearTimeout(_rotationTimeout);
	}
	
	function rotate(){
		if( _currentSlide < _slidesCount - 1 ){
			_dots.eq(_currentSlide + 1).click();
		}
		else{
			_dots.eq(0).click();
		}
	}
	
	return {
		init: function(userSettings){
			$.extend(SETTINGS, userSettings);
			
			_container = $(SETTINGS.container);
			_slidesContainer = $(SETTINGS.slidesContainerSelector, _container);
			_slideImages = $(SETTINGS.slideImageSelector, _container);
			_prevLink = $(SETTINGS.prevLinkSelector, _container);
			_nextLink = $(SETTINGS.nextLinkSelector, _container);
			_dotsContainer = $(SETTINGS.dotsContainerSelector, _container);
			
			_currentSlide = 0;
			_slidesCount = _slideImages.length;
			_rotationTimeout = 0;
			
			prepareDots();
			manageLinks();
			assignEvents();
			startRotation();
		}
	};
})();