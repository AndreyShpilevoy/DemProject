//go to post
$(document).ready(function () {
    var postId = getUrlParameter("postId");
    if (postId) {
        $('html, body').animate({ scrollTop: $('#postId' + postId).offset().top }, 500);
    }
});
//end


//go to top
$(document).ready(function () {
    // Global back to top code
    if ($('#back-to-top').length) {
        var isVisible = false;
        $(window).scroll(function () {
            if ($(this).scrollTop() > 150) {
                if (isVisible) return;
                isVisible = true;
                $('#back-to-top').stop(true, true).fadeIn();
            }
            else {
                if (!isVisible) return;
                isVisible = false;
                $('#back-to-top').stop(true, true).fadeOut();
            }
        });
        $(window).scroll();

        var isTower = false;
        $(window).resize(function () {
            if ($(document).width() - $('#wrap').width() > 120) {
                if (isTower) return;
                isTower = true;
                $('#back-to-top').addClass('tower');
            }
            else {
                if (!isTower) return;
                isTower = false;
                $('#back-to-top').removeClass('tower');
            }
        });
        $(window).resize();

        $('#back-to-top').click(function () {
            goToTop();
            return false;
        });
    }
});
//end

function goToTop() {
    $('html, body').animate({ scrollTop: 0 }, 500);
}