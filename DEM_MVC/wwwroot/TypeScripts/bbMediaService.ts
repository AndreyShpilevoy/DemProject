/// <reference path="../TypingsForTypeScript/tsd.d.ts" />

class BbMediaService {
    cssSelector = ".bbCodeMedia:not(.bbCodeMedia-processed)";

    createFrame(urlLink: string, width: number, height: number) {
        return `<iframe style="vertical-align: bottom; width: ${width}px; height: ${height}px;" width="${width}" height="${height}" src="${urlLink}" webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe>`;
    }

    createObjectWithEmbed(urlLink: string, width: number, height: number, params: any) {
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
    }

    processLink(sourceLink: string, itsHttps: boolean): string {//todo delete tagType
        var frameWidth = 640;
        var frameHeight = 360;
        var httpType = true ? "https" : "http";//todo change check
        var parsedSourceLink: RegExpMatchArray;
        var resultLink: string;
        sourceLink = jQuery.trim(sourceLink);

        //youtube playlist
        if ((parsedSourceLink = sourceLink.match(/(?:www\.)?youtube(?:-nocookie)?\.com\/(?:playlist\?(?:.*&)?list=|embed\/videoseries\?(?:.*&)?list=|p\/|view_play_list\?(?:.*&)?p=)([-_\w\d]+)/i))) {
            return this.createFrame(`${httpType}://www.youtube.com/embed/videoseries?list=${parsedSourceLink[1]}`, frameWidth, frameHeight);
        }

        //youtube video
        if ((parsedSourceLink = sourceLink.match(/(?:www\.)?(?:youtu\.be\/|(?:m\.)?youtube(?:-nocookie)?\.com\/(?:(?:watch|movie)\?(?:.*&)?v=|embed\/|v\/|attribution_link.*watch%3Fv%3D))([-_\w\d]+)(?:.*(?:[&?]start|[?&#]t)=(?:(\d+)h)?(?:(\d+)m)?(\d+)?)?/i))) {
            var startVideoFromSecond = parsedSourceLink[2] ? parsedSourceLink[2] : 0 * 3600 + parsedSourceLink[3] ? parsedSourceLink[3] : 0 * 60 + parsedSourceLink[4] ? parsedSourceLink[4] : 0;
            return this.createFrame(`${httpType}://www.youtube.com/embed/${parsedSourceLink[1]}${startVideoFromSecond ? "?" + "start=" + startVideoFromSecond : ""}`, frameWidth, frameHeight);
        }

        //vimeo video
        if ((parsedSourceLink = sourceLink.match(/(?:www\.)?(?:vimeo\.com|player\.vimeo\.com\/video)\/(\d+)/i))) {
            return this.createFrame(`${httpType}://player.vimeo.com/video/${parsedSourceLink[1]}`, frameWidth, frameHeight);
        }

        //vk video
        if ((parsedSourceLink = sourceLink.match(/(?:vk\.com|vkontakte\.ru)\/video_ext\.php\?oid=([-_\w\d]+)&id=([-_\w\d]+)&hash=([-_\w\d]+)(&sd|&hd=1|&hd=2|)/i))) {
            return this.createFrame(`${httpType}://vk.com/video_ext.php?oid=${parsedSourceLink[1]}&id=${parsedSourceLink[2]}&hash=${parsedSourceLink[3]}${parsedSourceLink[4]}`, frameWidth, frameHeight);
        }

        //facebook video
        if ((parsedSourceLink = sourceLink.match(/(?:[-.\w\d]+?\.)?facebook\.com\/(?:(?:video\/video|video|photo)\.php\?(?:.*&)?v=|video\/embed\?(?:.*&)?video_id=|v\/|[-_.\w\d]+\/videos\/)([-_\w\d]+)/i))) {
            return this.createFrame(`${httpType}://www.facebook.com/video/embed?video_id=${parsedSourceLink[1]}`, frameWidth, frameHeight);
        }

        //twitch video
        if ((parsedSourceLink = sourceLink.match(/((?:\w+\.)?twitch\.tv)\/([-_\w\d]+)(?:\/([bc])\/(\d+))?/i))) {
            if (parsedSourceLink[3]) {
                return this.createObjectWithEmbed("http://www.twitch.tv/widgets/archive_embed_player.swf", frameWidth, frameHeight, {
                    flashvars: (parsedSourceLink[3].toLowerCase() === "b" ? "archive_id=" : "chapter_id=") + parsedSourceLink[4] + "&channel=" + parsedSourceLink[2] + "&auto_play=false"
                });
            } else {
                return this.createObjectWithEmbed("http://www.twitch.tv/widgets/live_embed_player.swf", frameWidth, frameHeight, {
                    flashvars: `hostname=${parsedSourceLink[1]}&channel=${parsedSourceLink[2]}&auto_play=false`,
                    allowscriptaccess: "always"
                });
            }
        }

        //coub video
        if ((parsedSourceLink = sourceLink.match(/(?:www\.)?coub\.com\/(?:view|embed)\/([-_\w\d]+)/i))) {
            return this.createFrame(`${httpType}://coub.com/embed/${parsedSourceLink[1]}`, frameWidth, frameHeight);
        }

        //soundcloud music
        if ((parsedSourceLink = sourceLink.match(/(api\.soundcloud\.com(?:\/|%2F)(?:tracks|playlists)(?:\/|%2F).*(?=\"\>))/i))) {
            var itsPlayList = !!parsedSourceLink[0].match(/(\/|%2F)(playlists)(\/|%2F)/i);
            //return this.createObjectWithEmbed(`https://player.soundcloud.com/player.swf?show_comments=true&auto_play=false&color=ff7700&url=${encodeURIComponent(decodeURIComponent(parsedSourceLink[0]))}`, (frameWidth ? frameWidth : 300), itsPlayList ? 225 : 81, undefined);
            return this.createFrame(`${httpType}://w.soundcloud.com/player/?url=https%3A//${parsedSourceLink[0]}`, (frameWidth ? frameWidth : 300), itsPlayList ? 300 : 81);
        }

        //yandex music todo need check
        if ((parsedSourceLink = sourceLink.match(/music\.yandex\.(?:ru|by|ua|kz)\/(?:.*#!\/)?(?:track|embed|album\/[^/]+\/track)\/(\d+)/i))) {
            return this.createObjectWithEmbed(`http://music.yandex.ru/embed/${parsedSourceLink[1]}/track.swf`, (frameWidth ? frameWidth : 300), 48, {
                scale: "noscale",
                flashvars: "bg-color=%23F2F2F2&amp;text-color=%23777777&amp;hover-text-color=%23000000"
            });
        }

        //yandex video todo need check
        if ((parsedSourceLink = sourceLink.match(/(?:video\.yandex\.(?:ru|by|ua|kz)\/iframe|(?:static|streaming)\.video\.yandex\.(?:ru|by|ua|kz)\/lite)\/([^\/"'<>]+)\/([^\/"'<>]+)/i))) {
            return this.createFrame(`${httpType}://video.yandex.ru/iframe/${parsedSourceLink[1]}/${parsedSourceLink[2]}/`, frameWidth, frameHeight);
        }

        //google maps todo need check
        if ((parsedSourceLink = sourceLink.match(/(?:www\.)?google(?:\.com)?\.\w+\/maps\/(?:place\/[^\/]+\/)?@(-?\d+\.\d+),(-?\d+\.\d+),(\d+)([zm])/i))) {
            resultLink = `${httpType}://maps.google.com/maps?ll=${parsedSourceLink[1]},${parsedSourceLink[2]}`;
            if (parsedSourceLink[4] === "z") {
                resultLink += `&t=m&z=${parsedSourceLink[3]}`;
            } else {
                var strangeNumber = 377;
                var zoomLevel = 18;
                var strangeDiference = Math.abs(strangeNumber - parseInt(parsedSourceLink[3]));
                for (var i = 17; i >= 3; i--) {
                    strangeNumber *= 2;
                    var otherStrangeDiference = Math.abs(strangeNumber - parseInt(parsedSourceLink[3]));
                    if (otherStrangeDiference < strangeDiference) {
                        strangeDiference = otherStrangeDiference;
                        zoomLevel = i;
                    }
                }
                resultLink += `&t=h&z=${zoomLevel}`;
            }
            return this.createFrame(`${resultLink}&output=embed`, frameWidth ? frameWidth : 640, frameHeight ? frameHeight : 480);
        }

        //var sourceLinkMatchAudioFormats = sourceLink.match(/\.(ogg|oga|opus|webma|mp3|aac|m4a|wav)(?:\s*;|$)/i);
        //var sourceLinkMatchVideoFormats = sourceLink.match(/\.(ogv|webm|webmv|mp4|m4v)(?:\s*;|$)/i);
        //if (itsMedia && (sourceLinkMatchAudioFormats || sourceLinkMatchVideoFormats) && !(sourceLinkMatchAudioFormats && sourceLinkMatchVideoFormats) || itsAudio && sourceLinkMatchAudioFormats || itsVideo && sourceLinkMatchVideoFormats) {
        //    itsAudio = (itsAudio || itsMedia && sourceLinkMatchAudioFormats);
        //    itsVideo = !itsAudio;
        //    var videoOrMediaVariable = itsAudio ? "audio" : "video";
        //    var Q = jQuery.extend({
        //        ogg: "ogg",
        //        webm: "webm",
        //        mp4: "mp4"
        //    }, itsAudio ? {
        //        oga: "ogg",
        //        opus: "opus",
        //        webma: "webm",
        //        mp3: "mpeg",
        //        aac: "aac",
        //        m4a: "mp4",
        //        wav: "wav"
        //    } : {
        //                ogv: "ogg",
        //                webmv: "webm",
        //                m4v: "mp4"
        //            });
        //    var ab = sourceLink.split(/\s*;\s*/);
        //    var T = "";
        //    var L = "";
        //    var t = "";
        //    jQuery.each(ab, function (aj, ai) {
        //        if (parsedSourceLink = ai.match(/^(?:https?:\/\/)?[^:"']*\.(ogg|oga|ogv|opus|webm|webma|webmv|mp3|aac|mp4|m4a|m4v|wav)$/i)) {
        //            var ak = parsedSourceLink[1];
        //            if (Q[ak] === undefined) {
        //                T = "";
        //                return false;
        //            }
        //            var al = videoOrMediaVariable + "/" + Q[ak];
        //            T += "<source src=\"" + ai + "\" type=\"" + al + "\">";
        //            L += (L ? ", " : "") + "<a href=\"" + ai + "\">" + parsedSourceLink[1].toUpperCase() + "</a>";
        //        } else {
        //            if (itsVideo && !t && ai.match(/^(?:https?:\/\/)?[^:"']*\.(png|jpg|gif|webp)$/i)) {
        //                t = ai;
        //            } else {
        //                T = "";
        //                return false;
        //            }
        //        }
        //    });
        //    if (T) {
        //        return (itsAudio ? "<audio controls>" : "<video width=\"" + frameWidth + "\" height=\"" + frameHeight + "\" controls" + (t ? " poster=\"" + t + "\">" : ">")) + T + L + (itsAudio ? "</audio>" : "</video>");
        //    }
        //}
        return undefined;
    }

    createError(divContainer) {
        var imageBase64 = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIzSURBVHjabJLPaxNBFMe/M7NJdjebxLShaGgtUhAhQSheBBGJiAje1aL48yIFKSiKV2+CCJ7Ev0Do/6AtVPTqJQFvDbVJNpXE/M5mZ3fWtysJrfjgLTuz7/PmO9+3LAgCRPH85TI9Lbx5XcF/YnL/USHw5BUlve/m5scdFoEhJEQ1fA8mkyJ/9/YIPLn3sEDfyywRh9s82KQGr/gUQiIB6DrAedlbf1KYQs7dBwUwVhZWEvFcDrF0+qZy5VUWPHuhB0oNYRicpVJQvR5UpwPljIskC4wa8XSKgAyc2j4mDdtXUhqRVLXxVA98f8AMQ3Aq8LsdeL/bCAgU1CyWScPZr8GxbZ9kWtmtTw6bmuM9XteV5w+4aQotewzwFaDC9OmkEGr+hbY/O2E9n95F+/DeCaS0ZKulIH2gWgV2d6kBgQ1bKenOoCNgGKR9hTHa8z1ASpLhRckE52TIyuHaGTheu0PuoSwMk4oJyucpT0RgIpOB0ES5uXpu5nZ0x9Gt2wXGWVkzk6HdGDfqcJrN0D2mZ+d4Mn8co4aNUb0Otz8o5n9UKmx4Y60QWq6ZJkEWxnUbzkEIeRaZQfK9gTE/J1JLixjWGxiSUW6/X9So6wKPaUCgMK41MCaIxmDNf92JjLDPrlqDWm0QuK6IJZPhXEGjW4ikdq9dL/FYbEv2uuSel8x9++IcNqJ++kw053gqJZx2+/LSXnUb0f9J2bp4qfTr/AV9uv43fy6f0vcWT5am6z8CDADQZUthDwq2GQAAAABJRU5ErkJggg==";
        divContainer.html("<div style=\"height: 100%; background-color: #000;\"><table style=\"width: 100%; height: 100%; border: 0; border-collapse: collapse; vertical-align: middle; text-align: center;\"><tr><td><div style=\"width: 140px; min-height: 14px; font: 10px/10px Verdana; color: #fff; display: inline-block; padding-left: 18px; border: 12px solid #333; background: #333 url(" + imageBase64 + ") no-repeat 0 center;\">Sorry, this URL is not supported</div></td></tr></table></div><div style=\"text-align: right; height: 14px; margin-top: -14px; padding-right: 2px; font: 10px/10px Verdana; color: #555;\"></div>");
        divContainer.css("width", "400px").css("height", "80px");
    }

    processHtmlDivElement(divContainer: JQuery, thisClass: BbMediaService) {
        if (divContainer.hasClass("bbCodeMedia-processed")) {
            return;
        }
        divContainer.addClass("bbCodeMedia-processed");
        var decodedUrl = divContainer.attr("data-url").replace(/&amp;/ig, "&");
        var I = thisClass.processLink(decodedUrl, "https:" == document.location.protocol);
        if (!I) {
            thisClass.createError(divContainer);
        } else {
            var R = jQuery(I);
            var J = R.attr("width");
            var Q = R.attr("height");
            divContainer.css("width", J).css("height", Q).empty().append(R);
        }
    }

    initBbCodeMediaService() {
        //call wwwwFunction foreach Div, that satisfies the conditions. As params use Div element and this Class.
        jQuery(this.cssSelector, document.body).each((index: number, element: HTMLDivElement) => {
            this.processHtmlDivElement(jQuery(element), this);
        });
    }
}