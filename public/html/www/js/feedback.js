/*
 * Форма обратной связи
 * Требует:
 *   jquery.hints.js
 *   modal.js
 */

var feedback = (function () {
	var SETTINGS = {
		formSelector: '#feedback',
		inputSelectors: {
			text: '#f-body',
			name: '#f-name',
			phone: '#f-phone',
			time: '#f-time',
			email: '#f-email'
		},
		hintLabelSelector: '.b-hint-label',
		hints: {
			name: 'Имя, фамилия',
			phone: 'Телефон',
			time: 'Удобное время для звонка',
			email: 'Email'
		},
		submitSelector: '#send-feedback',
		disabledButtonClass: 'b-button-disabled',
		messageSelector: '#message',
		hideFromMessageSelector: '#message-hide-feedback',
		timePartSelector: '.part',
		cookie: {
			expires: 365,
			path: '/'
		}
	};
	
	var _form, _inputs, _timeouts, _submit, _submitButton, _message;
	
	function initForm(){
		var textFromCookie = $.cookie('text'),
			nameFromCookie = $.cookie('name'),
			phoneFromCookie = $.cookie('phone'),
			timeFromCookie = $.cookie('time'),
			emailFromCookie = $.cookie('email');
			
		disableSubmit();
		
		if( textFromCookie ){
			_inputs.text.val(textFromCookie);
		}
		if( nameFromCookie ){
			_inputs.name.val(nameFromCookie);
		}
		if( phoneFromCookie ){
			_inputs.phone.val(phoneFromCookie);
		}
		if( timeFromCookie ){
			_inputs.time.val(timeFromCookie);
		}
		if( emailFromCookie ){
			_inputs.email.val(emailFromCookie);
		}
	}
	
	function assignEvents(){
		// Валидация формы и сохранение полей в куки
		_inputs.text.keyup(function(){
			validateForm();
			
			clearTimeout(_timeouts.text);
			_timeouts.text = setTimeout(function(){
				$.cookie('text', _inputs.text.val(), SETTINGS.cookie);
			}, 1000);
		
		}).blur(validateForm);
		
		_inputs.name.keyup(function(){
			validateForm();
			
			clearTimeout(_timeouts.name);
			_timeouts.name = setTimeout(function(){
				if( _inputs.name.val() != SETTINGS.hints.name ){
					$.cookie('name', _inputs.name.val(), SETTINGS.cookie);
				}
			}, 1000);
		
		}).blur(validateForm);
		
		_inputs.phone.keyup(function(){
			validateForm();
			
			clearTimeout(_timeouts.phone);
			_timeouts.phone = setTimeout(function(){
				if( _inputs.phone.val() != SETTINGS.hints.phone ){
					$.cookie('phone', _inputs.phone.val(), SETTINGS.cookie);
				}
			}, 1000);
		
		}).blur(validateForm);
		
		_inputs.time.keyup(function(){
			clearTimeout(_timeouts.time);
			_timeouts.time = setTimeout(function(){
				if( _inputs.time.val() != SETTINGS.hints.time ){
					$.cookie('time', _inputs.time.val(), SETTINGS.cookie);
				}
			}, 1000);
		});
		
		_inputs.email.keyup(function(){
			validateForm();
			
			clearTimeout(_timeouts.email);
			_timeouts.email = setTimeout(function(){
				if( _inputs.email.val() != SETTINGS.hints.email ){
					$.cookie('email', _inputs.email.val(), SETTINGS.cookie);
				}
			}, 1000);
		
		}).blur(validateForm).keyup();
		
		// Отправка формы
		_form.submit(function(event){
			if( _form.data('enabled') ){
				var method = _form.attr('method'),
					action = _form.attr('action'),
					serializedData = serializeData(_form.serializeArray());
				
				_form.data('enabled', false);
				disableSubmit();
				
				$.ajax({
					type: method,
					url: action,
					data: serializedData,
					success: function(response){
						if( _inputs.time.val() == '' || _inputs.time.val() == SETTINGS.hints.time ){
							$(SETTINGS.timePartSelector, _message).text('ближайшее');
						}
						
						_form.hide();
						_message.show();
						
						_inputs.text.val('');
						$.cookie('text', null, SETTINGS.cookie);
						
						setTimeout(modal.hide, 5000);
					}
				});
			}
			
			event.preventDefault();
		});
		
		// Кнопка Закрыть окно
		$(SETTINGS.hideFromMessageSelector).click(function(event){
			modal.hide();
			event.preventDefault();
		});
	}
	
	function enableHints(){
		$(SETTINGS.hintLabelSelector).hints();
	}
	
	function validateForm(){
		var emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		
		if( _inputs.text.val() != '' && ((_inputs.phone.val() != '' && _inputs.phone.val() != SETTINGS.hints.phone) || emailRegexp.test(_inputs.email.val())) ){
			enableSubmit();
		}
		else {
			disableSubmit();
		}
	}
	
	function disableSubmit(){
		_submit.addClass(SETTINGS.disabledButtonClass);
		_submitButton.attr('disabled', 'disabled');
	}
	
	function enableSubmit(){
		_submit.removeClass(SETTINGS.disabledButtonClass);
		_submitButton.removeAttr('disabled');
	}
	
	function serializeData(data){
		return $.map(data, function(element, index){
			switch( element.name ){
				case 'name':
					if( element.value == SETTINGS.hints.name ){
						element.value = '';
					}
					return element;
					break;
				case 'phone':
					if( element.value == SETTINGS.hints.phone ){
						element.value = '';
					}
					return element;
					break;
				case 'time':
					if( element.value == SETTINGS.hints.time ){
						element.value = '';
					}
					return element;
					break;
				case 'email':
					if( element.value == SETTINGS.hints.email ){
						element.value = '';
					}
					return element;
					break;
				default:
					return element;
					break;
			}
		});
	}
	
	return {
		init: function(userSettings){
			$.extend(SETTINGS, userSettings);
			
			_form = $(SETTINGS.formSelector);
			_submit = $(SETTINGS.submitSelector);
			_submitButton = $('input', _submit);
			_message = $(SETTINGS.messageSelector);
			
			_inputs = {
				text: $(SETTINGS.inputSelectors.text),
				name: $(SETTINGS.inputSelectors.name),
				phone: $(SETTINGS.inputSelectors.phone),
				time: $(SETTINGS.inputSelectors.time),
				email: $(SETTINGS.inputSelectors.email)
			};
			
			_timeouts = {
				text: 0,
				name: 0,
				phone: 0,
				time: 0,
				email: 0
			}
			
			_form.data('enabled', true);
			
			initForm();
			assignEvents();
			enableHints();
		}
	};
})();