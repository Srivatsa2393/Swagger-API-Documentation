'use strict';

Handlebars.registerHelper('sanitize', function(html) {
    // Strip the script tags from the html, and return it as a Handlebars.SafeString
	//Sanitizes strings for safe use in URLs and file names
	//jQuery uses a regex(regular expressions) to remove script tags in some cases and I'm pretty sure its devs had a damn good reason to do so. 
	//Probably some browser does execute scripts when inserting them using innerHTML
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    return new Handlebars.SafeString(html);
});