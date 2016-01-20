/// <reference path="../TypingsForTypeScript/tsd.d.ts" />
var User = (function () {
    function User() {
    }
    return User;
})();
var UserInfo = (function () {
    function UserInfo(user) {
        this.user = user;
    }
    UserInfo.prototype.getInfo = function () {
        return "<h1>" + user.name + "</h1>" + "<span> Age:" + user.age;
    };
    return UserInfo;
})();
;
var user = new User();
user.id = 1;
user.name = "TestUser";
user.age = 18;
var userInfo = new UserInfo(user);
window.onload = function () {
    document.body.innerHTML = userInfo.getInfo();
};
