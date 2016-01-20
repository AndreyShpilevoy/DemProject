/// <reference path="../TypingsForTypeScript/tsd.d.ts" />

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