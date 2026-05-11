const DEFAULT_COMPANY_NAME = "Midsouth Healthcare Management";
const DEFAULT_CONTACT_EMAIL = "info@mhmconsultants.net";
const DEFAULT_CONTACT_PHONE = "+1 (901) 756-5565";
const DEFAULT_CONTACT_ADDRESS = "Memphis, TN";
const DEFAULT_SITE_DESCRIPTION =
  "Healthcare management consulting for physician practices, including practice management, revenue cycle, credentialing, IT, and back-office support.";

export const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME || DEFAULT_COMPANY_NAME;
export const CONTACT_NAME = import.meta.env.VITE_CONTACT_NAME || COMPANY_NAME;
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL;
export const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE || DEFAULT_CONTACT_PHONE;
export const CONTACT_WEBSITE = import.meta.env.VITE_CONTACT_WEBSITE || "";
export const CONTACT_LINKEDIN = import.meta.env.VITE_CONTACT_LINKEDIN || "";
export const CONTACT_TWITTER = import.meta.env.VITE_CONTACT_TWITTER || "";
export const CONTACT_ADDRESS = import.meta.env.VITE_CONTACT_ADDRESS || DEFAULT_CONTACT_ADDRESS;
export const CONTACT_PHONE_LINK = `tel:${CONTACT_PHONE.replace(/[^+0-9]/g, "")}`;
export const CONTACT_EMAIL_LINK = `mailto:${CONTACT_EMAIL}`;
export const COMPANY_INITIAL = (COMPANY_NAME.trim().charAt(0) || "M").toUpperCase();
export const SITE_DESCRIPTION = import.meta.env.VITE_SITE_DESCRIPTION || DEFAULT_SITE_DESCRIPTION;

const SITE_TEXT_REPLACEMENTS = [
  [/Midsouth Healthcare Management Consultants/g, COMPANY_NAME],
  [/Midsouth Healthcare Management/g, COMPANY_NAME],
  [/MHM Consultants/g, COMPANY_NAME],
  [/\+1-901-756-5565/g, CONTACT_PHONE],
  [/\+1 \(901\) 756-5565/g, CONTACT_PHONE],
  [/\(901\) 237-7410/g, CONTACT_PHONE],
  [/info@midsouthhealthcare\.com/g, CONTACT_EMAIL],
  [/info@mhmconsultants\.net/g, CONTACT_EMAIL],
  [/764 Walnut Knoll Lane, Cordova, TN 38018/g, CONTACT_ADDRESS],
  [/Memphis, Tennessee/g, CONTACT_ADDRESS],
  [/Memphis, TN/g, CONTACT_ADDRESS],
];

export function replaceSiteDetails(value) {
  if (typeof value !== "string" || !value) {
    return value;
  }

  return SITE_TEXT_REPLACEMENTS.reduce((result, [pattern, replacement]) => {
    if (!replacement) {
      return result;
    }

    return result.replace(pattern, replacement);
  }, value);
}

function sanitizeSiteContent(value) {
  if (typeof value === "string") {
    return replaceSiteDetails(value);
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeSiteContent);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, key === "src" ? entry : sanitizeSiteContent(entry)]),
    );
  }

  return value;
}

export function withSiteDetails(value) {
  return sanitizeSiteContent(value);
}
