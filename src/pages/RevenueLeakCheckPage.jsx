import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Loader2,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import {
  getHoverLift,
  getTapPress,
  premiumEase,
} from "@/components/motion";
import { sendRevenueLeak } from "@/lib/emailService";

// --- Constants
const CALENDLY_URL = "https://calendly.com/cure-billing-service/30min";
const CALENDLY_SRC = "https://assets.calendly.com/assets/external/widget.js";

const SPECIALTIES = [
  "Primary Care", "Family Medicine", "Internal Medicine", "Pediatrics",
  "Cardiology", "Dermatology", "Orthopedics", "Neurology", "Gastroenterology",
  "Pulmonology", "Oncology", "Urology", "OB/GYN", "Psychiatry", "Psychology",
  "Behavioral Health", "Physical Therapy", "Occupational Therapy",
  "Speech Therapy", "Chiropractic", "Pain Management", "Radiology",
  "Anesthesiology", "General Surgery", "Other",
];

const AR_DAYS_OPTIONS = ["0-30 days", "31-60 days", "61-90 days", "90+ days"];

const DENIAL_RATE_OPTIONS = [
  "<3% - Excellent",
  "3-5% - Very Good / Strong RCM",
  "5-8% - Good / Acceptable",
  "8-10% - Needs Improvement",
  "10-15% - High Risk",
  ">15% - Critical (Significant Revenue Leak)",
];

const CREDENTIALING_OPTIONS = [
  "Payer delays",
  "Re-credentialing",
  "Provider onboarding",
  "Out-of-network issues",
];

const inputBase =
  "w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary";
const labelBase = "mb-1.5 block text-sm font-semibold text-foreground";

// --- Sub-components
function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {msg}
    </p>
  );
}

function SelectField({ label, required, value, onChange, onBlur, options, placeholder, error, touched }) {
  return (
    <div>
      <label className={labelBase}>
        {label}{required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${inputBase} appearance-none pr-10 ${touched && error ? "border-red-400 bg-red-50/30" : "border-border"}`}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      <FieldError msg={touched && error} />
    </div>
  );
}

function ChipMultiSelect({ options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              active
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {active && <CheckCircle2 className="h-3.5 w-3.5" />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function CalendlyWidget() {
  const containerRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!document.querySelector(`script[src="${CALENDLY_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = CALENDLY_SRC;
      s.async = true;
      document.body.appendChild(s);
    }
    if (window.Calendly && containerRef.current && !initialized.current) {
      initialized.current = true;
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: containerRef.current,
        prefill: {},
        utm: {},
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget w-full overflow-hidden rounded-2xl border border-border"
      data-url={CALENDLY_URL}
      style={{ minWidth: 320, height: 700 }}
    />
  );
}

function StepBadge({ number, label, active }) {
  return (
    <div className={`flex items-center gap-3 ${active ? "text-foreground" : "text-muted-foreground"}`}>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-2 ${
          active
            ? "bg-primary text-primary-foreground ring-primary"
            : "bg-secondary text-muted-foreground ring-border"
        }`}
      >
        {number}
      </span>
      <span className="text-sm font-semibold uppercase tracking-wide">{label}</span>
    </div>
  );
}

// --- Main Page
export default function RevenueLeakCheckPage() {
  const shouldReduceMotion = useReducedMotion();
  const calendlyRef = useRef(null);

  const [values, setValues] = useState({
    specialty: "",
    claimsVolume: "",
    arDays: "",
    denialRate: "",
    credentialingPains: [],
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle");
  const submitting = submitStatus === "loading";
  const succeeded = submitStatus === "success";

  function setField(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function touchField(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function toggleCredentialing(opt) {
    setValues((prev) => {
      const next = prev.credentialingPains.includes(opt)
        ? prev.credentialingPains.filter((o) => o !== opt)
        : [...prev.credentialingPains, opt];
      return { ...prev, credentialingPains: next };
    });
  }

  function validate() {
    const e = {};
    if (!values.specialty) e.specialty = "Please select your specialty.";
    if (!values.claimsVolume || isNaN(Number(values.claimsVolume)) || Number(values.claimsVolume) < 0)
      e.claimsVolume = "Please enter a valid positive number.";
    if (!values.arDays) e.arDays = "Please select your A/R days range.";
    if (!values.denialRate) e.denialRate = "Please select your denial rate.";
    return e;
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (submitting || succeeded) return;
    setTouched({ specialty: true, claimsVolume: true, arDays: true, denialRate: true });
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitStatus("loading");
    try {
      await sendRevenueLeak({
        specialty: values.specialty,
        monthly_claims_volume: values.claimsVolume,
        current_ar_days: values.arDays,
        denial_rate: values.denialRate,
        credentialing_pain_points:
          values.credentialingPains.length > 0
            ? values.credentialingPains.join(", ")
            : "None selected",
      });
      setSubmitStatus("success");
      setTimeout(() => {
        calendlyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    } catch {
      setSubmitStatus("error");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, submitting, succeeded]);

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="bg-primary px-6 py-20 text-primary-foreground md:px-16 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal direction="up">
            <div className="mb-4 inline-flex rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1 text-xs uppercase tracking-widest text-primary-foreground/80 backdrop-blur">
              Free Revenue Leak Check
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Find Where Your Practice Is Losing Revenue
            </h1>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/85">
              Answer a few quick questions about your practice and discover where your revenue cycle may have opportunities for improvement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 md:px-8">

        {/* Step 1 */}
        <section className="mt-14">
          <Reveal direction="up">
            <div className="mb-6 flex items-center justify-between">
              <StepBadge number={1} label="Practice Snapshot" active={!succeeded} />
              {succeeded && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                  <CheckCircle2 className="h-4 w-4" /> Submitted
                </span>
              )}
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Tell Us About Your Practice</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                These quick details help us understand your current revenue-cycle situation before your review.{" "}
                <span className="text-red-500">*</span> Required fields.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <SelectField
                    label="Specialty"
                    required
                    value={values.specialty}
                    onChange={(e) => setField("specialty", e.target.value)}
                    onBlur={() => touchField("specialty")}
                    options={SPECIALTIES}
                    placeholder="Select your specialty"
                    error={errors.specialty}
                    touched={touched.specialty}
                  />

                  <div>
                    <label className={labelBase}>
                      Monthly Claims Volume <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={values.claimsVolume}
                      onChange={(e) => setField("claimsVolume", e.target.value)}
                      onBlur={() => touchField("claimsVolume")}
                      placeholder="e.g. 500"
                      className={`${inputBase} ${touched.claimsVolume && errors.claimsVolume ? "border-red-400 bg-red-50/30" : "border-border"}`}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Approximate number of claims submitted per month.</p>
                    <FieldError msg={touched.claimsVolume && errors.claimsVolume} />
                  </div>

                  <SelectField
                    label="Current A/R Days"
                    required
                    value={values.arDays}
                    onChange={(e) => setField("arDays", e.target.value)}
                    onBlur={() => touchField("arDays")}
                    options={AR_DAYS_OPTIONS}
                    placeholder="Select A/R days range"
                    error={errors.arDays}
                    touched={touched.arDays}
                  />

                  <SelectField
                    label="Current Denial Rate"
                    required
                    value={values.denialRate}
                    onChange={(e) => setField("denialRate", e.target.value)}
                    onBlur={() => touchField("denialRate")}
                    options={DENIAL_RATE_OPTIONS}
                    placeholder="Select denial rate"
                    error={errors.denialRate}
                    touched={touched.denialRate}
                  />
                </div>

                <div className="mt-5">
                  <label className={labelBase}>
                    Credentialing Pain Points{" "}
                    <span className="text-xs font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <ChipMultiSelect
                    options={CREDENTIALING_OPTIONS}
                    selected={values.credentialingPains}
                    onToggle={toggleCredentialing}
                  />
                </div>

                <AnimatePresence>
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24 }}
                      className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>We could not submit your information. Please try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={submitting || succeeded}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-base font-semibold text-accent-foreground shadow-md transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
                  whileHover={submitting || succeeded ? {} : getHoverLift(shouldReduceMotion, -4)}
                  whileTap={submitting || succeeded ? {} : getTapPress(shouldReduceMotion)}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Preparing Your Free Review...
                    </>
                  ) : succeeded ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Information Submitted
                    </>
                  ) : (
                    <>
                      Continue to Free Revenue Review
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </Reveal>
        </section>

        {/* Divider */}
        <div className="mt-10 flex justify-center">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-500 ${succeeded ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"}`}>
            <ArrowRight className="h-5 w-5 rotate-90" />
          </div>
        </div>

        {/* Step 2 */}
        <section ref={calendlyRef} className="mt-10 scroll-mt-24">
          <Reveal direction="up">
            <div className="mb-6">
              <StepBadge number={2} label="Schedule Your Free Revenue Review" active={succeeded} />
            </div>

            <div className={`rounded-3xl border border-border bg-card p-6 shadow-sm transition-opacity duration-500 md:p-10 ${succeeded ? "opacity-100" : "pointer-events-none select-none opacity-40"}`}>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Schedule Your Free Revenue Review</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose a convenient time to speak with the CoverRCM team. Your practice information has already been collected above.
              </p>

              <AnimatePresence>
                {succeeded && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: premiumEase }}
                    className="mt-5 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm text-foreground">
                      Your information has been received. Now choose a convenient time for your free revenue review.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6">
                <CalendlyWidget />
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
