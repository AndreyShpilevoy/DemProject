/// <reference path="../TypingsForTypeScript/tsd.d.ts" />

window.onload = () => {
    scrollToTop();
};

function scrollToTop()
{
    
}

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



class User {

    id: number;
    name: string;
    age: number;
}

class UserInfo {
    constructor(public user: User) { }
    getInfo() {
        return "<h1>" + user.name + "</h1>" + "<span> Age:" + user.age;
    }
};

var user = new User();
user.id = 1;
user.name = "TestUser";
user.age = 18;

var userInfo = new UserInfo(user);



window.onload = () => {
    document.body.innerHTML = userInfo.getInfo();
};