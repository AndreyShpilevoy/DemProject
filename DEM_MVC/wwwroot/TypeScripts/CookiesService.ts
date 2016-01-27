/// <reference path="../TypingsForTypeScript/tsd.d.ts" />

class CookiesService {

    // return cookie by name or undefined
    getCookie(name: string) :string {
        name = name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1');

        var matches = document.cookie.match(new RegExp(
            `(?:^|; )${name}=([^;]*)`
        ));

        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    // set cookie with the name and value
    // options - object with cookie properties (expires, path, domain, secure)
    setCookie(name: string, value: string, options: Dictionary<string, any>) {
        options = options || new Dictionary<string, any>();

        var expires = options.getValueByKey("expires");

        if (typeof expires == "number") {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = d;
        }

        if (expires && expires.toUTCString) {
            options.setValueByKey("expires", expires.toUTCString());
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var i = 0; i < options.size(); i++) {
            var keyValue = options.getByIndex(i);
            if (keyValue) {
                updatedCookie += `; ${keyValue["0"]}`;
                updatedCookie += `=${keyValue["1"]}`;
            }
        }

        document.cookie = updatedCookie;
    }

    // delete cookie by name
    deleteCookie(name: string) {
        var optionsDictionary = new Dictionary<string, any>();
        optionsDictionary.add("expires", -1);
        this.setCookie(name, "", optionsDictionary);
    }
}