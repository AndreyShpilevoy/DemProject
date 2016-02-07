/// <reference path="../TypingsForTypeScript/tsd.d.ts" />

class BbCodeService {
    private spoilerCssProcessedSelector: string;
    private spoilerCssSelector: string;
    private codeCssProcessedSelector: string;
    private codeCssSelector: string;
    private mediaCssProcessedSelector: string;
    private mediaCssSelector: string;

    constructor() {
            this.spoilerCssProcessedSelector = "spoilerbox-processed";
            this.spoilerCssSelector = `.spoilerbox:not(.${this.spoilerCssProcessedSelector})`;

            this.codeCssProcessedSelector = "codebox-processed";
            this.codeCssSelector = `.codebox:not(.${this.codeCssProcessedSelector})`;

            this.mediaCssProcessedSelector = "bbCodeMedia-processed";
            this.mediaCssSelector = `.bbCodeMedia:not(.${this.mediaCssProcessedSelector})`;
    }

    processSpoilerBbCodes() {
        $(this.spoilerCssSelector, document.body).each((index: number, element: HTMLDivElement) => {
            this.registerSpoilerBbCodesEvent($(element), this);
        });
    }

    private registerSpoilerBbCodesEvent(divContainer: JQuery, self: BbCodeService) {
        //if element was processed before - return
        if (self.checkIfElementProcessedBeforeAndMarkIfNot(divContainer, this.spoilerCssProcessedSelector)) {
            return;
        }
        $(divContainer).find(">dt").on("click", () => {
            self.changeSpoilerState(divContainer);
        });
    }

    private changeSpoilerState(divContainer: JQuery) {
        $(divContainer).toggleClass("spoilerbox-on");
    }


    processCodeBbCodes() {
        $(this.codeCssSelector, document.body).each((index: number, element: HTMLDivElement) => {
            this.registerCodeBbCodesEvent($(element), this);
        });
    }

    private registerCodeBbCodesEvent(divContainer: JQuery, self: BbCodeService) {
        //if element was processed before - return
        if (self.checkIfElementProcessedBeforeAndMarkIfNot(divContainer, this.codeCssProcessedSelector)) {
            return;
        }
        $(divContainer).find(" > dt > span").on("click", () => {
            self.selectCode(divContainer);
        });
    }

    private selectCode(divContainer: JQuery) {
        if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents($(divContainer).find("code")[0]);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand("copy");
        }
    }


    processMediaBbCodes(): void {
        //call wwwwFunction foreach Div, that satisfies the conditions. As params use Div element and this Class.
        $(this.mediaCssSelector, document.body).each((index: number, element: HTMLDivElement) => {
            this.processHtmlDivElement($(element), this);
        });
    }

    private processHtmlDivElement(divContainer: JQuery, self: BbCodeService): void {
        //if element was processed before - return
        if (self.checkIfElementProcessedBeforeAndMarkIfNot(divContainer, this.mediaCssProcessedSelector)) {
            return;
        }

        var decodedUrl = divContainer.attr("data-url").replace(/&amp;/ig, "&");
        var resultStringItem = self.processLink(decodedUrl, self);

        //if result is not valid - create error message
        if (!resultStringItem) {
            divContainer.html(`<div class="bbCodeMedia-error">Sorry, this URL is not supported</div>`);
        } else {
            var resultStringObject = $(resultStringItem);
            divContainer.css("width", resultStringObject.attr("width")).css("height", resultStringObject.attr("height")).empty().append(resultStringObject);
        }
    }

    private processLink(sourceLink: string, self: BbCodeService): string {
        var frameWidth = 640;
        var frameHeight = 360;
        var audioPlaylistFrameHeight = 640;
        var parsedSourceLink: RegExpMatchArray;
        var resultLink: string;
        sourceLink = $.trim(sourceLink);

        //youtube playlist
        if ((parsedSourceLink = sourceLink.match(/(?:www\.)?youtube(?:-nocookie)?\.com\/(?:playlist\?(?:.*&)?list=|embed\/videoseries\?(?:.*&)?list=|p\/|view_play_list\?(?:.*&)?p=)([-_\w\d]+)/i))) {
            return this.createFrame(`https://www.youtube.com/embed/videoseries?list=${parsedSourceLink[1]}`, frameWidth, frameHeight);
        }

        //youtube video
        if ((parsedSourceLink = sourceLink.match(/(?:www\.)?(?:youtu\.be\/|(?:m\.)?youtube(?:-nocookie)?\.com\/(?:(?:watch|movie)\?(?:.*&)?v=|embed\/|v\/|attribution_link.*watch%3Fv%3D))([-_\w\d]+)(?:.*(?:[&?]start|[?&#]t)=(?:(\d+)h)?(?:(\d+)m)?(\d+)?)?/i))) {
            var startVideoFromSecond = parsedSourceLink[2] ? parsedSourceLink[2] : 0 * 3600 + parsedSourceLink[3] ? parsedSourceLink[3] : 0 * 60 + parsedSourceLink[4] ? parsedSourceLink[4] : 0;
            return this.createFrame(`https://www.youtube.com/embed/${parsedSourceLink[1]}${startVideoFromSecond ? `?start=${startVideoFromSecond}` : ""}`, frameWidth, frameHeight);
        }

        //vimeo video
        if ((parsedSourceLink = sourceLink.match(/(?:www\.)?(?:vimeo\.com|player\.vimeo\.com\/video)\/(\d+)/i))) {
            return this.createFrame(`https://player.vimeo.com/video/${parsedSourceLink[1]}`, frameWidth, frameHeight);
        }

        //vk video
        if ((parsedSourceLink = sourceLink.match(/(?:vk\.com|vkontakte\.ru)\/video_ext\.php\?oid=([-_\w\d]+)&id=([-_\w\d]+)&hash=([-_\w\d]+)(&sd|&hd=1|&hd=2|)/i))) {
            return this.createFrame(`https://vk.com/video_ext.php?oid=${parsedSourceLink[1]}&id=${parsedSourceLink[2]}&hash=${parsedSourceLink[3]}${parsedSourceLink[4]}`, frameWidth, frameHeight);
        }

        //facebook video
        if ((parsedSourceLink = sourceLink.match(/(?:[-.\w\d]+?\.)?facebook\.com\/(?:(?:video\/video|video|photo)\.php\?(?:.*&)?v=|video\/embed\?(?:.*&)?video_id=|v\/|[-_.\w\d]+\/videos\/)([-_\w\d]+)/i))) {
            return this.createFrame(`https://www.facebook.com/video/embed?video_id=${parsedSourceLink[1]}`, frameWidth, frameHeight);
        }

        //twitch video
        if ((parsedSourceLink = sourceLink.match(/(player\.twitch\.tv\/\?channel=([^\"]+))/i))) {
            return this.createFrame(`https://${parsedSourceLink[1]}`, frameWidth, frameHeight);
        }

        //coub video
        if ((parsedSourceLink = sourceLink.match(/(?:www\.)?coub\.com\/(?:view|embed)\/([-_\w\d]+)/i))) {
            return this.createFrame(`https://coub.com/embed/${parsedSourceLink[1]}`, frameWidth, frameHeight);
        }

        //soundcloud music
        if ((parsedSourceLink = sourceLink.match(/(api\.soundcloud\.com(?:\/|%2F)(?:tracks|playlists)(?:\/|%2F).*(?=\"))/i))) {
            var itsPlayList = !!parsedSourceLink[0].match(/(\/|%2F)(playlists)(\/|%2F)/i);
            return this.createFrame(`https://w.soundcloud.com/player/?url=https%3A//${parsedSourceLink[0]}`, frameWidth, itsPlayList ? audioPlaylistFrameHeight : 100);
        }

        //yandex music
        if ((parsedSourceLink = sourceLink.match(/(music\.yandex\.(?:ru|by|ua|kz)\/iframe\/(?:#album|#track)\/(?:\d+\/\d+|\d+))/i))) {
            var itsAlbum = !!parsedSourceLink[0].match(/(#album)/i);
            return this.createFrame(`https://${parsedSourceLink[0]}`, frameWidth, itsAlbum ? audioPlaylistFrameHeight : 100);
        }

        //google maps
        if ((parsedSourceLink = sourceLink.match(/(?:www\.)?google(?:\.com)?\.\w+\/maps\/(?:place\/[^\/]+\/)?@(-?\d+\.\d+),(-?\d+\.\d+),(\d+)([zm])/i))) {
            resultLink = `https://maps.google.com/maps?ll=${parsedSourceLink[1]},${parsedSourceLink[2]}`;
            if (parsedSourceLink[4] === "z") {
                resultLink += `&t=m&z=${parsedSourceLink[3]}`;
            } else {
                var counter = 377;
                var zoomLevel = 18;
                var initialDifference = Math.abs(counter - parseInt(parsedSourceLink[3]));
                for (var i = 17; i >= 3; i--) {
                    counter *= 2;
                    var processedDifference = Math.abs(counter - parseInt(parsedSourceLink[3]));
                    if (processedDifference < initialDifference) {
                        initialDifference = processedDifference;
                        zoomLevel = i;
                    }
                }
                resultLink += `&t=h&z=${zoomLevel}`;
            }
            return this.createFrame(`${resultLink}&output=embed`, frameWidth, frameHeight);
        }

        return self.createHtml5TagFromTheSource(sourceLink, frameWidth, frameHeight);
    }

    private createFrame(urlLink: string, width: number, height: number) {
        return `<iframe style="vertical-align: bottom; width: ${width}px; height: ${height}px;" width="${width}" height="${height}" src="${urlLink}" webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe>`;
    }

    private createHtml5TagFromTheSource(sourceLink: string, frameWidth: number, frameHeight: number): string {
        var parsedSourceLink: RegExpMatchArray;
        var sourceLinkMatchAudioFormats = sourceLink.match(/\.(ogg|oga|opus|webma|mp3|aac|m4a|wav)(?:\s*;|$)/i);
        var sourceLinkMatchVideoFormats = sourceLink.match(/\.(ogv|webm|webmv|mp4|m4v)(?:\s*;|$)/i);
        var audioOrVideoFormats = new Dictionary<string, string>();
        if ((sourceLinkMatchAudioFormats || sourceLinkMatchVideoFormats) && !(sourceLinkMatchAudioFormats && sourceLinkMatchVideoFormats)) {
            var resourceType: string;
            if (sourceLinkMatchAudioFormats) {
                resourceType = "audio";
                audioOrVideoFormats.add("aac", "aac");
                audioOrVideoFormats.add("m4a", "mp4");
                audioOrVideoFormats.add("mp3", "mpeg");
                audioOrVideoFormats.add("mp4", "mp4");
                audioOrVideoFormats.add("oga", "ogg");
                audioOrVideoFormats.add("ogg", "ogg");
                audioOrVideoFormats.add("opus", "opus");
                audioOrVideoFormats.add("wav", "wav");
                audioOrVideoFormats.add("webm", "webm");
                audioOrVideoFormats.add("webma", "webm");

            } else if (sourceLinkMatchVideoFormats) {
                resourceType = "video";
                audioOrVideoFormats.add("m4v", "mp4");
                audioOrVideoFormats.add("mp4", "mp4");
                audioOrVideoFormats.add("ogg", "ogg");
                audioOrVideoFormats.add("ogv", "ogg");
                audioOrVideoFormats.add("webm", "webm");
                audioOrVideoFormats.add("webmv", "webm");
            } else {
                return undefined;
            }

            var sourceLinkCollection = sourceLink.split(/\s*;\s*/);
            var sourceTag = "";
            var aTag = "";
            var posterLink = "";
            $.each(sourceLinkCollection, (index, link) => {
                if ((parsedSourceLink = link.match(/^(?:https?:\/\/)?[^:"']*\.(ogg|oga|ogv|opus|webm|webma|webmv|mp3|aac|mp4|m4a|m4v|wav)$/i))) {
                    var fileFormat = parsedSourceLink[1];
                    if (!audioOrVideoFormats.getValueByKey(fileFormat)) {
                        sourceTag = "";
                        return false;
                    }
                    var type = resourceType + "/" + audioOrVideoFormats.getValueByKey(fileFormat);
                    sourceTag += `<source src="${link}" type="${type}">`;
                    aTag += `${aTag ? ", " : ""}<a href="${link}">${parsedSourceLink[1].toUpperCase()}</a>`;
                } else {
                    if (sourceLinkMatchVideoFormats && !posterLink && link.match(/^(?:https?:\/\/)?[^:"']*\.(png|jpg|gif|webp)$/i)) {
                        posterLink = link;
                    } else {
                        sourceTag = "";
                        return false;
                    }
                }
            });
            if (sourceTag) {
                return (sourceLinkMatchAudioFormats ? "<audio controls>" : `<video width="${frameWidth}" height="${frameHeight}" controls${posterLink ? ` poster="${posterLink}">` : ">"}`) + sourceTag + aTag + (sourceLinkMatchAudioFormats ? "</audio>" : "</video>");
            }
        }
        return undefined;
    }

    private checkIfElementProcessedBeforeAndMarkIfNot(divContainer: JQuery, cssClasProcessed: string): boolean {
        //if element was processed before - return
        if (divContainer.hasClass(cssClasProcessed)) {
            return true;
        }

        divContainer.addClass(cssClasProcessed);
        return false;
    }
}