// BB [media] v1.68 [2015-07-01] (C) 2014 Evgeny Vrublevsky, http://phpbbex.com/
// Licensed under CC BY-NC-ND, http://creativecommons.org/licenses/by-nc-nd/3.0/

(function (window, document, undefined) {

    var createFrame = function (urlLink, width, height) {
        var u = "<iframe style=\"vertical-align: bottom; width: " + width + "px; height: " + height + "px;\" width=\"" + width + "\" height=\"" + height + "\" src=\"" + urlLink + "\" webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe>";
        return u;
    };

    var createObjectWithEmbed = function (urlLink, width, height, params) {
        jQuery.extend(params, {
            allowscriptaccess: "never",
            allowfullscreen: "true"
        });

        var sizeParams = ` width="${width}" height="${height}"`;
        var objectTagWithParams = `<object style="vertical-align: bottom;" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"${sizeParams}><param name="movie" value="${urlLink}" />`;
        var embedTagWithParams = `<embed style="vertical-align: bottom;" type="application/x-shockwave-flash"${sizeParams} src="${urlLink}"`;
        jQuery.each(params, (y, z) => {
            objectTagWithParams += `<param name="${y}" value="${z}" />`;
            embedTagWithParams += ` ${y}="${z}"`;
        });
        return `${objectTagWithParams}${embedTagWithParams}></embed></object>`;
    };

    var processLink = function (sourceLink, frameWidth, frameHeight, tagType, itsHttps) {
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
        var resultLink;
        sourceLink = jQuery.trim(sourceLink);

        //youtube playlist
        if (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/(?:playlist\?(?:.*&)?list=|embed\/videoseries\?(?:.*&)?list=|p\/|view_play_list\?(?:.*&)?p=)([-_\w\d]+)/i)) {
            return createFrame(httpType + "://www.youtube.com/embed/videoseries?list=" + parsedSourceLink[1], frameWidth, frameHeight);
        }

        //youtube video
        if (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?(?:youtu\.be\/|(?:m\.)?youtube(?:-nocookie)?\.com\/(?:(?:watch|movie)\?(?:.*&)?v=|embed\/|v\/|attribution_link.*watch%3Fv%3D))([-_\w\d]+)(?:.*(?:[&?]start|[?&#]t)=(?:(\d+)h)?(?:(\d+)m)?(\d+)?)?/i)) {
            var startVideoFromSecond = parseInt(parsedSourceLink[2] ? parsedSourceLink[2] : 0) * 3600 + parseInt(parsedSourceLink[3] ? parsedSourceLink[3] : 0) * 60 + parseInt(parsedSourceLink[4] ? parsedSourceLink[4] : 0);
            return createFrame(httpType + "://www.youtube.com/embed/" + parsedSourceLink[1] + (startVideoFromSecond ? "?" + "start=" + startVideoFromSecond : ""), frameWidth, frameHeight);
        }

        //vimeo video
        if (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?(?:vimeo\.com|player\.vimeo\.com\/video)\/(\d+)/i)) {
            return createFrame(httpType + "://player.vimeo.com/video/" + parsedSourceLink[1], frameWidth, frameHeight);
        }

        //vk video
        if (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/video_ext\.php\?oid=([-_\w\d]+)&id=([-_\w\d]+)&hash=([-_\w\d]+)(&sd|&hd=1|&hd=2|)/i)) {
            return createFrame(httpType + "://vk.com/video_ext.php?oid=" + parsedSourceLink[1] + "&id=" + parsedSourceLink[2] + "&hash=" + parsedSourceLink[3] + parsedSourceLink[4], frameWidth, frameHeight);
        }

        //facebook video
        if (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:[-.\w\d]+?\.)?facebook\.com\/(?:(?:video\/video|video|photo)\.php\?(?:.*&)?v=|video\/embed\?(?:.*&)?video_id=|v\/|[-_.\w\d]+\/videos\/)([-_\w\d]+)/i)) {
            return createFrame(httpType + "://www.facebook.com/video/embed?video_id=" + parsedSourceLink[1], frameWidth, frameHeight);
        }

        //twitch video
        if (parsedSourceLink = sourceLink.match(/^https?:\/\/((?:\w+\.)?twitch\.tv)\/([-_\w\d]+)(?:\/([bc])\/(\d+))?/i)) {
            if (parsedSourceLink[3]) {
                return createObjectWithEmbed("http://www.twitch.tv/widgets/archive_embed_player.swf", frameWidth, frameHeight, {
                    flashvars: (parsedSourceLink[3].toLowerCase() == "b" ? "archive_id=" : "chapter_id=") + parsedSourceLink[4] + "&channel=" + parsedSourceLink[2] + "&auto_play=false"
                });
            } else {
                return createObjectWithEmbed("http://www.twitch.tv/widgets/live_embed_player.swf", frameWidth, frameHeight, {
                    flashvars: "hostname=" + parsedSourceLink[1] + "&channel=" + parsedSourceLink[2] + "&auto_play=false",
                    allowscriptaccess: "always"
                });
            }
        }
        //coub video
        if (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?coub\.com\/(?:view|embed)\/([-_\w\d]+)/i)) {
            return createFrame(httpType + "://coub.com/embed/" + parsedSourceLink[1], frameWidth, frameHeight);
        }

        //soundcloud music
        if (parsedSourceLink = sourceLink.match(/(^https?:\/\/soundcloud\.com\/[-_\w\d]+\/(?:sets\/)?[-_\w\d]+\/?$|https?(?::\/\/|%3A%2F%2F)api\.soundcloud\.com(?:\/|%2F)(?:tracks|playlists)(?:\/|%2F)\d+)/i)) {
            var M = !!parsedSourceLink[0].match(/(\/|%2F)(sets|playlists)(\/|%2F)/i);
            return createObjectWithEmbed("https://player.soundcloud.com/player.swf?show_comments=true&auto_play=false&color=ff7700&url=" + encodeURIComponent(decodeURIComponent(parsedSourceLink[0])), (frameWidth ? frameWidth : "100%"), M ? 225 : 81);
        }

        //yandex music
        if (parsedSourceLink = sourceLink.match(/^https?:\/\/music\.yandex\.(?:ru|by|ua|kz)\/(?:.*#!\/)?(?:track|embed|album\/[^/]+\/track)\/(\d+)/i)) {
            return createObjectWithEmbed("http://music.yandex.ru/embed/" + parsedSourceLink[1] + "/track.swf", (frameWidth ? frameWidth : "100%"), 48, {
                scale: "noscale",
                flashvars: "bg-color=%23F2F2F2&amp;text-color=%23777777&amp;hover-text-color=%23000000"
            });
        }

        //yandex video
        if (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:video\.yandex\.(?:ru|by|ua|kz)\/iframe|(?:static|streaming)\.video\.yandex\.(?:ru|by|ua|kz)\/lite)\/([^\/"'<>]+)\/([^\/"'<>]+)/i)) {
            if (itsMedia && sourceLink.indexOf("bbaudio") != -1) {
                itsAudio = true;
            }
            return createFrame(httpType + "://video.yandex.ru/iframe/" + parsedSourceLink[1] + "/" + parsedSourceLink[2] + "/", (itsAudio && frameWidth) ? frameWidth : 300, itsAudio ? 72 : frameHeight);
        }

        //google maps
        if (itsMedia && (parsedSourceLink = sourceLink.match(/^https?:\/\/(?:www\.)?google(?:\.com)?\.\w+\/maps\/(?:place\/[^\/]+\/)?@(-?\d+\.\d+),(-?\d+\.\d+),(\d+)([zm])/i))) {
            resultLink = httpType + "://maps.google.com/maps?ll=" + parsedSourceLink[1] + "," + parsedSourceLink[2];
            if (parsedSourceLink[4] == "z") {
                resultLink += "&t=m&z=" + parsedSourceLink[3];
            }
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
            return createFrame(resultLink + "&output=embed", frameWidth ? frameWidth : 640, frameHeight ? frameHeight : 480);
        }




        var sourceLinkMatchAudioFormats = sourceLink.match(/\.(ogg|oga|opus|webma|mp3|aac|m4a|wav)(?:\s*;|$)/i);
        var sourceLinkMatchVideoFormats = sourceLink.match(/\.(ogv|webm|webmv|mp4|m4v)(?:\s*;|$)/i);
        if (itsMedia && (sourceLinkMatchAudioFormats || sourceLinkMatchVideoFormats) && !(sourceLinkMatchAudioFormats && sourceLinkMatchVideoFormats) || itsAudio && sourceLinkMatchAudioFormats || itsVideo && sourceLinkMatchVideoFormats) {
            itsAudio = (itsAudio || itsMedia && sourceLinkMatchAudioFormats);
            itsVideo = !itsAudio;
            var videoOrMediaVariable = itsAudio ? "audio" : "video";
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
                    var al = videoOrMediaVariable + "/" + Q[ak];
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

    var prepareBbCodeMediaService = function (someInsertParam) {

        var errorFunction = function (M, H, K) {
            var imageBase64 = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIzSURBVHjabJLPaxNBFMe/M7NJdjebxLShaGgtUhAhQSheBBGJiAje1aL48yIFKSiKV2+CCJ7Ev0Do/6AtVPTqJQFvDbVJNpXE/M5mZ3fWtysJrfjgLTuz7/PmO9+3LAgCRPH85TI9Lbx5XcF/YnL/USHw5BUlve/m5scdFoEhJEQ1fA8mkyJ/9/YIPLn3sEDfyywRh9s82KQGr/gUQiIB6DrAedlbf1KYQs7dBwUwVhZWEvFcDrF0+qZy5VUWPHuhB0oNYRicpVJQvR5UpwPljIskC4wa8XSKgAyc2j4mDdtXUhqRVLXxVA98f8AMQ3Aq8LsdeL/bCAgU1CyWScPZr8GxbZ9kWtmtTw6bmuM9XteV5w+4aQotewzwFaDC9OmkEGr+hbY/O2E9n95F+/DeCaS0ZKulIH2gWgV2d6kBgQ1bKenOoCNgGKR9hTHa8z1ASpLhRckE52TIyuHaGTheu0PuoSwMk4oJyucpT0RgIpOB0ES5uXpu5nZ0x9Gt2wXGWVkzk6HdGDfqcJrN0D2mZ+d4Mn8co4aNUb0Otz8o5n9UKmx4Y60QWq6ZJkEWxnUbzkEIeRaZQfK9gTE/J1JLixjWGxiSUW6/X9So6wKPaUCgMK41MCaIxmDNf92JjLDPrlqDWm0QuK6IJZPhXEGjW4ikdq9dL/FYbEv2uuSel8x9++IcNqJ++kw053gqJZx2+/LSXnUb0f9J2bp4qfTr/AV9uv43fy6f0vcWT5am6z8CDADQZUthDwq2GQAAAABJRU5ErkJggg==";
            M.html("<div style=\"height: 100%; background-color: #000;\"><table style=\"width: 100%; height: 100%; border: 0; border-collapse: collapse; vertical-align: middle; text-align: center;\"><tr><td><div style=\"width: 140px; min-height: 14px; font: 10px/10px Verdana; color: #fff; display: inline-block; padding-left: 18px; border: 12px solid #333; background: #333 url(" + imageBase64 + ") no-repeat 0 center;\">" + K + "</div></td></tr></table></div><div style=\"text-align: right; height: 14px; margin-top: -14px; padding-right: 2px; font: 10px/10px Verdana; color: #555;\"></div>");
            M.css("width", "400px").css("height", "80px");
        };

        var createErrorViaErrorFunction = function (I, G) {
            errorFunction(I, G, "Sorry, this URL is not supported");
        };

        var E = function (K) {
            var N = someInsertParam(K);
            if (N.hasClass("bbmedia-ready")) {
                return;
            }
            var O = N.hasClass("bbmedia") ? "media" : false;
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
            if (M && (M = someInsertParam.trim(M).replace(/[\s,]+/g, ",").match(/^(\d+)?(?:[,x](\d+))?(?:(?:^|,)(audio|video))?/i))) {
                if (M[1] !== undefined) {
                    J = M[1];
                }
                if (M[2] !== undefined) {
                    Q = M[2];
                }
                if (M[3] !== undefined && O == "media") {
                    O = M[3];
                }
            }
            var I = processLink(H, J, Q, O, "https:" == document.location.protocol);
            if (!I) {
                createErrorViaErrorFunction(N, O);
            } else {
                var R = someInsertParam(I);
                J = R.attr("width");
                Q = R.attr("height");
                N.css("width", J).css("height", Q).empty().append(R);
            }
        };
        var someCss = ".bbaudio:not(.bbmedia-ready), .bbvideo:not(.bbmedia-ready), .bbmedia:not(.bbmedia-ready)";
        var s = function (G) {
            someInsertParam(someCss, G).each(function () {
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
                    if (someInsertParam(K).is(someCss)) {
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

    jQuery(prepareBbCodeMediaService);
})(window, document);