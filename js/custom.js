(function($) {

    "use strict";

    // COLOR MODE
    $('.color-mode').click(function() {
        $('.color-mode-icon').toggleClass('active')
        $('body').toggleClass('dark-mode')
    })

    // HEADER
    $(".navbar").headroom();

    // PROJECT CAROUSEL
    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        nav: true
    });

    // SMOOTHSCROLL
    $(function() {
        $('.nav-link, .custom-btn-link').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 49
            }, 1000);
            event.preventDefault();
        });
    });

    // TOOLTIP
    $('.social-links a').tooltip();

    // Proposal buttons: show winner/confetti on Yes, gentle message on No
    $('#btn-yes').on('click', function() {
        console.log('btn-yes clicked');
        try {
            var message = 'YES I WILL BE YOUR GIRLFRIEND test ready to be sent';
            var $b = $('#winner-banner');
            // Prefer Web Share API on mobile — lets user choose Snapchat and prefill the text
            if (navigator.share) {
                navigator.share({
                    text: message
                }).then(function() {
                    if ($b.length) {
                        $b.find('.winner-text').text('She said YES!');
                        $b.addClass('show');
                        spawnConfetti(80);
                        $('#btn-yes, #btn-no').prop('disabled', true);
                        setTimeout(function() {
                            $b.removeClass('show');
                            $('#btn-yes, #btn-no').prop('disabled', false);
                        }, 6000);
                    }
                }).catch(function(err) {
                    // share failed or was cancelled — fallback to opening Snapchat thread
                    console.error('navigator.share failed:', err);
                    if ($b.length) {
                        $b.find('.winner-text').text('She said YES!');
                        $b.addClass('show');
                        spawnConfetti(80);
                        $('#btn-yes, #btn-no').prop('disabled', true);
                        setTimeout(function() {
                            window.location = 'snapchat://';
                            setTimeout(function() { window.location = 'https://snapchat.com/t/2yyvwuIQ'; }, 900);
                        }, 900);
                        setTimeout(function() {
                            $b.removeClass('show');
                            $('#btn-yes, #btn-no').prop('disabled', false);
                        }, 6000);
                    } else {
                        window.location = 'https://snapchat.com/t/2yyvwuIQ';
                    }
                });
            } else {
                // No Web Share support: open Snapchat (app or web thread) so user can paste/send manually
                if ($b.length) {
                    $b.find('.winner-text').text('She said YES!');
                    $b.addClass('show');
                    spawnConfetti(80);
                    $('#btn-yes, #btn-no').prop('disabled', true);
                    setTimeout(function() {
                        window.location = 'snapchat://';
                        setTimeout(function() { window.location = 'https://snapchat.com/t/2yyvwuIQ'; }, 900);
                    }, 900);
                    setTimeout(function() {
                        $b.removeClass('show');
                        $('#btn-yes, #btn-no').prop('disabled', false);
                    }, 6000);
                } else {
                    window.location = 'https://snapchat.com/t/2yyvwuIQ';
                }
            }
        } catch (e) {
            console.error('Error in #btn-yes handler:', e);
            alert('An error occurred: ' + (e && e.message ? e.message : e));
        }
    });

    $('#btn-no').on('click', function() {
        var $b = $('#winner-banner');
        if ($b.length) {
            $b.find('.winner-text').text("Oh... I still Love You Thoug😔.");
            $b.addClass('show');
            $('#btn-yes, #btn-no').prop('disabled', true);
            setTimeout(function() {
                $b.removeClass('show');
                $('#btn-yes, #btn-no').prop('disabled', false);
            }, 3500);
        }
    });

    // WINNER banner + confetti on page load
    function spawnConfetti(count) {
        var colors = ['#ff3b3b', '#ffb54d', '#ffd166', '#6ee7b7', '#7cc6ff', '#c77cff'];
        for (var i = 0; i < count; i++) {
            (function() {
                var left = (Math.random() * 100).toFixed(2) + '%';
                var el = $('<div class="confetti"></div>');
                var color = colors[Math.floor(Math.random() * colors.length)];
                var duration = (2 + Math.random() * 3).toFixed(2) + 's';
                var delay = (Math.random() * 0.6).toFixed(2) + 's';
                el.css({
                    left: left,
                    background: color,
                    animation: 'confettiFall ' + duration + ' linear',
                    'animation-delay': delay
                });
                $('body').append(el);
                // remove after animation
                setTimeout(function() { el.remove(); }, (parseFloat(duration) + parseFloat(delay) + 0.2) * 1000);
            })();
        }
    }

    $(window).on('load', function() {
        // show banner
        setTimeout(function() {
            var $b = $('#winner-banner');
            if ($b.length) {
                $b.addClass('show');
                // hide after 5s
                setTimeout(function() { $b.removeClass('show'); }, 5000);
            }
            // spawn confetti
            spawnConfetti(40);
        }, 400);
    });

})(jQuery);
