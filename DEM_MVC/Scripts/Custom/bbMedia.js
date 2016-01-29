// BB [media] v1.68 [2015-07-01] (C) 2014 Evgeny Vrublevsky, http://phpbbex.com/
// Licensed under CC BY-NC-ND, http://creativecommons.org/licenses/by-nc-nd/3.0/

(function (window, document, undefined) {
    var media = "media";
    var audio = "audio";
    var video = "video";

    var functionOne = function (t, e, s) {
        if (data = t.match(new RegExp("[?&]" + e + "=([^?&#]*)", ""))) {
            return decodeURIComponent(data[1]);
        } else {
            return (s === undefined) ? null : s;
        }
    };
    var functionTwo = function (t, v, e, s) {
        s = jQuery.extend({
            frameborder: "0"
        }, s);
        var u = "<iframe style=\"vertical-align: bottom; width: " + v + "px; height: " + e + "px;\" width=\"" + v + "\" height=\"" + e + "\" src=\"" + t + "\" webkitallowfullscreen mozallowfullscreen allowfullscreen";
        jQuery.each(s, function (w, x) {
            u += " " + w + "=\"" + x + "\"";
        });
        return u + "></iframe>";
    };
    var functionThree = function (u, w, e, t) {
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
    var functionFour = function (sourceLink, frameWidth, frameHeight, tagType, itsHttps) {
        var itsMedia = (tagType == media);
        var itsAudio = (tagType == audio);
        var itsVideo = (tagType == video);
        var itsAudioOrMedia = (itsAudio || itsMedia);
        var itsVideoOrMedia = (itsVideo || itsMedia);
        if (!frameWidth && !frameHeight) {
            frameWidth = 640;
            frameHeight = 360;
        } else {
            if (!frameWidth) {
                frameWidth = parseInt(frameHeight * (16 / 9));
            } else {
                if (!frameHeight) {
                    frameHeight = parseInt(frameWidth * (9 / 16));
                }
            }
        }
        var httpType = itsHttps ? "https" : "http";
        var parsedSourceLink;
        sourceLink = jQuery.trim(sourceLink);
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/(?:playlist\?(?:.*&)?list=|embed\/videoseries\?(?:.*&)?list=|p\/|view_play_list\?(?:.*&)?p=)([-_\w\d]+)/i))) {
            return functionTwo(httpType + "://www.youtube.com/embed/videoseries?list=" + parsedSourceLink[1], frameWidth, frameHeight);
        }
        var urlParams;
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?(?:youtu\.be\/|(?:m\.)?youtube(?:-nocookie)?\.com\/(?:(?:watch|movie)\?(?:.*&)?v=|embed\/|v\/|attribution_link.*watch%3Fv%3D))([-_\w\d]+)(?:.*(?:[&?]start|[?&#]t)=(?:(\d+)h)?(?:(\d+)m)?(\d+)?)?/i))) {
            urlParams = [];
            var startVideoFromSecond = parseInt(parsedSourceLink[2] ? parsedSourceLink[2] : 0) * 3600 + parseInt(parsedSourceLink[3] ? parsedSourceLink[3] : 0) * 60 + parseInt(parsedSourceLink[4] ? parsedSourceLink[4] : 0);
            if (startVideoFromSecond) {
                urlParams.push("start=" + startVideoFromSecond);
            }
            if (functionOne(sourceLink, "rel") === "0") {
                urlParams.push("rel=0");
            }
            urlParams = urlParams.join("&");
            return functionTwo(httpType + "://www.youtube.com/embed/" + parsedSourceLink[1] + ( urlParams ? "?" + urlParams : ""), frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?(?:vimeo\.com|player\.vimeo\.com\/video)\/(\d+)/i))) {
            return functionTwo(httpType + "://player.vimeo.com/video/" + parsedSourceLink[1], frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/video_ext\.php\?oid=([-_\w\d]+)&id=([-_\w\d]+)&hash=([-_\w\d]+)(&sd|&hd=1|&hd=2|)/i))) {
            return functionTwo(httpType + "://vk.com/video_ext.php?oid=" + parsedSourceLink[1] + "&id=" + parsedSourceLink[2] + "&hash=" + parsedSourceLink[3] + parsedSourceLink[4], frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?(?:rutube\.ru\/(?:video\/|play\/)?(?:embed\/)?|video\.rutube\.ru\/)([\da-f]+)/i))) {
            return functionTwo(httpType + "://rutube.ru/play/embed/" + parsedSourceLink[1], frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?(?:smotri\.com\/video\/view\/\?(?:.*&)?id=|pics\.smotri\.com\/player\.swf\?(?:.*&)?file=)([\w\d]+)/i))) {
            return functionThree("http://pics.smotri.com/player.swf?file=" + parsedSourceLink[1] + "&bufferTime=3&autoStart=false&str_lang=rus", frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:video\.qip\.ru\/video\/view\/\?(?:.*&)?id=|pics\.video\.qip\.ru\/player\.swf\?(?:.*&)?file=)([\w\d]+)/i))) {
            return functionThree("http://pics.video.qip.ru/player.swf?file=" + parsedSourceLink[1] + "&bufferTime=3&autoStart=false&str_lang=rus", frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/photo\.tvigle\.ru\/resource\/rf\/swf\/([\/\d\w]*)\.swf/i))) {
            return functionThree("http://photo.tvigle.ru/resource/rf/swf/" + parsedSourceLink[1] + ".swf", frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/video\.bigmir\.net\/(?:show|player)\/(\d+)/i))) {
            return functionTwo("http://video.bigmir.net/player/" + parsedSourceLink[1] + "/", frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:my\.mail\.ru(?:\/video)?(?:.*#video=)?|video\.mail\.ru|(?:api\.video|videoapi\.my)\.mail\.ru\/videos\/embed)\/([^\/]+)\/([^\/]+)\/(?:video\/)?([-_\d\w]+)\/([-_\d\w]+)/i))) {
            return functionTwo("http://videoapi.my.mail.ru/videos/embed/" + parsedSourceLink[1] + "/" + parsedSourceLink[2] + "/" + parsedSourceLink[3] + "/" + parsedSourceLink[4] + ".html", frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/video\.sibnet\.ru\/(?:(?:[\w\d\/]+)\/video|shell\.swf\?videoid=)(\d+)/i))) {
            return functionThree("http://video.sibnet.ru/shell.swf?videoid=" + parsedSourceLink[1], frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/video\.online\.ua\/(?:embed\/)?([\d\w]+)/i))) {
            return functionTwo("http://video.online.ua/embed/" + parsedSourceLink[1] + "/", frameWidth, frameHeight, {
                scrolling: "no"
            });
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:(?:www\.)intv\.ru\/v\/|flash\.intv\.ru\/uplay\/)([\d\w]+)/i))) {
            return functionThree("http://flash.intv.ru/uplay/" + parsedSourceLink[1], frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?metacafe\.com\/(?:watch|fplayer)\/(\d+)\/([^\/.]+)/i))) {
            return functionThree("http://www.metacafe.com/fplayer/" + parsedSourceLink[1] + "/" + parsedSourceLink[2] + ".swf", frameWidth, frameHeight, {
                flashvars: "playerVars=autoPlay=no"
            });
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?lovi\.tv\/video\/(?:sharer\.php\?Code=)?([\d\w]+)/i))) {
            return functionTwo("http://lovi.tv/video/sharer.php?Code=" + parsedSourceLink[1] + "&Width=" + frameWidth + "&Height=" + frameHeight, frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:[-.\w\d]+?\.)?facebook\.com\/(?:(?:video\/video|video|photo)\.php\?(?:.*&)?v=|video\/embed\?(?:.*&)?video_id=|v\/|[-_.\w\d]+\/videos\/)([-_\w\d]+)/i))) {
            return functionTwo(httpType + "://www.facebook.com/video/embed?video_id=" + parsedSourceLink[1], frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?archive\.org\/(?:details|embed)\/([-_.\/\w\d]+)/i))) {
            return functionTwo(httpType + "://archive.org/embed/" + parsedSourceLink[1], frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?clipfish\.de\/(?:(?:.*?\/)?video\/|embed_(?:image|video)\/\?(?:.*&)?vid=)(\d+)/i))) {
            return functionTwo("http://www.clipfish.de/embed_video/?vid=" + parsedSourceLink[1] + "&as=0&butcolor=000000", frameWidth, frameHeight, {
                scrolling: "no",
                marginheight: "0",
                marginwidth: "0"
            });
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?myvideo\.de\/(?:movie|embed|watch)\/([-_\d\w]+)/i))) {
            return functionTwo(httpType + "://www.myvideo.de/embed/" + parsedSourceLink[1], frameWidth, frameHeight, {
                scrolling: "no"
            });
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?veevr\.com\/(?:videos|embed)\/([-_\d\w]+)/i))) {
            return functionTwo("http://veevr.com/embed/" + parsedSourceLink[1], frameWidth, frameHeight, {
                scrolling: "no"
            });
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?hulu\.com\/embed\/([-_\d\w]+(?:\/\d+){0,2})/i))) {
            return functionThree("http://www.hulu.com/embed/" + parsedSourceLink[1], frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?megogo\.net\/.*view\/(\d+)/i))) {
            return functionTwo(httpType + "://megogo.net/e/" + parsedSourceLink[1], frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?dailymotion\.com\/(?:video|swf|embed\/video)\/([0-9a-z]+)/i))) {
            return functionTwo(httpType + "://www.dailymotion.com/embed/video/" + parsedSourceLink[1], frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?own3d\.tv\/(?:.*\/)?(?:live|liveembed|l)\/([0-9]+)/i))) {
            return functionTwo("http://www.own3d.tv/liveembed/" + parsedSourceLink[1], frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?own3d\.tv\/(?:.*\/)?(?:video|stream|v)\/([0-9]+)/i))) {
            return functionThree("http://www.own3d.tv/stream/" + parsedSourceLink[1], frameWidth, frameHeight, {
                wmode: "transparent"
            });
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:[\w\d]+\.)?ign\.com(\/videos\/\d+\/\d+\/\d+\/[-_\w\d]+)/i))) {
            return functionTwo("http://widgets.ign.com/video/embed/content.html?url=" + parsedSourceLink[1], frameWidth, frameHeight, {
                scrolling: "no"
            });
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?ustream\.tv\/(?:channel\/|embed\/)?((?:recorded\/)?[0-9]+)/i))) {
            return functionTwo(httpType + "://www.ustream.tv/embed/" + parsedSourceLink[1] + "?v=3&wmode=direct", frameWidth, frameHeight, {
                scrolling: "no"
            });
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/((?:\w+\.)?twitch\.tv)\/([-_\w\d]+)(?:\/([bc])\/(\d+))?/i))) {
            if (parsedSourceLink[3]) {
                return functionThree("http://www.twitch.tv/widgets/archive_embed_player.swf", frameWidth, frameHeight, {
                    flashvars: (parsedSourceLink[3].toLowerCase() == "b" ? "archive_id=" : "chapter_id=") + parsedSourceLink[4] + "&channel=" + parsedSourceLink[2] + "&auto_play=false"
                });
            } else {
                return functionThree("http://www.twitch.tv/widgets/live_embed_player.swf", frameWidth, frameHeight, {
                    flashvars: "hostname=" + parsedSourceLink[1] + "&channel=" + parsedSourceLink[2] + "&auto_play=false",
                    allowscriptaccess: "always"
                });
            }
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.|embed\.)?ted\.com\/talks\/(?:lang\/([\w]{2})\/)?([-_\w\d]+)\.html/i))) {
            return functionTwo("http://embed.ted.com/talks/" + (parsedSourceLink[1] ? ("lang/" + parsedSourceLink[1] + "/") : "") + parsedSourceLink[2] + ".html", frameWidth, frameHeight, {
                scrolling: "no"
            });
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?coub\.com\/(?:view|embed)\/([-_\w\d]+)/i))) {
            return functionTwo(httpType + "://coub.com/embed/" + parsedSourceLink[1], frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?pinkbike\.com\/(?:video|v)\/(\d+)/i))) {
            return functionThree("http://www.pinkbike.com/v/" + parsedSourceLink[1] + "/", frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?mpora\.com\/videos\/([-_\w\d]+)/i))) {
            return functionTwo("http://mpora.com/videos/" + parsedSourceLink[1] + "/embed", frameWidth, frameHeight);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?vine\.co\/v\/([-_\w\d]+)/i))) {
            var E = Math.min(frameWidth, frameHeight);
            return functionTwo("https://vine.co/v/" + parsedSourceLink[1] + "/embed/simple", E, E);
        }
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?imdb\.com\/video\/imdb\/([-_\w\d]+)/i))) {
            return functionTwo("http://www.imdb.com/video/imdb/" + parsedSourceLink[1] + "/player", 640 + 8 * 2, 480 + 8 * 2, {
                scrolling: "no"
            });
        }
        if (itsAudioOrMedia && (parsedSourceLink = sourceLink.match(/(^https?:\/\/soundcloud\.com\/[-_\w\d]+\/(?:sets\/)?[-_\w\d]+\/?$|https?(?::\/\/|%3A%2F%2F)api\.soundcloud\.com(?:\/|%2F)(?:tracks|playlists)(?:\/|%2F)\d+)/i))) {
            var M = !!parsedSourceLink[0].match(/(\/|%2F)(sets|playlists)(\/|%2F)/i);
            return functionThree("https://player.soundcloud.com/player.swf?show_comments=true&auto_play=false&color=ff7700&url=" + encodeURIComponent(decodeURIComponent(parsedSourceLink[0])), (frameWidth ? frameWidth : "100%"), M ? 225 : 81);
        }
        if (itsAudioOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:(?:www\.)?(?:prosto)?pleer\.com\/tracks\/|embed\.(?:prosto)?pleer\.com\/track\?(?:.*&)?id=)([\w\d]+)/i))) {
            return functionThree("http://embed.pleer.com/track?id=" + parsedSourceLink[1], (frameWidth ? frameWidth : 550), 42);
        }
        if (itsAudioOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:pleer\.com\/list|embed\.pleer\.com\/list\?id=)([\w\d]+)/i))) {
            return functionThree("http://embed.pleer.com/list?id=" + parsedSourceLink[1], (frameWidth ? frameWidth : "100%"), (frameWidth ? frameWidth : 480));
        }
        if (itsAudioOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?promodj\.(?:com|ru)\/(?:[-_\w\d]+\/\w+|embed|download)\/(\d+)/i))) {
            return functionTwo("http://promodj.com/embed/" + parsedSourceLink[1] + "/big", (frameWidth ? frameWidth : "100%"), 70);
        }
        if (itsAudioOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/music\.yandex\.(?:ru|by|ua|kz)\/(?:.*#!\/)?(?:track|embed|album\/[^/]+\/track)\/(\d+)/i))) {
            return functionThree("http://music.yandex.ru/embed/" + parsedSourceLink[1] + "/track.swf", (frameWidth ? frameWidth : "100%"), 48, {
                scale: "noscale",
                flashvars: "bg-color=%23F2F2F2&amp;text-color=%23777777&amp;hover-text-color=%23000000"
            });
        }
        if (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:video\.yandex\.(?:ru|by|ua|kz)\/iframe|(?:static|streaming)\.video\.yandex\.(?:ru|by|ua|kz)\/lite)\/([^\/"'<>]+)\/([^\/"'<>]+)/i)) {
            if (itsMedia && sourceLink.indexOf("bbaudio") != -1) {
                itsAudio = true;
            }
            return functionTwo(httpType + "://video.yandex.ru/iframe/" + parsedSourceLink[1] + "/" + parsedSourceLink[2] + "/", (itsAudio && frameWidth) ? frameWidth : 300, itsAudio ? 72 : frameHeight);
        }
        if (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?yapfiles\.ru\/static\/play\.swf\?(?:.*&)?st=([-_\w\d]+)/i)) {
            if (itsMedia && sourceLink.indexOf("bbvideo") == -1 && (sourceLink.indexOf("allowfullscreen") == -1 || sourceLink.indexOf("bbaudio") > -1)) {
                itsAudio = true;
            }
            return functionThree("http://www.yapfiles.ru/static/play.swf?st=" + parsedSourceLink[1], (itsAudio && frameWidth) ? frameWidth : 320, (itsAudio && frameHeight) ? frameHeight : 240);
        }
        if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?360cities\.net\/(?:image|embed_iframe)\/([-_\d\w]+)/i))) {
            return functionTwo(httpType + "://www.360cities.net/embed_iframe/" + parsedSourceLink[1], frameWidth, frameHeight);
        }
        if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?dermandar\.com\/p\/([-_\d\w]+)/i))) {
            return functionThree("http://static.dermandar.com/swf/Viewer.swf?v=1.4", frameWidth, frameHeight, {
                flashvars: "pano=" + parsedSourceLink[1],
                ignorewheel: true
            });
        }
        if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:maps\.google(?:\.com)?\.\w+\/(?:maps\/?)?|(?:www\.)?google(?:\.com)?\.\w+\/maps\/?)(?:ms\/?)?\?((?:.*&)?(?:ll|spn|sll|sspn|z|msid|q)=.*)$/i))) {
            urlParams = (sourceLink.indexOf("panoid=") == -1) ? (parsedSourceLink[1].replace(/&output=embed/, "") + "&output=embed") : (parsedSourceLink[1].replace(/&(source=|output=sv)embed/g, "") + "&source=embed&output=svembed");
            return functionTwo(httpType + "://maps.google.com/?" + urlParams, frameWidth ? frameWidth : 640, frameHeight ? frameHeight : 480);
        }
        if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?google(?:\.com)?\.\w+\/maps\/embed\?pb=([^&]+)/i))) {
            return functionTwo("https://www.google.com/maps/embed?pb=" + parsedSourceLink[1], frameWidth ? frameWidth : 640, frameHeight ? frameHeight : 480);
        }
        var resultLink;
        if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?google(?:\.com)?\.\w+\/maps\/(?:place\/[^\/]+\/)?@(-?\d+\.\d+),(-?\d+\.\d+),(\d+)([zm])/i))) {
            resultLink = httpType + "://maps.google.com/maps?ll=" + parsedSourceLink[1] + "," + parsedSourceLink[2];
            if (parsedSourceLink[4] == "z") {
                resultLink += "&t=m&z=" + parsedSourceLink[3];
            } 
            //else {
            //    z += "&t=h&z=" + 18;
            //} 
            else {
                var strangeNumber = 377;
                var zoomLevel = 18;
                var strangeDiference = Math.abs(strangeNumber - parsedSourceLink[3]);
                for (var i = 17; i >= 3; i--) {
                    strangeNumber *= 2;
                    var otherStrangeDiference = Math.abs(strangeNumber - parsedSourceLink[3]);
                    if (otherStrangeDiference < strangeDiference) {
                        strangeDiference = otherStrangeDiference;
                        zoomLevel = i;
                    }
                }
                resultLink += "&t=h&z=" + zoomLevel;
            }
        return functionTwo(resultLink + "&output=embed", frameWidth ? frameWidth : 640, frameHeight ? frameHeight : 480);
    }
    if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?mapsengine\.google(?:\.com)?\.\w+\/map\/(?:u\/0\/)?(?:embed|viewer|edit)\?mid=([-_\d\w]+\.[-_\d\w]+)/i))) {
        return functionTwo("https://mapsengine.google.com/map/embed?mid=" + parsedSourceLink[1], frameWidth ? frameWidth : 640, frameHeight ? frameHeight : 480);
    }
    if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.|api\.)?openstreetmap\.org\/.*\?(?:.*&)?bbox=(-?\d+\.\d+)(?:%2C|,)(-?\d+\.\d+)(?:%2C|,)(-?\d+\.\d+)(?:%2C|,)(-?\d+\.\d+)/i))) {
        resultLink = httpType + "://www.openstreetmap.org/export/embed.html?bbox=" + parsedSourceLink[1] + "," + parsedSourceLink[2] + "," + parsedSourceLink[3] + "," + parsedSourceLink[4] + "&layer=" + functionOne(sourceLink, "layer", "mapnik");
        var ae = functionOne(sourceLink, "marker", "");
        if (ae.match(/^(-?\d+\.\d+),(-?\d+\.\d+)$/)) {
            resultLink += "&marker=" + ae;
        }
        return functionTwo(resultLink, frameWidth ? frameWidth : 640, frameHeight ? frameHeight : 480);
    }
    if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?openstreetmap\.org\/.*#map=(\d+)\/(-?\d+\.\d+)\/(-?\d+\.\d+)/i))) {
        var Y = Math.max(Math.min(parsedSourceLink[1], 19), 1);
        var P = parseFloat(parsedSourceLink[3]);
        var S = parseFloat(parsedSourceLink[2]);
        var W = 0.0000026667;
        var aa = 0.0000015873;
        for (var Z = 19; Z > Y; Z--) {
            W *= 2;
            aa *= 2;
        }
        frameWidth = frameWidth ? frameWidth : 640;
        frameHeight = frameHeight ? frameHeight : 480;
        W *= frameWidth;
        aa *= frameHeight;
        W /= 2;
        aa /= 2;
        resultLink = httpType + "://www.openstreetmap.org/export/embed.html?bbox=" + (P - W).toFixed(5) + "," + (S - aa).toFixed(5) + "," + (P + W).toFixed(5) + "," + (S + aa).toFixed(5);
        var w = functionOne(sourceLink, "layers", "");
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
        resultLink += "&layer=" + w;
        var F = functionOne(sourceLink, "mlat");
        var X = functionOne(sourceLink, "mlon");
        if (F && X) {
            resultLink += "&marker=" + F + "," + X;
        }
        return functionTwo(resultLink, frameWidth, frameHeight);
    }
    if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.|)?livegpstracks\.com\/apgtracks\.php\?/i))) {
        return functionTwo(sourceLink, frameWidth ? frameWidth : 640, frameHeight ? frameHeight : 480);
    }
    if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/picasaweb\.google(?:\.com)?\.\w+\/([-_.\d\w]+)\/([-_\d\w]+)/i))) {
        return functionThree("https://picasaweb.google.com/s/c/bin/slideshow.swf", frameWidth ? frameWidth : 640, frameHeight ? frameHeight : 480, {
            flashvars: "host=picasaweb.google.com&captions=1&noautoplay=1&feat=flashalbum&RGB=0x000000&feed=http%3A%2F%2Fpicasaweb.google.com%2Fdata%2Ffeed%2Fapi%2Fuser%2F" + parsedSourceLink[1] + "%2Falbum%2F" + parsedSourceLink[2] + "%3Falt%3Drss%26kind%3Dphoto"
        });
    }
    if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/connect\.garmin\.com(?:[:]\d+)?\/(?:activity(?:\/embed)?|player|splits)\/(\d+)/i))) {
        return functionTwo("http://connect.garmin.com/activity/embed/" + parsedSourceLink[1], 465, 548);
    }
    if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?endomondo\.com\/(?:embed\/)?routes(?:\/|\?.*id=)(\d+)/i))) {
        frameWidth = frameWidth ? frameWidth : 900;
        frameHeight = frameHeight ? frameHeight : 600;
        return functionTwo("http://www.endomondo.com/embed/routes?id=" + parsedSourceLink[1] + "&width=" + frameWidth + "&height=" + frameHeight, frameWidth, frameHeight, {
            scrolling: "no"
        });
    }
    if (itsMedia && (parsedSourceLink = sourceLink.match(/https?:\/\/(?:www\.)?endomondo\.com\/embed\/workouts\/?\?(?:.*&)?w=([-_\w\d]+)/i))) {
        frameWidth = frameWidth ? frameWidth : 950;
        frameHeight = frameHeight ? frameHeight : 600;
        return functionTwo("http://www.endomondo.com/embed/workouts?w=" + parsedSourceLink[1] + "&width=" + frameWidth + "&height=" + frameHeight, frameWidth, frameHeight, {
            scrolling: "no"
        });
    }
    if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?gpsies\.com\/map(?:Only)?\.do\?(?:.*&)?fileId=([-_\w\d]+)/i))) {
        return functionTwo(httpType + "://www.gpsies.com/mapOnly.do?fileId=" + parsedSourceLink[1], frameWidth ? frameWidth : 640, frameHeight ? frameHeight : 480, {
            scrolling: "no"
        });
    }
    if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?bikemap\.net\/(\w\w)\/route\/([-_\w\d]+)/i))) {
        frameWidth = frameWidth ? frameWidth : 640;
        frameHeight = frameHeight ? frameHeight : 480;
        return functionTwo("http://www.bikemap.net/" + parsedSourceLink[1] + "/route/" + parsedSourceLink[2] + "/widget/?width=" + frameWidth + "&height=" + frameHeight + "&unit=metric", frameWidth, frameHeight, {
            scrolling: "no"
        });
    }
    if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/share\.mapbbcode\.org\/([-_\w\d]+)/i))) {
        return functionTwo("http://share.mapbbcode.org/" + parsedSourceLink[1] + "?format=iframe&direct", frameWidth ? frameWidth : 640, frameHeight ? frameHeight : 480);
    }
    var R = sourceLink.match(/\.(ogg|oga|opus|webma|mp3|aac|m4a|wav)(?:\s*;|$)/i);
    var C = sourceLink.match(/\.(ogv|webm|webmv|mp4|m4v)(?:\s*;|$)/i);
    if (itsMedia && (R || C) && !(R && C) || itsAudio && R || itsVideo && C) {
        itsAudio = (itsAudio || itsMedia && R);
        itsVideo = !itsAudio;
        var ag = itsAudio ? audio : video;
        var Q = jQuery.extend({
            ogg: "ogg",
            webm: "webm",
            mp4: "mp4"
        }, itsAudio ? {
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
        var ab = sourceLink.split(/\s*;\s*/);
        var T = "";
        var L = "";
        var t = "";
        jQuery.each(ab, function (aj, ai) {
            if (parsedSourceLink = ai.match(/^(?:https?:\/\/)?[^:"']*\.(ogg|oga|ogv|opus|webm|webma|webmv|mp3|aac|mp4|m4a|m4v|wav)$/i)) {
                var ak = parsedSourceLink[1];
                if (Q[ak] === undefined) {
                    T = "";
                    return false;
                }
                var al = ag + "/" + Q[ak];
                T += "<source src=\"" + ai + "\" type=\"" + al + "\">";
                L += (L ? ", " : "") + "<a href=\"" + ai + "\">" + parsedSourceLink[1].toUpperCase() + "</a>";
            } else {
                if (itsVideo && !t && ai.match(/^(?:https?:\/\/)?[^:"']*\.(png|jpg|gif|webp)$/i)) {
                    t = ai;
                } else {
                    T = "";
                    return false;
                }
            }
        });
        if (T) {
            return (itsAudio ? "<audio controls>" : "<video width=\"" + frameWidth + "\" height=\"" + frameHeight + "\" controls" + (t ? " poster=\"" + t + "\">" : ">")) + T + L + (itsAudio ? "</audio>" : "</video>");
        }
    }
    return false;
};
var functionFive = function (u) {
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
var strangeNumber = "8650b5bf d7d7e248 2bccfa72 b5512226 f7357b7e 8b514b46 a178b127 9f3afa81 668eb752 3aeb0865 39d3d576 3f617b51 588de904 755f26e8 6ef344da a5368ef8 4c90fea4";
var functionSix = function (z) {
    var y = 0;
    var siteDomen = document.location.host.replace(/^www\./i, "");
    var strangeNumberAnswer = strangeNumber.indexOf(functionFive(siteDomen)) > -1;

    var x = function (K) {
        if (strangeNumberAnswer) {
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
        M.html("<div style=\"height: 100%; background-color: #000;\"><table style=\"width: 100%; height: 100%; border: 0; border-collapse: collapse; vertical-align: middle; text-align: center;\"><tr><td><div style=\"width: 140px; min-height: 14px; font: 10px/10px Verdana; color: #fff; display: inline-block; padding-left: 18px; border: 12px solid #333; background: #333 url(" + G + ") no-repeat 0 center;\">" + K + "</div></td></tr></table></div><div style=\"text-align: right; height: 14px; margin-top: -14px; padding-right: 2px; font: 10px/10px Verdana; color: #555;\"></div>");
        if (H != video) {
            M.css("width", "400px").css("height", "80px");
        }
    };
    var A = function (I, G) {
        C(I, G, "Invalid BBCode");
    };
    var e = function (I, G) {
        C(I, G, "Sorry, this URL is not supported");
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
        var I = functionFour(H, J, Q, O, "https:" == document.location.protocol);
        if (!x(N)) {
            A(N, O);
        } else {
            if (!I) {
                e(N, O);
            } else {
                if (strangeNumberAnswer || y) {
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

jQuery(functionSix);
})(window, document);