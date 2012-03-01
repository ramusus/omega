/*
 * Модальное окно
 */

var modal = (function () {
	var SETTINGS = {
		showLinksSelector: 'a.js-modal',
		modalClassForHtml: 'l-theater',
		modalHtml:
			'<div class="l-modal"> \
				<div class="l-modal-outer"> \
					<div class="l-modal-inner"> \
						<div class="l-modal-container"></div> \
					</div> \
				</div> \
				<div class="b-bookmark b-bookmark-hide"> \
					<a class="link" href="?"><span class="text">Скрыть форму</span></a> \
				</div> \
			</div>',
		modalInnerSelector: '.l-modal-container',
		hideContainerSelector: '.b-bookmark-hide',
		hideContainerGalleryClass: 'b-bookmark-hide-gallery',
		hideLinkSelector: '.b-bookmark-hide .link',
		gallery: {
			html:
				'<div class="b-modal-gallery"> \
					<a class="b-control b-control-prev" href="?"><b></b></a> \
					<a class="link" href="?"> \
						<img class="image"/> \
						<b class="b-control b-control-next" href="?"><b></b></b> \
					</a> \
				</div>',
			singleClass: 'b-modal-gallery-single',
			mainImageSelector: '.image',
			prevControlSelector: '.b-control-prev',
			prevControlDisabledClass: 'b-control-disabled-prev',
			nextControlSelector: '.link',
			nextControlDisabledClass: 'disabled'
		}
	};
	
	var _html, _body, _container, _inner,
		_showLinks, _showLinksGroup, _currentLink, _hideContainer, _hideLink,
		_gallery, _inlineContainer;
	
	function prepareHtml(){
		_container = $(SETTINGS.modalHtml);
		_inner = $(SETTINGS.modalInnerSelector, _container);
		_hideContainer = $(SETTINGS.hideContainerSelector, _container);
		_hideLink = $(SETTINGS.hideLinkSelector, _container);
		
		_body.append(_container);
	}
	
	function assignEvents(){
		_showLinks.click(function(event){
			var thisLink = $(this);
			
			showContents(thisLink.attr('href'), thisLink.attr('rel'));
			showContainer();
			
			event.preventDefault();
		});
		
		_hideLink.click(function(event){
			clearContents();
			hideContainer();
			
			event.preventDefault();
		});
	}
	
	function showContents(url, group){
		var typeRegexp = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$|\.html$|\.htm$/;
			urlType = url.toLowerCase().match(typeRegexp);
		
		if( urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' ){
			_gallery = {};
			
			_gallery.container = $(SETTINGS.gallery.html);
			_gallery.mainImage = $(SETTINGS.gallery.mainImageSelector, _gallery.container);
			_gallery.prevControl = $(SETTINGS.gallery.prevControlSelector, _gallery.container);
			_gallery.nextControl = $(SETTINGS.gallery.nextControlSelector, _gallery.container);
			
			if( group ){
				_showLinksGroup = _showLinks.filter('[rel=' + group + ']');
				
				for( var i = 0; i < _showLinksGroup.length; i++ ){
					if( _showLinksGroup.eq(i).attr('href') == url ){
						_currentLink = i;
					}
				}
				
				manageGalleryControls();
			}
			else{
				_gallery.container.addClass(SETTINGS.gallery.singleClass);
			}
			
			assignGalleryEvents();
			
			_gallery.mainImage.attr('src', url);
			_inner.append(_gallery.container);
			
			// Лучше реализовать возможность задания произвольного заголовка
			_hideContainer.addClass(SETTINGS.hideContainerGalleryClass);
		}
		else if( urlType == '.html' || urlType == '.htm' ) {
			_inner.load(url += '?random=' + (new Date().getTime()));
		}
		else if( url.substr(0, 1) == '#' ){
			_inlineContainer = $(url);
			
			if( _inlineContainer.length ){
				_inner.append(_inlineContainer.children());
			}
		}
	}
	
	function manageGalleryControls(){
		if( _showLinksGroup.length > 1 ){
			if( _currentLink == 0 ){
				_gallery.prevControl.addClass(SETTINGS.gallery.prevControlDisabledClass);
			}
			else{
				_gallery.prevControl.removeClass(SETTINGS.gallery.prevControlDisabledClass);
			}
			
			if( _currentLink == _showLinksGroup.length - 1 ){
				_gallery.nextControl.addClass(SETTINGS.gallery.nextControlDisabledClass);
			}
			else{
				_gallery.nextControl.removeClass(SETTINGS.gallery.nextControlDisabledClass);
			}
		}
		else{
			_gallery.container.addClass(SETTINGS.gallery.singleClass);
		}
	}
	
	function assignGalleryEvents(){
		_gallery.prevControl.click(function(event){
			if( _currentLink > 0 ){
				_currentLink--;
				switchGalleryImage();
			}
			
			event.preventDefault();
		});
		
		_gallery.nextControl.click(function(event){
			if( _currentLink < _showLinksGroup.length - 1 ){
				_currentLink++;
				switchGalleryImage();
			}
			
			event.preventDefault();
		});
	}
	
	function switchGalleryImage(){
		_gallery.mainImage.attr('src', _showLinksGroup.eq(_currentLink).attr('href') );
		manageGalleryControls();
	}
	
	function clearContents(){
		if( typeof _inlineContainer === 'object' && _inlineContainer.hasOwnProperty('length') && _inlineContainer.length ){
			_inlineContainer.append(_inner.children());
			_inlineContainer = '';
		}
		
		_inner.html('');
		
		_hideContainer.removeClass(SETTINGS.hideContainerGalleryClass);
	}
	
	function showContainer(){
		if( $.browser.mozilla ){
			_body.addClass(SETTINGS.modalClassForHtml);
		}
		else{
			if( $.browser.msie && $.browser.version == '6.0' ){
				_html.scrollTop(0);
			}
			_html.addClass(SETTINGS.modalClassForHtml);
		}
		
		_container.show();
	}
	
	function hideContainer(){
		if( $.browser.mozilla ){
			_body.removeClass(SETTINGS.modalClassForHtml);
		}
		else{
			_html.removeClass(SETTINGS.modalClassForHtml);
		}
		
		_container.hide();
	}
	
	return {
		init: function(userSettings){
			$.extend(SETTINGS, userSettings);
			
			_html = $(document.documentElement);
			_body = $(document.body);
			_showLinks = $(SETTINGS.showLinksSelector);
			
			prepareHtml();
			assignEvents();
		},
		hide: function(){
			_hideLink.click();
		}
	};
})();

$(function(){
	modal.init();
});