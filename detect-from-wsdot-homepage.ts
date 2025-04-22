/**
 * Detects if the WSDOT Website is currently "going orange for safety" by fetching the homepage
 * and looking for a link ending with "give-em-brake" or an element with the text "We're orange for safety".
 * @param url - The URL of the WSDOT homepage.
 * @returns True if a "go orange" link is found, false otherwise.
 */
export async function detectGoOrangeViaWsdotHomepage(url: string | URL = "https://wsdot.wa.gov/") {
	// Fetch the WSDOT homepage.
	const response = await fetch(url);
	const html = await response.text();

	// Parse the HTML text into a Document via a DOMParser.
	const domParser = new DOMParser();
	const wsdotDocument = domParser.parseFromString(html, "text/html");

	// Look for a link ending with "give-em-brake".
	let goOrangeLink = wsdotDocument.body.querySelector(
		"a[href$='give-em-brake']",
	);

	// If a link was found, return true.
	if (goOrangeLink) {
		return true;
	}

	// Look for an element with the text "We're orange for safety".
	goOrangeLink =
		// Select all of the anchor elements.
		// Put the NodeList elements into an array so we can use the filter function.
		[...document.body.querySelectorAll("a")]
			// Filter out any elements that don't have text and don't end with "We're orange for safety".
			.filter((a) => a.text != null && /We're orange for safety/i.test(a.text))
			// Get the first element in the array, if there is one.
			.at(0) ?? null;

	// If an element was found, return true. Return false otherwise.
	return !!goOrangeLink;
}
