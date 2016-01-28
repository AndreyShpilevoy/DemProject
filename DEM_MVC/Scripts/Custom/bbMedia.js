// BB [media] v1.68 [2015-07-01] (C) 2014 Evgeny Vrublevsky, http://phpbbex.com/
// Licensed under CC BY-NC-ND, http://creativecommons.org/licenses/by-nc-nd/3.0/

(function (window, document, undefined) {
    var media = "media";
    var audio = "audio";
    var video = "video";
    if (window.bbmediajs !== undefined) {
        return;
    }
    window.bbmediajs = true;
    var l = function (t, e, s) {
        if (data = t.match(new RegExp("[?&]" + e + "=([^?&#]*)", ""))) {
            return decodeURIComponent(data[1]);
        } else {
            return (s === undefined) ? null : s;
        }
    };
    var n = function (t, v, e, s) {
        s = jQuery.extend({
            frameborder: "0"
        }, s);
        var u = "<iframe style=\"vertical-align: bottom; width: " + v + "px; height: " + e + "px;\" width=\"" + v + "\" height=\"" + e + "\" src=\"" + t + "\" webkitallowfullscreen mozallowfullscreen allowfullscreen";
        jQuery.each(s, function (w, x) {
            u += " " + w + "=\"" + x + "\"";
        });
        return u + "></iframe>";
    };
    var h = function (u, w, e, t) {
        t = jQuery.extend({
            allowscriptaccess: "never",
            allowfullscreen: "true",
            ignorewheel: false
        }, t);
        var v = " width=\"" + w + "\" height=\"" + e + "\"" + (t.ignorewheel ? " ignorewheel=\"1\"" : "");
        var x = "<object style=\"vertical-align: bottom;\" classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\"" + v + "><param name=\"movie\" value=\"" + u + "\" />";
        var s = "<embed style=\"vertical-align: bottom;\" type=\"application/x-shockwave-flash\"" + v + " src=\"" + u + "\"";
        delete t.ignorewheel;
        jQuery.each(t, function (y, z) {
            x += "<param name=\"" + y + "\" value=\"" + z + "\" />";
            s += " " + y + "=\"" + z + "\"";
        });
        return x + s + "></embed></object>";
    };
    var q = function (x, e, u, V, K) {
        var B = (V == media);
        var s = (V == audio);
        var O = (V == video);
        var ad = (s || B);
        var N = (O || B);
        var v = false;
        var H = false;
        if (!e && !u) {
            v = true;
            H = true;
            e = 640;
            u = 360;
        } else {
            if (!e) {
                v = true;
                e = parseInt(u * (16 / 9));
            } else {
                if (!u) {
                    H = true;
                    u = parseInt(e * (9 / 16));
                }
            }
        }
        var y = K ? "https" : "http";
        var ac;
        x = jQuery.trim(x);
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/(?:playlist\?(?:.*&)?list=|embed\/videoseries\?(?:.*&)?list=|p\/|view_play_list\?(?:.*&)?p=)([-_\w\d]+)/i))) {
            if (H) {
                u += 30;
            } else {
                if (v) {
                    e += 53;
                }
            }
            return n(y + "://www.youtube.com/embed/videoseries?list=" + ac[1], e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?(?:youtu\.be\/|(?:m\.)?youtube(?:-nocookie)?\.com\/(?:(?:watch|movie)\?(?:.*&)?v=|embed\/|v\/|attribution_link.*watch%3Fv%3D))([-_\w\d]+)(?:.*(?:[&?]start|[?&#]t)=(?:(\d+)h)?(?:(\d+)m)?(\d+)?)?/i))) {
            if (H) {
                u += 30;
            } else {
                if (v) {
                    e += 53;
                }
            }
            var U = [];
            var J = parseInt(ac[2] ? ac[2] : 0) * 3600 + parseInt(ac[3] ? ac[3] : 0) * 60 + parseInt(ac[4] ? ac[4] : 0);
            if (J) {
                U.push("start=" + J);
            }
            if (l(x, "rel") === "0") {
                U.push("rel=0");
            }
            U = U.join("&");
            return n(y + "://www.youtube.com/embed/" + ac[1] + (U ? "?" + U : ""), e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?(?:vimeo\.com|player\.vimeo\.com\/video)\/(\d+)/i))) {
            return n(y + "://player.vimeo.com/video/" + ac[1], e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/video_ext\.php\?oid=([-_\w\d]+)&id=([-_\w\d]+)&hash=([-_\w\d]+)(&sd|&hd=1|&hd=2|)/i))) {
            return n(y + "://vk.com/video_ext.php?oid=" + ac[1] + "&id=" + ac[2] + "&hash=" + ac[3] + ac[4], e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?(?:rutube\.ru\/(?:video\/|play\/)?(?:embed\/)?|video\.rutube\.ru\/)([\da-f]+)/i))) {
            return n(y + "://rutube.ru/play/embed/" + ac[1], e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?(?:smotri\.com\/video\/view\/\?(?:.*&)?id=|pics\.smotri\.com\/player\.swf\?(?:.*&)?file=)([\w\d]+)/i))) {
            return h("http://pics.smotri.com/player.swf?file=" + ac[1] + "&bufferTime=3&autoStart=false&str_lang=rus", e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:video\.qip\.ru\/video\/view\/\?(?:.*&)?id=|pics\.video\.qip\.ru\/player\.swf\?(?:.*&)?file=)([\w\d]+)/i))) {
            return h("http://pics.video.qip.ru/player.swf?file=" + ac[1] + "&bufferTime=3&autoStart=false&str_lang=rus", e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/photo\.tvigle\.ru\/resource\/rf\/swf\/([\/\d\w]*)\.swf/i))) {
            return h("http://photo.tvigle.ru/resource/rf/swf/" + ac[1] + ".swf", e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/video\.bigmir\.net\/(?:show|player)\/(\d+)/i))) {
            return n("http://video.bigmir.net/player/" + ac[1] + "/", e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:my\.mail\.ru(?:\/video)?(?:.*#video=)?|video\.mail\.ru|(?:api\.video|videoapi\.my)\.mail\.ru\/videos\/embed)\/([^\/]+)\/([^\/]+)\/(?:video\/)?([-_\d\w]+)\/([-_\d\w]+)/i))) {
            return n("http://videoapi.my.mail.ru/videos/embed/" + ac[1] + "/" + ac[2] + "/" + ac[3] + "/" + ac[4] + ".html", e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/video\.sibnet\.ru\/(?:(?:[\w\d\/]+)\/video|shell\.swf\?videoid=)(\d+)/i))) {
            return h("http://video.sibnet.ru/shell.swf?videoid=" + ac[1], e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/video\.online\.ua\/(?:embed\/)?([\d\w]+)/i))) {
            return n("http://video.online.ua/embed/" + ac[1] + "/", e, u, {
                scrolling: "no"
            });
        }
        if (N && (ac = x.match(/^https?:\/\/(?:(?:www\.)intv\.ru\/v\/|flash\.intv\.ru\/uplay\/)([\d\w]+)/i))) {
            return h("http://flash.intv.ru/uplay/" + ac[1], e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?metacafe\.com\/(?:watch|fplayer)\/(\d+)\/([^\/.]+)/i))) {
            return h("http://www.metacafe.com/fplayer/" + ac[1] + "/" + ac[2] + ".swf", e, u, {
                flashvars: "playerVars=autoPlay=no"
            });
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?lovi\.tv\/video\/(?:sharer\.php\?Code=)?([\d\w]+)/i))) {
            return n("http://lovi.tv/video/sharer.php?Code=" + ac[1] + "&Width=" + e + "&Height=" + u, e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:[-.\w\d]+?\.)?facebook\.com\/(?:(?:video\/video|video|photo)\.php\?(?:.*&)?v=|video\/embed\?(?:.*&)?video_id=|v\/|[-_.\w\d]+\/videos\/)([-_\w\d]+)/i))) {
            return n(y + "://www.facebook.com/video/embed?video_id=" + ac[1], e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?archive\.org\/(?:details|embed)\/([-_.\/\w\d]+)/i))) {
            return n(y + "://archive.org/embed/" + ac[1], e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?clipfish\.de\/(?:(?:.*?\/)?video\/|embed_(?:image|video)\/\?(?:.*&)?vid=)(\d+)/i))) {
            return n("http://www.clipfish.de/embed_video/?vid=" + ac[1] + "&as=0&butcolor=000000", e, u, {
                scrolling: "no",
                marginheight: "0",
                marginwidth: "0"
            });
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?myvideo\.de\/(?:movie|embed|watch)\/([-_\d\w]+)/i))) {
            return n(y + "://www.myvideo.de/embed/" + ac[1], e, u, {
                scrolling: "no"
            });
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?veevr\.com\/(?:videos|embed)\/([-_\d\w]+)/i))) {
            return n("http://veevr.com/embed/" + ac[1], e, u, {
                scrolling: "no"
            });
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?hulu\.com\/embed\/([-_\d\w]+(?:\/\d+){0,2})/i))) {
            return h("http://www.hulu.com/embed/" + ac[1], e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?megogo\.net\/.*view\/(\d+)/i))) {
            return n(y + "://megogo.net/e/" + ac[1], e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?dailymotion\.com\/(?:video|swf|embed\/video)\/([0-9a-z]+)/i))) {
            return n(y + "://www.dailymotion.com/embed/video/" + ac[1], e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?own3d\.tv\/(?:.*\/)?(?:live|liveembed|l)\/([0-9]+)/i))) {
            return n("http://www.own3d.tv/liveembed/" + ac[1], e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?own3d\.tv\/(?:.*\/)?(?:video|stream|v)\/([0-9]+)/i))) {
            return h("http://www.own3d.tv/stream/" + ac[1], e, u, {
                wmode: "transparent"
            });
        }
        if (N && (ac = x.match(/^https?:\/\/(?:[\w\d]+\.)?ign\.com(\/videos\/\d+\/\d+\/\d+\/[-_\w\d]+)/i))) {
            return n("http://widgets.ign.com/video/embed/content.html?url=" + ac[1], e, u, {
                scrolling: "no"
            });
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?ustream\.tv\/(?:channel\/|embed\/)?((?:recorded\/)?[0-9]+)/i))) {
            return n(y + "://www.ustream.tv/embed/" + ac[1] + "?v=3&wmode=direct", e, u, {
                scrolling: "no"
            });
        }
        if (N && (ac = x.match(/^https?:\/\/((?:\w+\.)?twitch\.tv)\/([-_\w\d]+)(?:\/([bc])\/(\d+))?/i))) {
            if (ac[3]) {
                return h("http://www.twitch.tv/widgets/archive_embed_player.swf", e, u, {
                    flashvars: (ac[3].toLowerCase() == "b" ? "archive_id=" : "chapter_id=") + ac[4] + "&channel=" + ac[2] + "&auto_play=false"
                });
            } else {
                return h("http://www.twitch.tv/widgets/live_embed_player.swf", e, u, {
                    flashvars: "hostname=" + ac[1] + "&channel=" + ac[2] + "&auto_play=false",
                    allowscriptaccess: "always"
                });
            }
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.|embed\.)?ted\.com\/talks\/(?:lang\/([\w]{2})\/)?([-_\w\d]+)\.html/i))) {
            return n("http://embed.ted.com/talks/" + (ac[1] ? ("lang/" + ac[1] + "/") : "") + ac[2] + ".html", e, u, {
                scrolling: "no"
            });
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?coub\.com\/(?:view|embed)\/([-_\w\d]+)/i))) {
            return n(y + "://coub.com/embed/" + ac[1], e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?pinkbike\.com\/(?:video|v)\/(\d+)/i))) {
            return h("http://www.pinkbike.com/v/" + ac[1] + "/", e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?mpora\.com\/videos\/([-_\w\d]+)/i))) {
            return n("http://mpora.com/videos/" + ac[1] + "/embed", e, u);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?vine\.co\/v\/([-_\w\d]+)/i))) {
            var E = Math.min(e, u);
            return n("https://vine.co/v/" + ac[1] + "/embed/simple", E, E);
        }
        if (N && (ac = x.match(/^https?:\/\/(?:www\.)?imdb\.com\/video\/imdb\/([-_\w\d]+)/i))) {
            return n("http://www.imdb.com/video/imdb/" + ac[1] + "/player", 640 + 8 * 2, 480 + 8 * 2, {
                scrolling: "no"
            });
        }
        if (ad && (ac = x.match(/(^https?:\/\/soundcloud\.com\/[-_\w\d]+\/(?:sets\/)?[-_\w\d]+\/?$|https?(?::\/\/|%3A%2F%2F)api\.soundcloud\.com(?:\/|%2F)(?:tracks|playlists)(?:\/|%2F)\d+)/i))) {
            var M = !!ac[0].match(/(\/|%2F)(sets|playlists)(\/|%2F)/i);
            return h("https://player.soundcloud.com/player.swf?show_comments=true&auto_play=false&color=ff7700&url=" + encodeURIComponent(decodeURIComponent(ac[0])), (v ? "100%" : e), M ? 225 : 81);
        }
        if (ad && (ac = x.match(/^https?:\/\/(?:(?:www\.)?(?:prosto)?pleer\.com\/tracks\/|embed\.(?:prosto)?pleer\.com\/track\?(?:.*&)?id=)([\w\d]+)/i))) {
            return h("http://embed.pleer.com/track?id=" + ac[1], (v ? 550 : e), 42);
        }
        if (ad && (ac = x.match(/^https?:\/\/(?:pleer\.com\/list|embed\.pleer\.com\/list\?id=)([\w\d]+)/i))) {
            return h("http://embed.pleer.com/list?id=" + ac[1], (v ? "100%" : e), (v ? 480 : e));
        }
        if (ad && (ac = x.match(/^https?:\/\/(?:www\.)?promodj\.(?:com|ru)\/(?:[-_\w\d]+\/\w+|embed|download)\/(\d+)/i))) {
            return n("http://promodj.com/embed/" + ac[1] + "/big", (v ? "100%" : e), 70);
        }
        if (ad && (ac = x.match(/^https?:\/\/music\.yandex\.(?:ru|by|ua|kz)\/(?:.*#!\/)?(?:track|embed|album\/[^/]+\/track)\/(\d+)/i))) {
            return h("http://music.yandex.ru/embed/" + ac[1] + "/track.swf", (v ? "100%" : e), 48, {
                scale: "noscale",
                flashvars: "bg-color=%23F2F2F2&amp;text-color=%23777777&amp;hover-text-color=%23000000"
            });
        }
        if (ac = x.match(/^https?:\/\/(?:video\.yandex\.(?:ru|by|ua|kz)\/iframe|(?:static|streaming)\.video\.yandex\.(?:ru|by|ua|kz)\/lite)\/([^\/"'<>]+)\/([^\/"'<>]+)/i)) {
            if (B && x.indexOf("bbaudio") != -1) {
                s = true;
            }
            return n(y + "://video.yandex.ru/iframe/" + ac[1] + "/" + ac[2] + "/", (s && v) ? 300 : e, s ? 72 : u);
        }
        if (ac = x.match(/^https?:\/\/(?:www\.)?yapfiles\.ru\/static\/play\.swf\?(?:.*&)?st=([-_\w\d]+)/i)) {
            if (B && x.indexOf("bbvideo") == -1 && (x.indexOf("allowfullscreen") == -1 || x.indexOf("bbaudio") > -1)) {
                s = true;
            }
            return h("http://www.yapfiles.ru/static/play.swf?st=" + ac[1], (s && v) ? 320 : e, (s && H) ? 240 : u);
        }
        if (B && (ac = x.match(/^https?:\/\/(?:www\.)?360cities\.net\/(?:image|embed_iframe)\/([-_\d\w]+)/i))) {
            return n(y + "://www.360cities.net/embed_iframe/" + ac[1], e, u);
        }
        if (B && (ac = x.match(/^https?:\/\/(?:www\.)?dermandar\.com\/p\/([-_\d\w]+)/i))) {
            return h("http://static.dermandar.com/swf/Viewer.swf?v=1.4", e, u, {
                flashvars: "pano=" + ac[1],
                ignorewheel: true
            });
        }
        if (B && (ac = x.match(/^https?:\/\/docs\.google(?:\.com)?\.\w+\/spreadsheet\/(?:pub|ccc)\?key=([-_\w\d]+)/i))) {
            var U = [];
            U.push("key=" + ac[1]);
            if (l(x, "single") === "true" && l(x, "gid") !== null) {
                U.push("single=true&gid=" + l(x, "gid"));
            }
            U.push("output=html&widget=true");
            return n("https://docs.google.com/spreadsheet/pub?" + U.join("&"), v ? "100%" : e, H ? 640 : u);
        }
        if (B && (ac = x.match(/^https?:\/\/docs\.google(?:\.com)?\.\w+\/(document|spreadsheets|forms)\/d\/([-_\w\d]+)/i))) {
            var af;
            switch (ac[1]) {
                case "document":
                    af = "/pub?embedded=true";
                    break;
                case "spreadsheets":
                    var U = [];
                    if (l(x, "single") === "true" && l(x, "gid") !== null) {
                        U.push("single=true&gid=" + l(x, "gid"));
                    }
                    U.push("widget=true&headers=" + (l(x, "headers") === "true" ? "true" : "false"));
                    af = "/pubhtml?" + U.join("&");
                    break;
                case "forms":
                    af = "/viewform?embedded=true";
                    break;
            }
            return n("https://docs.google.com/" + ac[1] + "/d/" + ac[2] + af, v ? "100%" : e, H ? 640 : u);
        }
        if (B && (ac = x.match(/^https?:\/\/(?:maps\.google(?:\.com)?\.\w+\/(?:maps\/?)?|(?:www\.)?google(?:\.com)?\.\w+\/maps\/?)(?:ms\/?)?\?((?:.*&)?(?:ll|spn|sll|sspn|z|msid|q)=.*)$/i))) {
            var U = (x.indexOf("panoid=") == -1) ? (ac[1].replace(/&output=embed/, "") + "&output=embed") : (ac[1].replace(/&(source=|output=sv)embed/g, "") + "&source=embed&output=svembed");
            return n(y + "://maps.google.com/?" + U, v ? 640 : e, H ? 480 : u);
        }
        if (B && (ac = x.match(/^https?:\/\/(?:www\.)?google(?:\.com)?\.\w+\/maps\/embed\?pb=([^&]+)/i))) {
            return n("https://www.google.com/maps/embed?pb=" + ac[1], v ? 640 : e, H ? 480 : u);
        }
        if (B && (ac = x.match(/^https?:\/\/(?:www\.)?google(?:\.com)?\.\w+\/maps\/(?:place\/[^\/]+\/)?@(-?\d+\.\d+),(-?\d+\.\d+),(\d+)([zm])/i))) {
            var z = y + "://maps.google.com/maps?ll=" + ac[1] + "," + ac[2];
            if (ac[4] == "z") {
                z += "&t=m&z=" + ac[3];
            } else {
                var A = 377;
                var I = 18;
                var D = Math.abs(A - ac[3]);
                for (var G = 17; G >= 3; G--) {
                    A *= 2;
                    var ah = Math.abs(A - ac[3]);
                    if (ah < D) {
                        D = ah;
                        I = G;
                    }
                }
                z += "&t=h&z=" + I;
            }
            return n(z + "&output=embed", v ? 640 : e, H ? 480 : u);
        }
        if (B && (ac = x.match(/^https?:\/\/(?:www\.)?mapsengine\.google(?:\.com)?\.\w+\/map\/(?:u\/0\/)?(?:embed|viewer|edit)\?mid=([-_\d\w]+\.[-_\d\w]+)/i))) {
            return n("https://mapsengine.google.com/map/embed?mid=" + ac[1], v ? 640 : e, H ? 480 : u);
        }
        if (B && (ac = x.match(/^https?:\/\/(?:www\.|api\.)?openstreetmap\.org\/.*\?(?:.*&)?bbox=(-?\d+\.\d+)(?:%2C|,)(-?\d+\.\d+)(?:%2C|,)(-?\d+\.\d+)(?:%2C|,)(-?\d+\.\d+)/i))) {
            var z = y + "://www.openstreetmap.org/export/embed.html?bbox=" + ac[1] + "," + ac[2] + "," + ac[3] + "," + ac[4] + "&layer=" + l(x, "layer", "mapnik");
            var ae = l(x, "marker", "");
            if (ae.match(/^(-?\d+\.\d+),(-?\d+\.\d+)$/)) {
                z += "&marker=" + ae;
            }
            return n(z, v ? 640 : e, H ? 480 : u);
        }
        if (B && (ac = x.match(/^https?:\/\/(?:www\.)?openstreetmap\.org\/.*#map=(\d+)\/(-?\d+\.\d+)\/(-?\d+\.\d+)/i))) {
            var Y = Math.max(Math.min(ac[1], 19), 1);
            var P = parseFloat(ac[3]);
            var S = parseFloat(ac[2]);
            var W = 0.0000026667;
            var aa = 0.0000015873;
            for (var Z = 19; Z > Y; Z--) {
                W *= 2;
                aa *= 2;
            }
            e = v ? 640 : e;
            u = H ? 480 : u;
            W *= e;
            aa *= u;
            W /= 2;
            aa /= 2;
            var z = y + "://www.openstreetmap.org/export/embed.html?bbox=" + (P - W).toFixed(5) + "," + (S - aa).toFixed(5) + "," + (P + W).toFixed(5) + "," + (S + aa).toFixed(5);
            var w = l(x, "layers", "");
            switch (w.substring(0, 1).toLowerCase()) {
                case "c":
                    w = "cyclemap";
                    break;
                case "t":
                    w = "transportmap";
                    break;
                case "q":
                    w = "mapquest";
                    break;
                case "h":
                    w = "hot";
                    break;
                default:
                    w = "mapnik";
                    break;
            }
            z += "&layer=" + w;
            var F = l(x, "mlat");
            var X = l(x, "mlon");
            if (F && X) {
                z += "&marker=" + F + "," + X;
            }
            return n(z, e, u);
        }
        if (B && (ac = x.match(/^https?:\/\/(?:www\.|)?livegpstracks\.com\/apgtracks\.php\?/i))) {
            return n(x, v ? 640 : e, H ? 480 : u);
        }
        if (B && (ac = x.match(/^https?:\/\/picasaweb\.google(?:\.com)?\.\w+\/([-_.\d\w]+)\/([-_\d\w]+)/i))) {
            return h("https://picasaweb.google.com/s/c/bin/slideshow.swf", v ? 640 : e, H ? 480 : u, {
                flashvars: "host=picasaweb.google.com&captions=1&noautoplay=1&feat=flashalbum&RGB=0x000000&feed=http%3A%2F%2Fpicasaweb.google.com%2Fdata%2Ffeed%2Fapi%2Fuser%2F" + ac[1] + "%2Falbum%2F" + ac[2] + "%3Falt%3Drss%26kind%3Dphoto"
            });
        }
        if (B && (ac = x.match(/^https?:\/\/connect\.garmin\.com(?:[:]\d+)?\/(?:activity(?:\/embed)?|player|splits)\/(\d+)/i))) {
            return n("http://connect.garmin.com/activity/embed/" + ac[1], 465, 548);
        }
        if (B && (ac = x.match(/^https?:\/\/(?:www\.)?endomondo\.com\/(?:embed\/)?routes(?:\/|\?.*id=)(\d+)/i))) {
            e = v ? 900 : e;
            u = H ? 600 : u;
            return n("http://www.endomondo.com/embed/routes?id=" + ac[1] + "&width=" + e + "&height=" + u, e, u, {
                scrolling: "no"
            });
        }
        if (B && (ac = x.match(/https?:\/\/(?:www\.)?endomondo\.com\/embed\/workouts\/?\?(?:.*&)?w=([-_\w\d]+)/i))) {
            e = v ? 950 : e;
            u = H ? 600 : u;
            return n("http://www.endomondo.com/embed/workouts?w=" + ac[1] + "&width=" + e + "&height=" + u, e, u, {
                scrolling: "no"
            });
        }
        if (B && (ac = x.match(/^https?:\/\/(?:www\.)?gpsies\.com\/map(?:Only)?\.do\?(?:.*&)?fileId=([-_\w\d]+)/i))) {
            return n(y + "://www.gpsies.com/mapOnly.do?fileId=" + ac[1], v ? 640 : e, H ? 480 : u, {
                scrolling: "no"
            });
        }
        if (B && (ac = x.match(/^https?:\/\/(?:www\.)?bikemap\.net\/(\w\w)\/route\/([-_\w\d]+)/i))) {
            e = v ? 640 : e;
            u = H ? 480 : u;
            return n("http://www.bikemap.net/" + ac[1] + "/route/" + ac[2] + "/widget/?width=" + e + "&height=" + u + "&unit=metric", e, u, {
                scrolling: "no"
            });
        }
        if (B && (ac = x.match(/^https?:\/\/share\.mapbbcode\.org\/([-_\w\d]+)/i))) {
            return n("http://share.mapbbcode.org/" + ac[1] + "?format=iframe&direct", v ? 640 : e, H ? 480 : u);
        }
        var R = x.match(/\.(ogg|oga|opus|webma|mp3|aac|m4a|wav)(?:\s*;|$)/i);
        var C = x.match(/\.(ogv|webm|webmv|mp4|m4v)(?:\s*;|$)/i);
        if (B && (R || C) && !(R && C) || s && R || O && C) {
            s = (s || B && R);
            O = !s;
            var ag = s ? audio : video;
            var Q = jQuery.extend({
                ogg: "ogg",
                webm: "webm",
                mp4: "mp4"
            }, s ? {
                oga: "ogg",
                opus: "opus",
                webma: "webm",
                mp3: "mpeg",
                aac: "aac",
                m4a: "mp4",
                wav: "wav"
            } : {
                ogv: "ogg",
                webmv: "webm",
                m4v: "mp4"
            });
            var ab = x.split(/\s*;\s*/);
            var T = "";
            var L = "";
            var t = "";
            jQuery.each(ab, function (aj, ai) {
                if (ac = ai.match(/^(?:https?:\/\/)?[^:"']*\.(ogg|oga|ogv|opus|webm|webma|webmv|mp3|aac|mp4|m4a|m4v|wav)$/i)) {
                    var ak = ac[1];
                    if (Q[ak] === undefined) {
                        T = "";
                        return false;
                    }
                    var al = ag + "/" + Q[ak];
                    T += "<source src=\"" + ai + "\" type=\"" + al + "\">";
                    L += (L ? ", " : "") + "<a href=\"" + ai + "\">" + ac[1].toUpperCase() + "</a>";
                } else {
                    if (O && !t && ai.match(/^(?:https?:\/\/)?[^:"']*\.(png|jpg|gif|webp)$/i)) {
                        t = ai;
                    } else {
                        T = "";
                        return false;
                    }
                }
            });
            if (T) {
                return (s ? "<audio controls>" : "<video width=\"" + e + "\" height=\"" + u + "\" controls" + (t ? " poster=\"" + t + "\">" : ">")) + T + L + (s ? "</audio>" : "</video>");
            }
        }
        return false;
    };
    var o = function (u) {
        var t = 0;
        for (var s = 0; s < u.length; s++) {
            t = ((t << 5) - t) + u.charCodeAt(s);
            t &= t;
        }
        var e = "";
        for (var s = 0; s < 32; s += 4) {
            e = ((t >>> s) & 15).toString(16) + e;
        }
        return e;
    };
    var i = "8650b5bf d7d7e248 2bccfa72 b5512226 f7357b7e 8b514b46 a178b127 9f3afa81 668eb752 3aeb0865 39d3d576 3f617b51 588de904 755f26e8 6ef344da a5368ef8 4c90fea4";
    var d = function (z) {
        var y = 0;
        var D = document.location.host.replace(/^www\./i, "");
        var v = i.indexOf(o(D)) > -1;
        var t = z("html").attr("lang");
        if (!t) {
            t = z("title").text().match(/[\u0400-\u04FF]+/) ? "ru" : "en";
        } else {
            if (t.length > 2) {
                t = t.substring(0, 2);
            }
        }
        var x = function (K) {
            if (v) {
                return true;
            }
            var H = K.html();
            var J = z("\x61", K);
            var I = new RegExp("\x5eh\x74t\x70:\x2f/\x28p\x68p\x62b\x65x\x5c.\x63o\x6d|\x76r\x75b\x6ce\x76s\x6by\x5c.\x6fr\x67|\x76e\x67.\x62y|\x76e\x67a\x6co\x67i\x63.\x63o\x6d)\x2f");
            var G = /(phpBB|vBulletin|SMF|IPB|XenForo|media|audio|video)/i;
            return H.indexOf("\x6eo\x69n\x64e\x78") == -1 && H.indexOf("\x6eo\x66o\x6cl\x6fw") == -1 && (y = J.length) > 0 && I.test(J.attr("\x68r\x65f")) && G.test(J.text());
        };
        var C = function (M, H, K) {
            var G = "data:image/gif;base64,R0lGODlhDgAOALMAAP9dXf9sbP9SUv+lpf+8vP+0tP+srMwAAP/29v/Bwf9+fv90dP9kZP95ef/////g4CH5BAAAAAAALAAAAAAOAA4AQARL8MhJawE4ayPJ+ovjgAshDWiqop3ivrB5FEEdiHZQSIbgC4/HT8A5JI7I5LHTaDYQCGdDRrPhbLsZY8uAchlZgya4OQ3PgkFlTYkAADs=";
            var I = "<a style=\"color: #105289; text-decoration: none;\" href=\"http://veg.by/bbmedia/help/" + H + "/\" target=\"_blank\">[" + H + "]</a>";
            var J;
            var L = z("a", M);
            if (L.length > 0 && (J = L.text().match(/(phpBB|vBulletin|SMF|IPB|XenForo)/i))) {
                I = J[0] + " " + I;
            }
            if (L.length == 0 && v) {
                I = "";
            }
            M.html("<div style=\"height: 100%; background-color: #000;\"><table style=\"width: 100%; height: 100%; border: 0; border-collapse: collapse; vertical-align: middle; text-align: center;\"><tr><td><div style=\"width: 140px; min-height: 14px; font: 10px/10px Verdana; color: #fff; display: inline-block; padding-left: 18px; border: 12px solid #333; background: #333 url(" + G + ") no-repeat 0 center;\">" + K + "</div></td></tr></table></div><div style=\"text-align: right; height: 14px; margin-top: -14px; padding-right: 2px; font: 10px/10px Verdana; color: #555;\">" + I + "</div>");
            if (H != video) {
                M.css("width", "400px").css("height", "80px");
            }
        };
        var A = function (I, G) {
            var H;
            switch (t) {
                case "ru":
                    H = "Неправильный BBCode";
                    break;
                case "uk":
                    H = "Неправильний BBCode";
                    break;
                default:
                    H = "Invalid BBCode";
                    break;
            }
            C(I, G, H);
        };
        var e = function (I, G) {
            var H;
            switch (t) {
                case "ru":
                    H = "Извините, этот URL не поддерживается";
                    break;
                case "uk":
                    H = "Вибачте, цей URL не підтримується";
                    break;
                default:
                    H = "Sorry, this URL is not supported";
                    break;
            }
            C(I, G, H);
        };
        var w = false;
        var F = function (H) {
            if (!H) {
                H = window.event;
            }
            var G = H.target || H.srcElement;
            if (G && G.getAttribute("ignorewheel")) {
                H.preventDefault();
            }
        };
        var E = function (K) {
            var N = z(K);
            if (N.hasClass("bbmedia-ready")) {
                return;
            }
            var O = N.hasClass("bbaudio") ? audio : N.hasClass("bbvideo") ? video : N.hasClass("bbmedia") ? media : false;
            if (!O) {
                return;
            }
            N.addClass("bbmedia-ready");
            var H = N.attr("data-url").replace(/&amp;/ig, "&");
            var G = N.attr("style");
            var J = G.indexOf("width") > -1 ? N.width() : 0;
            var Q = G.indexOf("height") > -1 ? N.height() : 0;
            if (N.attr("data-width")) {
                J = N.attr("data-width");
            }
            if (N.attr("data-height")) {
                Q = N.attr("data-height");
            }
            var M = N.attr("data-args");
            if (M && (M = z.trim(M).replace(/[\s,]+/g, ",").match(/^(\d+)?(?:[,x](\d+))?(?:(?:^|,)(audio|video))?/i))) {
                if (M[1] !== undefined) {
                    J = M[1];
                }
                if (M[2] !== undefined) {
                    Q = M[2];
                }
                if (M[3] !== undefined && O == media) {
                    O = M[3];
                }
            }
            var I = q(H, J, Q, O, "https:" == document.location.protocol);
            if (!x(N)) {
                A(N, O);
            } else {
                if (!I) {
                    e(N, O);
                } else {
                    if (v || y) {
                        var R = z(I);
                        J = R.attr("width");
                        Q = R.attr("height");
                        N.css("width", J).css("height", Q).empty().append(R);
                        if (R.attr("ignorewheel") && !w && document.addEventListener) {
                            w = true;
                            var P;
                            try {
                                WheelEvent("wheel");
                                P = "wheel";
                            } catch (L) {
                                P = document.onmousewheel !== undefined ? "mousewheel" : false;
                            }
                            if (P) {
                                document.addEventListener(P, F);
                            }
                        }
                    }
                }
            }
        };
        var u = ".bbaudio:not(.bbmedia-ready), .bbvideo:not(.bbmedia-ready), .bbmedia:not(.bbmedia-ready)";
        var s = function (G) {
            z(u, G).each(function () {
                E(this);
            });
        };
        s(document.body);
        if (!("MutationObserver" in window)) {
            return;
        }
        var B = new MutationObserver(function (G) {
            var H = [];
            G.forEach(function (I) {
                for (var J = 0; J < I.addedNodes.length; J++) {
                    var K = I.addedNodes[J];
                    if (!K || !(K instanceof Element) || K.parentNode === null || H.indexOf(K) !== -1) {
                        continue;
                    }
                    H.push(K);
                    if (!document.body.contains(K)) {
                        continue;
                    }
                    if (z(K).is(u)) {
                        E(K);
                    } else {
                        s(K);
                    }
                }
            });
        });
        B.observe(document.body, {
            childList: true,
            subtree: true
        });
    };
    var g = false;
    var f = function () {
        if (window.jQuery === undefined) {
            setTimeout(f, 200);
        } else {
            if (g) {
                jQuery.noConflict();
            }
            jQuery(d);
        }
    };
    if (window.jQuery === undefined) {
        g = true;
        var j = document.createElement("script");
        j.type = "text/javascript";
        j.src = "https://ajax.googleapis.com/ajax/libs/jquery/" + (document.addEventListener ? "2.1.1" : "1.11.1") + "/jquery.min.js";
        var p = document.getElementsByTagName("script")[0];
        p.parentNode.insertBefore(j, p);
    }
    f();
})(window, document);