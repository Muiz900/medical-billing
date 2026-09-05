import emailjs from "@emailjs/browser";

// ─────────────────────────────────────────────────────────────
//  EmailJS Configuration
//  1. Go to https://www.emailjs.com and create a free account
//  2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
//  3. Create an Email Template → copy the Template ID
//  4. Go to Account → API Keys → copy your Public Key
//  Then replace the three placeholders below with your real values.
// ─────────────────────────────────────────────────────────────

const EMAILJS_SERVICE_ID  = "service_etsagns";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_y4qhjkd";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "1wIn2bORxzGqgtkq5";   // e.g. "aBcDeFgHiJkLmNoPq"

/**
 * Send the contact form data to the company inbox via EmailJS.
 *
 * The template variables used here must match the ones you set up
 * inside your EmailJS template (use {{from_name}}, {{clinic_name}}, etc.).
 *
 * @param {{ name: string, clinicName: string, phone: string, email: string, message: string, practiceType: string }} data
 * @returns {Promise<void>}
 */
export async function sendContactForm(data) {
  const templateParams = {
    from_name:     data.name,
    clinic_name:   data.clinicName,
    from_phone:    data.phone,
    from_email:    data.email,
    message:       data.message,
    practice_type: data.practiceType,
    number_of_providers: data.number_of_providers,
    monthly_revenue: data.monthly_revenue,
    // Sent to the address configured in your EmailJS service / template
    to_name:       "CoverRCM",
  };

  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY,
  );
}
