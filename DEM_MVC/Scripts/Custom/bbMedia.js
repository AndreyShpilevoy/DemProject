// BB [media] v1.68 [2015-07-01] (C) 2014 Evgeny Vrublevsky, http://phpbbex.com/
// Licensed under CC BY-NC-ND, http://creativecommons.org/licenses/by-nc-nd/3.0/

(function (window, document, undefined) {
    var mediaMarker = "media";
    var audioMarker = "audio";
    var videoMarker = "video";

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
        var itsMedia = (tagType == mediaMarker);
        var itsAudio = (tagType == audioMarker);
        var itsVideo = (tagType == videoMarker);
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
        var urlParams;
        var resultLink;
        sourceLink = jQuery.trim(sourceLink);

        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/(?:playlist\?(?:.*&)?list=|embed\/videoseries\?(?:.*&)?list=|p\/|view_play_list\?(?:.*&)?p=)([-_\w\d]+)/i))) {
            return functionTwo(httpType + "://www.youtube.com/embed/videoseries?list=" + parsedSourceLink[1], frameWidth, frameHeight);
        }

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
            return functionTwo(httpType + "://www.youtube.com/embed/" + parsedSourceLink[1] + (urlParams ? "?" + urlParams : ""), frameWidth, frameHeight);
        }
        
        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?(?:vimeo\.com|player\.vimeo\.com\/video)\/(\d+)/i))) {
            return functionTwo(httpType + "://player.vimeo.com/video/" + parsedSourceLink[1], frameWidth, frameHeight);
        }

        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/video_ext\.php\?oid=([-_\w\d]+)&id=([-_\w\d]+)&hash=([-_\w\d]+)(&sd|&hd=1|&hd=2|)/i))) {
            return functionTwo(httpType + "://vk.com/video_ext.php?oid=" + parsedSourceLink[1] + "&id=" + parsedSourceLink[2] + "&hash=" + parsedSourceLink[3] + parsedSourceLink[4], frameWidth, frameHeight);
        }

        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:[-.\w\d]+?\.)?facebook\.com\/(?:(?:video\/video|video|photo)\.php\?(?:.*&)?v=|video\/embed\?(?:.*&)?video_id=|v\/|[-_.\w\d]+\/videos\/)([-_\w\d]+)/i))) {
            return functionTwo(httpType + "://www.facebook.com/video/embed?video_id=" + parsedSourceLink[1], frameWidth, frameHeight);
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

        if (itsVideoOrMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?coub\.com\/(?:view|embed)\/([-_\w\d]+)/i))) {
            return functionTwo(httpType + "://coub.com/embed/" + parsedSourceLink[1], frameWidth, frameHeight);
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
        
        if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:maps\.google(?:\.com)?\.\w+\/(?:maps\/?)?|(?:www\.)?google(?:\.com)?\.\w+\/maps\/?)(?:ms\/?)?\?((?:.*&)?(?:ll|spn|sll|sspn|z|msid|q)=.*)$/i))) {
            urlParams = (sourceLink.indexOf("panoid=") == -1) ? (parsedSourceLink[1].replace(/&output=embed/, "") + "&output=embed") : (parsedSourceLink[1].replace(/&(source=|output=sv)embed/g, "") + "&source=embed&output=svembed");
            return functionTwo(httpType + "://maps.google.com/?" + urlParams, frameWidth ? frameWidth : 640, frameHeight ? frameHeight : 480);
        }

        if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?google(?:\.com)?\.\w+\/maps\/embed\?pb=([^&]+)/i))) {
            return functionTwo("https://www.google.com/maps/embed?pb=" + parsedSourceLink[1], frameWidth ? frameWidth : 640, frameHeight ? frameHeight : 480);
        }

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




        var R = sourceLink.match(/\.(ogg|oga|opus|webma|mp3|aac|m4a|wav)(?:\s*;|$)/i);
        var C = sourceLink.match(/\.(ogv|webm|webmv|mp4|m4v)(?:\s*;|$)/i);
        if (itsMedia && (R || C) && !(R && C) || itsAudio && R || itsVideo && C) {
            itsAudio = (itsAudio || itsMedia && R);
            itsVideo = !itsAudio;
            var ag = itsAudio ? audioMarker : videoMarker;
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

    var functionSix = function (z) {
        var someImprotantNumericValue = 0;

        var xheckerFunction = function (K) {
            var J = z("a", K);
            return (someImprotantNumericValue = J.length) > 0;
        };
        var C = function (M, H, K) {
            var G = "data:image/gif;base64,R0lGODlhDgAOALMAAP9dXf9sbP9SUv+lpf+8vP+0tP+srMwAAP/29v/Bwf9+fv90dP9kZP95ef/////g4CH5BAAAAAAALAAAAAAOAA4AQARL8MhJawE4ayPJ+ovjgAshDWiqop3ivrB5FEEdiHZQSIbgC4/HT8A5JI7I5LHTaDYQCGdDRrPhbLsZY8uAchlZgya4OQ3PgkFlTYkAADs=";
            M.html("<div style=\"height: 100%; background-color: #000;\"><table style=\"width: 100%; height: 100%; border: 0; border-collapse: collapse; vertical-align: middle; text-align: center;\"><tr><td><div style=\"width: 140px; min-height: 14px; font: 10px/10px Verdana; color: #fff; display: inline-block; padding-left: 18px; border: 12px solid #333; background: #333 url(" + G + ") no-repeat 0 center;\">" + K + "</div></td></tr></table></div><div style=\"text-align: right; height: 14px; margin-top: -14px; padding-right: 2px; font: 10px/10px Verdana; color: #555;\"></div>");
            if (H != videoMarker) {
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
            var O = N.hasClass("bbaudio") ? audioMarker : N.hasClass("bbvideo") ? videoMarker : N.hasClass("bbmedia") ? mediaMarker : false;
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
                if (M[3] !== undefined && O == mediaMarker) {
                    O = M[3];
                }
            }
            var I = functionFour(H, J, Q, O, "https:" == document.location.protocol);
            if (!xheckerFunction(N)) {
                A(N, O);
            } else {
                if (!I) {
                    e(N, O);
                } else {
                    if (someImprotantNumericValue) {
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