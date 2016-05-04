import * as $ from 'jquery';

/*****************************************/
// by kto: 15/dec/2015
// parts of Javascript Textarea BBCode Markup Editor Version: 1.3 was used
/******************************************/

	export default function doAddTags(tag1: string, tag2: string, textAreaId: string) {
		var textarea = (<HTMLInputElement>$(`#${textAreaId}`)[0]);
		var selectedValue: string;

		if (tag1 === "[url]") {
			doURL(textarea);
		}
		// Code for Mozilla Firefox
		else {
			var len = textarea.value.length;
			var start = textarea.selectionStart;
			var end = textarea.selectionEnd;

			var scrollTop = textarea.scrollTop;
			var scrollLeft = textarea.scrollLeft;


			selectedValue = textarea.value.substring(start, end);
			if (selectedValue.length === 0 && tag1 === "[img]") {
				doImage(textarea);
			} else {
				var rep = tag1 + selectedValue + tag2;
				textarea.value = textarea.value.substring(0, start) + rep + textarea.value.substring(end, len);

				textarea.scrollTop = scrollTop;
				textarea.scrollLeft = scrollLeft;
			}
		}
	}

	function doImage(textarea: HTMLInputElement) {
		var url = prompt("Enter the Image URL:", "http://");
		var scrollTop = textarea.scrollTop;
		var scrollLeft = textarea.scrollLeft;

		if (url !== "" && url != null) {

			var length = textarea.value.length;
			var start = textarea.selectionStart;
			var end = textarea.selectionEnd;

			var replaceValue = "[img]" + url + "[/img]";
			textarea.value = textarea.value.substring(0, start) + replaceValue + textarea.value.substring(end, length);

			textarea.scrollTop = scrollTop;
			textarea.scrollLeft = scrollLeft;
		}
	}

	function doURL(textarea: HTMLInputElement) {
		var url = prompt("Enter the URL:", "http://");
		var scrollTop = textarea.scrollTop;
		var scrollLeft = textarea.scrollLeft;
		var selectedValue: string;
		var replaceValue: string;;

		if (url !== "" && url != null) {

			var length = textarea.value.length;
			var start = textarea.selectionStart;
			var end = textarea.selectionEnd;

			selectedValue = textarea.value.substring(start, end);

			if (selectedValue === "") {
				replaceValue = "[url]" + url + "[/url]";
			} else {
				replaceValue = "[url=" + url + "]" + selectedValue + "[/url]";
			}

			textarea.value = textarea.value.substring(0, start) + replaceValue + textarea.value.substring(end, length);


			textarea.scrollTop = scrollTop;
			textarea.scrollLeft = scrollLeft;
		}
	}