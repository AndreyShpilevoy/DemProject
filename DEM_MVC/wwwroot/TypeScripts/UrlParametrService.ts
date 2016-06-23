﻿/// <reference path="../TypingsForTypeScript/browser.d.ts" />

class UrlParametrService {
    pageUrl: string;
    urlVariablesArray: string[];
    searchingParamName: string;
    nameValueParamArray: string[];

    constructor() {
        this.pageUrl = decodeURIComponent(window.location.search.substring(1));
        this.urlVariablesArray = this.pageUrl.split("&");
    }

    getParametrByName(parameterName: string) :string {
        this.searchingParamName = parameterName;

        for (var i = 0; i < this.urlVariablesArray.length; i++) {
            this.nameValueParamArray = this.urlVariablesArray[i].split("=");

            if (this.nameValueParamArray[0] === this.searchingParamName) {
                return this.nameValueParamArray[1] === undefined ? null : this.nameValueParamArray[1];
            }
        }
    }
}