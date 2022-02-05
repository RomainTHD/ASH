import assert from "assert";

/**
 * Transform a string to an HTML element
 * @param str String element
 * @param raw If false, the string will be enclosed in a <div> tag
 * @returns HTML element
 */
export function stringToHTML(str: string, raw = false): HTMLElement {
    if (!raw) {
        str = `<div>${str}</div>`;
    }

    const template     = document.createElement("template");
    template.innerHTML = str.trim();

    const elt = template.content.firstElementChild;
    assert(elt !== null, "stringToHTML: no element in template");
    assert(elt instanceof HTMLElement, "stringToHTML: element is not an HTMLElement");
    return elt as HTMLElement;
}

/**
 * Strip all HTML tags from a string
 * @param str String
 * @returns String without HTML tags
 */
export function stripHTML(str: string): string {
    return str
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
}
