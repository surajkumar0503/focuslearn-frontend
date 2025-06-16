export function sanitizeText(text) {
    if (!text) return "";
    return text
      .replace(/[^\x20-\x7E\n]/g, "") // Remove non-printable/non-ASCII
      .replace(/(^|\s)[Tt][Ee]\b(?=\s|[.,!?])/gi, "$1The") // Fix "Te"/"te"
      .replace(/undefined|null/g, "")
      .replace(/Ufortunately|Unortunately/g, "Unfortunately")
      .replace(/\bSice\b/gi, "Since")
      .replace(/Te\s*workshop/gi, "") // Remove "Te workshop"
      .replace(/[^\w\s.,!?]/g, "") // Remove special characters
      .trim();
    }