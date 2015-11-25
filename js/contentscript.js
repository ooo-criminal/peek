/*
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
*/

function findURL(url){
	var img = document.createElement('img');
	img.src = url; // Set string url
	url = img.src; // Get qualified url
	img.src = null; // No server request
	return url;
}

// Google Docs viewer for files NOT on Google Docs
function previewDocs(object) {
	var url = findURL(object.attr("href"));
	console.log("[Peek] Found supported document link: " + url);
	$(object).tooltipster({
		interactive: true,
		delay: '0',
		theme: 'tooltipster-peek',
		content: $('<embed style="border: 0px; width: 400px; height: 300px;" src="https://docs.google.com/gview?url=' + url + '&embedded=true"><div style="font-family: Roboto !important; font-size: 14px !important; text-align: left !important; line-height: 14px !important; color: #FFF !important; padding: 4px !important; margin-top: 3px !important; max-width: 400px !important;">Powered by Peek<span class="peeksettings"></span></div>')
	});
}

// Google Docs viewer for files HOSTED on Google Docs
function previewHostedDocs(object) {
	var url = findURL(object.attr("href"));
	var docsid = url.substring(url.lastIndexOf("/d/")+3,url.lastIndexOf("/edit")); // Find ID of Google Docs file
	console.log("[Peek] Found Google Docs link: " + url + "\n[Peek] ID of above Google Docs link identified as: " + docsid);
	$(object).tooltipster({
		interactive: true,
		delay: '0',
		theme: 'tooltipster-peek',
		content: $('<embed style="border: 0px; width: 400px; height: 300px;" src="https://docs.google.com/spreadsheets/d/' + docsid + '/pubhtml?widget=true&amp;headers=false"><div style="font-family: Roboto !important; font-size: 14px !important; text-align: left !important; line-height: 14px !important; color: #FFF !important; padding: 4px !important; margin-top: 3px !important; max-width: 400px !important;">Powered by Peek<span class="peeksettings"></span></div>')
	});
}

// Office Online viewer
function previewOffice(object) {
	var url = findURL(object.attr("href"));
	console.log("[Peek] Found supported document link: " + url);
	$(object).tooltipster({
		interactive: true,
		delay: '0',
		theme: 'tooltipster-peek',
		content: $('<embed style="border: 0px; width: 400px; height: 300px;" src="https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURI(url) + '"><div style="font-family: Roboto !important; font-size: 14px !important; text-align: left !important; line-height: 14px !important; color: #FFF !important; padding: 4px !important; margin-top: 3px !important; max-width: 400px !important;">Powered by Peek<span class="peeksettings"></span></div>')
	});
}

// HTML5 video player
function previewVideo(object, type) {
	var url = findURL(object.attr("href"));
	console.log("[Peek] Found supported video link: " + url);
	$(object).tooltipster({
		interactive: true,
		delay: '0',
		theme: 'tooltipster-peek',
		content: $('<video controls><source src="' + url + '" type="' + type + '"></video><div style="font-family: Roboto !important; font-size: 14px !important; text-align: left !important; line-height: 14px !important; color: #FFF !important; padding: 4px !important; margin-top: 3px !important; max-width: 400px !important;">Powered by Peek<span class="peeksettings"></span></div>')
	});
}

// F4Player
function previewFlash(object) {
	var url = findURL(object.attr("href"));
	console.log("[Peek] Found supported Flash Player link: " + url);
	$(object).tooltipster({
		interactive: true,
		delay: '0',
		theme: 'tooltipster-peek',
		content: $('<embed type="application/x-shockwave-flash" src="http://gokercebeci.com/data/dev/f4player/player.swf?v1.3.5" class="flashplayer" flashvars="skin=http://gokercebeci.com/data/dev/f4player/skins/mySkin.swf&video=' + url + '" allowscriptaccess="always" allowfullscreen="false" bgcolor="#727272"/><div style="font-family: Roboto !important; font-size: 14px !important; text-align: left !important; line-height: 14px !important; color: #FFF !important; padding: 4px !important; margin-top: 3px !important; max-width: 400px !important;">Powered by Peek<span class="peeksettings"></span></div>')
	});
}

// HTML5 audio player
function previewAudio(object, type) {
	var url = findURL(object.attr("href"));
	console.log("[Peek] Found supported audio link: " + url);
	$(object).tooltipster({
		interactive: true,
		delay: '0',
		theme: 'tooltipster-peek',
		content: $('<audio controls><source src="' + url + '" type="' + type + '"></audio><div style="font-family: Roboto !important; font-size: 14px !important; text-align: left !important; line-height: 14px !important; color: #FFF !important; padding: 4px !important; margin-top: 3px !important; max-width: 400px !important;">Powered by Peek<span class="peeksettings"></span></div>')
	});
}

// Peek Settings button
$(document).on('click', ".peeksettings", function() {
	window.open(chrome.extension.getURL("settings.html"));
	return false;
});

function reloadTooltips() {

	// Video files

	$("a[href$='.webm']").each(function() {
		previewVideo($(this), "video/webm");
	});
	$("a[href$='.mp4']").each(function() {
		previewVideo($(this), "video/mp4");
	});
	$("a[href$='.ogg']").each(function() {
		previewVideo($(this), "video/ogg");
	});
	$("a[href$='.ogv']").each(function() {
		previewVideo($(this), "video/ogg");
	});

	// Flash files

	$("a[href$='.flv']").each(function() {
		previewFlash($(this));
	});
	$("a[href$='.f4v']").each(function() {
		previewFlash($(this));
	});

	// Audio files

	$("a[href$='.mp3']").each(function() {
		previewAudio($(this), "audio/mpeg");
	});
	$("a[href$='.wav']").each(function() {
		previewAudio($(this), "audio/wav");
	});

	// Google Docs links

	$("a[href^='https://docs.google.com']").each(function() {
		previewHostedDocs($(this));
	});

	// Office documents

	chrome.runtime.sendMessage({method: "getLocalStorage", key: "docviewer"}, function(response) {
		if (response.data === "google") {
			$("a[href$='.doc']").each(function() {
				previewDocs($(this));
			});
			$("a[href$='.docx']").each(function() {
				previewDocs($(this));
			});
			$("a[href$='.xls']").each(function() {
				previewDocs($(this));
			});
			$("a[href$='.xlsx']").each(function() {
				previewDocs($(this));
			});
			$("a[href$='.ppt']").each(function() {
				previewDocs($(this));
			});
			$("a[href$='.pptx']").each(function() {
				previewDocs($(this));
			});
		} else {
			$("a[href$='.doc']").each(function() {
				previewOffice($(this));
			});
			$("a[href$='.docx']").each(function() {
				previewOffice($(this));
			});
			$("a[href$='.xls']").each(function() {
				previewOffice($(this));
			});
			$("a[href$='.xlsx']").each(function() {
				previewOffice($(this));
			});
			$("a[href$='.ppt']").each(function() {
				previewOffice($(this));
			});
			$("a[href$='.pptx']").each(function() {
				previewOffice($(this));
			});
		}
	});

	// Other Documents

	$("a[href$='.pdf']").each(function() {
		previewDocs($(this));
	});
	$("a[href$='.rtf']").each(function() {
		previewDocs($(this));
	});

}

// Initialize tooltips for initial page load
$( document ).ready(function() {
	reloadTooltips();
});

// Initialize tooltips every time DOM is modified
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		console.log("[Peek] DOM change detected, reinitializing previews");
		reloadTooltips();
	});
});

var observerConfig = {
	attributes: true,
	childList: true,
	characterData: true
};

var targetNode = document.body;
observer.observe(targetNode, observerConfig);
