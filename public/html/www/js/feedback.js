var feedback = (function () {
    var SETTINGS = {
        modalSelector: '.l-modal',
        modalClassForHtml: 'l-theater',
        showSelector: '#show-feedback',
        hideSelector: '#hide-feedback',
        hideFromMessageSelector: '#message-hide-feedback',
        formSelector: '#feedback',
        hintLabelSelector: '.b-hint-label',
        textInputSelector: '#f-body',
        nameInputSelector: '#f-name',
        phoneInputSelector: '#f-phone',
        timeInputSelector: '#f-time',
        emailInputSelector: '#f-email',
        timePartSelector: '.part',
        nameHint: 'Имя, фамилия',
        phoneHint: 'Телефон',
        timeHint: 'Удобное время для звонка',
        emailHint: 'Email',
        submitSelector: '#send-feedback',
        messageSelector: '#message',
        disabledButtonClass: 'b-button-disabled',
        cookie: {
            expires: 365,
            path: '/'
        }
    };

    var _html, _body, _modal, _form,
        _textInput, _nameInput, phoneInput, _timeInput, emailInput,
        _textTimeout, _nameTimeout, _phoneTimeout, _timeTimeout, _emailTimeout, _hideTimeout,
        _submit, _submitButton, _message;

    function initForm(){
        var textFromCookie = $.cookie('text'),
            nameFromCookie = $.cookie('name'),
            phoneFromCookie = $.cookie('phone'),
            timeFromCookie = $.cookie('time'),
            emailFromCookie = $.cookie('email');

        disableSubmit();

        if( textFromCookie ){
            _textInput.val(textFromCookie);
        }
        if( nameFromCookie ){
            _nameInput.val(nameFromCookie);
        }
        if( phoneFromCookie ){
            _phoneInput.val(phoneFromCookie);
        }
        if( timeFromCookie ){
            _timeInput.val(timeFromCookie);
        }
        if( emailFromCookie ){
            _emailInput.val(emailFromCookie);
        }
    }

    function assignEvents(){

        // Показ формы
        $(SETTINGS.showSelector).click(function(event){
            clearTimeout(_hideTimeout);

            _form.show();
            _message.hide();

            showModal();
            event.preventDefault();
        });

        // Скрытие формы
        $(SETTINGS.hideSelector).click(function(event){
            hideModal();
            event.preventDefault();
        });

        $(SETTINGS.hideFromMessageSelector).click(function(event){
            hideModal();
            event.preventDefault();
        });

        // Валидация формы и сохранение полей в куки
        _textInput.keyup(function(){
            validateForm();

            clearTimeout(_textTimeout);
            _textTimeout = setTimeout(function(){
                $.cookie('text', _textInput.val(), SETTINGS.cookie);
            }, 1000);

        }).blur(validateForm);

        _nameInput.keyup(function(){
            validateForm();

            clearTimeout(_nameTimeout);
            _nameTimeout = setTimeout(function(){
                if( _nameInput.val() != SETTINGS.nameHint ){
                    $.cookie('name', _nameInput.val(), SETTINGS.cookie);
                }
            }, 1000);

        }).blur(validateForm);

        _phoneInput.keyup(function(){
            validateForm();

            clearTimeout(_phoneTimeout);
            _phoneTimeout = setTimeout(function(){
                if( _phoneInput.val() != SETTINGS.phoneHint ){
                    $.cookie('phone', _phoneInput.val(), SETTINGS.cookie);
                }
            }, 1000);

        }).blur(validateForm);

        _timeInput.keyup(function(){
            clearTimeout(_timeTimeout);
            _timeTimeout = setTimeout(function(){
                if( _timeInput.val() != SETTINGS.timeHint ){
                    $.cookie('time', _timeInput.val(), SETTINGS.cookie);
                }
            }, 1000);
        });

        _emailInput.keyup(function(){
            validateForm();

            clearTimeout(_emailTimeout);
            _emailTimeout = setTimeout(function(){
                if( _emailInput.val() != SETTINGS.emailHint ){
                    $.cookie('email', _emailInput.val(), SETTINGS.cookie);
                }
            }, 1000);

        }).blur(validateForm).keyup();

        // Отправка формы
        $(_form).ajaxForm({
            type: 'post',
            success: function() {
                // Оптравляем данные на сервер, а затем

                if( _timeInput.val() == '' || _timeInput.val() == SETTINGS.timeHint ){
                    $(SETTINGS.timePartSelector, _message).text('ближайшее');
                }

                _form.hide();
                _message.show();

                _textInput.val('');
                $.cookie('text', null, SETTINGS.cookie);

                _hideTimeout = setTimeout(hideModal, 5000);

    //            event.preventDefault();
            }
        });
    }

    function enableHints(){
        $(SETTINGS.hintLabelSelector).hints();
    }

    function showModal(){
        if( $.browser.mozilla ){
            _body.addClass(SETTINGS.modalClassForHtml);
        }
        else{
            if( $.browser.msie && $.browser.version == '6.0' ){
                _html.scrollTop(0);
            }
            _html.addClass(SETTINGS.modalClassForHtml);
        }

        _modal.show();
    }

    function hideModal(){
        if( $.browser.mozilla ){
            _body.removeClass(SETTINGS.modalClassForHtml);
        }
        else{
            _html.removeClass(SETTINGS.modalClassForHtml);
        }

        _modal.hide();
    }

    function validateForm(){
        var emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if( _textInput.val() != '' && (_nameInput.val() != '' && _nameInput.val() != SETTINGS.nameHint) && (_phoneInput.val() != '' && _phoneInput.val() != SETTINGS.phoneHint) && emailRegexp.test(_emailInput.val()) ){
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

    return {
        init: function(userSettings){
            $.extend(SETTINGS, userSettings);

            _html = $(document.documentElement);
            _body = $(document.body);
            _modal = $(SETTINGS.modalSelector);
            _form = $(SETTINGS.formSelector);

            _textInput = $(SETTINGS.textInputSelector);
            _nameInput = $(SETTINGS.nameInputSelector);
            _phoneInput = $(SETTINGS.phoneInputSelector);
            _timeInput = $(SETTINGS.timeInputSelector);
            _emailInput = $(SETTINGS.emailInputSelector);

            _textTimeout = 0;
            _nameTimeout = 0;
            _phoneTimeout = 0;
            _timeTimeout = 0;
            _emailTimeout = 0;
            _hideTimeout = 0;

            _submit = $(SETTINGS.submitSelector);
            _submitButton = $('input', _submit);
            _message = $(SETTINGS.messageSelector);

            initForm();
            assignEvents();
            enableHints();
        }
    };
})();