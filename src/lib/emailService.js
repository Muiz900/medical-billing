import emailjs from "@emailjs/browser";

// ─────────────────────────────────────────────────────────────
//  EmailJS Configuration
//  Shared service ID and public key across all forms.
//  Each form uses its own template ID.
// ─────────────────────────────────────────────────────────────

const EMAILJS_SERVICE_ID  = "service_etsagns";
const EMAILJS_PUBLIC_KEY  = "1wIn2bORxzGqgtkq5";

// Template for "Get In Touch" contact form
const EMAILJS_CONTACT_TEMPLATE_ID = "template_y4qhjkd";

// Template for "Free Revenue Leak Check" diagnostic form
// ACTION REQUIRED: Create a new template in EmailJS and paste its ID below.
// Template variables needed: {{specialty}}, {{monthly_claims_volume}},
// {{current_ar_days}}, {{denial_rate}}, {{credentialing_pain_points}}
const EMAILJS_REVENUE_LEAK_TEMPLATE_ID = "template_4vzipzj"; // ← replace with your real template ID

/**
 * Send the Get In Touch contact form data via EmailJS.
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
    to_name:       "CoverRCM",
  };

  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_CONTACT_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY,
  );
}

/**
 * Send the Free Revenue Leak Check diagnostic data via EmailJS.
 *
 * @param {{
 *   specialty: string,
 *   monthly_claims_volume: string,
 *   current_ar_days: string,
 *   denial_rate: string,
 *   credentialing_pain_points: string,
 * }} data
 */
export async function sendRevenueLeak(data) {
  const templateParams = {
    specialty:                  data.specialty,
    monthly_claims_volume:      data.monthly_claims_volume,
    current_ar_days:            data.current_ar_days,
    denial_rate:                data.denial_rate,
    credentialing_pain_points:  data.credentialing_pain_points,
    to_name:                    "CoverRCM",
  };

  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_REVENUE_LEAK_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY,
  );
}
