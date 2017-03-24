jQuery(document).ready(function($) {
	  "use strict";

	$(".footer-column .social, #thank-you .social").hover(
		function() {
			
            TweenMax.to($(this).find('img'), 0.25, {autoAlpha:0});
			TweenMax.to($(this).find('.hover'), 0.25, {autoAlpha:1});
			TweenMax.to($(this).find('p'), 0.25, {color:'#6fb936'});
		}, function() {
			TweenMax.to($(this).find('img'), 0.5, {autoAlpha:1});
            TweenMax.to($(this).find('.hover'), 0.5, {autoAlpha:0});
			TweenMax.to($(this).find('p'), 0.25, {color:'#989898'});
		}
	);


    $("#faq-sb-light .search-icon").click(function () {
        window.location = '/faqs/#/Search/'+encodeURI($('#faq-sb-light input').val());
    });
    $("#faq-sb-dark .search-icon").click(function () {
        window.location = '/faqs/#/Search/'+encodeURI($('#faq-sb-dark input').val());
    });


    var forumSearchUrl = window.forumSearchUrl || "null";
    $("#foot-sb .icon").click(function() {
        if ($('#foot-sb input').val() !== $('#foot-sb input').attr('default') || '') {
            if (forumSearchUrl !== 'null') {
                window.location = forumSearchUrl+"&search_term="+encodeURI($('#foot-sb input').val());
            } else {
                window.location = "/search-results?%s%="+$('#foot-sb input').val();
            }
        } else {
            $('#foot-sb').addClass("invalid");
        }
    });

    $('#foot-sb input').keypress(function (e) {
        if (e.which ===13) {
            $("#foot-sb .icon").click();
        }
    });
    $('#foot-sb input').val('Search...');
    $('#foot-sb input').attr('default', 'Search...');
    $('#foot-sb input').focus(function() {
        if ($(this).val() === $(this).attr('default')) {$(this).val("");}
        $(this).removeClass("invalid");
    });
    $('#foot-sb input').blur( function() {
        if ($(this).val() === "") {$(this).val($(this).attr('default'));}
    });




    $('.newsletter-box .signup').val('Your Email Address');
    $('.newsletter-box .signup').attr('default', 'Your Email Address');
    $('.newsletter-box .signup').focus(function() {
        if ($(this).val() === $(this).attr('default')) {$(this).val("");}
        $(this).removeClass("invalid");
        $(this).parent().removeClass("invalid");
    });
    $('.newsletter-box .signup').blur( function() {
        if ($(this).val() === "") {$(this).val($(this).attr('default'));}
    });
    $('.newsletter-box .signup').keypress(function (e) {
        if (e.which === 13) {
            validateNewsletterSignUp();
        }
    });
    $('.newsletter-box .submit-button').click(function () {
        validateNewsletterSignUp();
    });

    // /forums/index.php?app=newsletter&module=subscribe&email=email_goes_here
    function validateNewsletterSignUp() {
        var isValid = 1;
        var inputField = $('.newsletter-box .signup');

        if (inputField.val() === inputField.attr('default') || inputField.val() === "") {
            inputField.addClass("invalid");
            inputField.parent().addClass("invalid");
            isValid = 0;
        }
        if (isValid === 1) {
            var SendNewsletter = '/forums/index.php';
            $.ajax({
                type: 'POST',
                url: SendNewsletter,
                data: {
                    'app':'newsletter',
                    'module':'subscribe',
                    'email':inputField.val()
                }
            });
            showOverlay($('#thank-you'));
            ga('send', 'pageview', {'page': '/newsletter-signup/thank-you','title': 'Thank you for your Submission'});
            inputField.val(inputField.attr('default'));
        }
        return isValid;
    }

});
