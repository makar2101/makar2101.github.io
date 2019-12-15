//Передача інформації про кнопку в модальному вікні
$(function() {
    $('button.btn-lg').click(function() {
        var parent = $(this).attr('data-parent');
        var modal = $(this).attr('data-target')
        $(modal).find('input[name=target]').val(parent);
    })
    $("ul li a, a").click(function () {
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top;
        $("body,html").animate({scrollTop: destination }, 1400);
    });
    
    $(window).scroll(function() {
        $('.macro_text').each(function(){
            var imagePos = $(this).offset().top;
 
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+650) {
                $(this).addClass("fadeInDown");
         }
        });
    });

    $('.sl').slick({
        dots: true,
    });
});

//Валідація та відправка форми

$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

    // Функція валідації та виведення повідомлень
    function valEl(el) {

        el.validate({
            rules: {
                tel: {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                tel: {
                    required: 'Поле потрібно заповнити',
                    regex: 'Телефон може містити символи + - ()'
                },
                name: {
                    required: 'Поле потрібно заповнити',
                },
                email: {
                    required: 'Поле потрібно заповнити',
                    email: 'Не вірний формат E-mail'
                }
            },

            // Починаємо перевірку id="" форми
            submitHandler: function(form) {
                $('#loader').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    // Якщо у формы id="goToNewPage" - робимо:
                    case 'goToNewPage':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function(response) {
                                //посилання на сторінку "дякуємо" - редирект
                                location.href = 'http://www.versite.xyz';
                                //надсилання цілей в Я.Метрику та Google Analytics
                                ga('send', 'event', 'masterklass7', 'register');
                                yaCounter27714603.reachGoal('lm17lead');
                            });
                        break;
                    // Якщо у форми id="popupResult" - робимо:
                    case 'popupResult':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function(response) {
                                setTimeout(function() {
                                    $('#loader').fadeOut();
                                }, 800);
                                setTimeout(function() {
                                    $('#overlay').fadeIn();
                                    $form.trigger('reset');
                                    //рядки для відслідковування цілей в Я.Метриці та Google Analytics
                                }, 1100);
                                $('#overlay').on('click', function(e) {
                                    $(this).fadeOut();
                                });

                            });
                        break;
                }
                return false;
            }
        })
    }

    // Запускаємо механізм валідації форм, якщо у них є клас .js-form
    $('.js-form').each(function() {
        valEl($(this));
    });
    
});