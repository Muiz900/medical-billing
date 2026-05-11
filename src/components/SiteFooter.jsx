import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "@/lib/router";
import {
  COMPANY_NAME,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_LINKEDIN,
  CONTACT_NAME,
  CONTACT_PHONE,
  CONTACT_PHONE_LINK,
  CONTACT_TWITTER,
  CONTACT_WEBSITE,
} from "@/lib/siteConfig";

function SiteFooter() {
  return <footer className="bg-foreground text-background mt-20">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-bold text-lg">{COMPANY_NAME}</div>
          <p className="mt-3 text-sm opacity-80">
            Helping practices grow with practice management, RCM, IT, virtual care, and back-office support.
          </p>
          {CONTACT_NAME && CONTACT_NAME !== COMPANY_NAME ? (
            <p className="mt-4 text-sm opacity-80">Primary contact: {CONTACT_NAME}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-3 text-sm opacity-80">
            {CONTACT_WEBSITE ? (
              <a href={CONTACT_WEBSITE} target="_blank" rel="noreferrer">
                Website
              </a>
            ) : null}
            {CONTACT_LINKEDIN ? (
              <a href={CONTACT_LINKEDIN} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            ) : null}
            {CONTACT_TWITTER ? (
              <a href={CONTACT_TWITTER} target="_blank" rel="noreferrer">
                X / Twitter
              </a>
            ) : null}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/new-practice-setup">New Practice Setup</Link></li>
            <li><Link to="/practice-management">Practice Management</Link></li>
            <li><Link to="/financial-management">Financial Management</Link></li>
            <li><Link to="/revenue-cycle-management">Revenue Cycle Management</Link></li>
            <li><Link to="/credentialing-services">Credentialing</Link></li>
            <li><Link to="/it-services">IT Services</Link></li>
            <li><Link to="/clinical-services">Clinical Services</Link></li>
            <li><Link to="/back-office-services">Back Office</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/our-difference">Our Difference</Link></li>
            <li><Link to="/partners">Partners</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5" /><a href={CONTACT_PHONE_LINK}>{CONTACT_PHONE}</a></li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5" /><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5" />{CONTACT_ADDRESS}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs opacity-70">
          (c) {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </div>
      </div>
    </footer>;
}

export {
  SiteFooter as default
};
