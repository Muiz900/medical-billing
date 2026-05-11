import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Phone, Plus, Stethoscope, Building2, Network, Star, Quote } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE || "+1 (901) 756-5565";
const CONTACT_PHONE_LINK = `tel:${CONTACT_PHONE.replace(/[^+0-9]/g, "")}`;
import s1 from "@/assets/service-1.jpg";
import s2 from "@/assets/service-2.jpg";
import s3 from "@/assets/service-3.jpg";
import s4 from "@/assets/service-4.jpg";
import s5 from "@/assets/service-5.jpg";
const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Midsouth Healthcare Management \u2014 Manage your practice with ease" },
      { name: "description", content: "Healthcare practice management consulting: RCM, credentialing, IT, virtual care, and back-office support." },
      { property: "og:title", content: "Midsouth Healthcare Management" },
      { property: "og:description", content: "Let us do the work while you focus on growth and patient care." }
    ]
  }),
  component: Index
});
const services = [
  {
    title: "We set up new practices \u2013 and help manage existing ones",
    desc: "From negotiating leases and establishing your billing systems, to expanding your insurance network and providing 360-degree virtual assistance, we do it all.",
    items: ["New Practice Setup", "Practice Management Evaluation", "Accounts Receivable Management", "Finance & Accounting Management"],
    img: s1
  },
  {
    title: "We reduce your time spent managing finances",
    desc: "Let us take on all the stress of billing, coding, and denials with RCM, and let our credentialing experts keep you in-network and above-board with licensing.",
    items: ["Revenue Cycle Management", "Credentialing Services"],
    img: s2
  },
  {
    title: "We install and monitor your network and workspaces",
    desc: "To keep you running smoothly and safely, our IT services do the most for your data security, network support, EHRS, workstations, and more.",
    items: ["Electronic Health Record System", "Clinic Workflow Evaluation & Design", "Network Design & Support"],
    img: s3
  },
  {
    title: "We provide virtual care assistance to your patients",
    desc: "Chronic care management and remote patient monitoring ensure your patient gets consistent care in-between appointments.",
    items: ["Chronic Care Management", "Remote Patient Monitoring"],
    img: s4
  },
  {
    title: "We help with your back-office operations",
    desc: "Whatever happens in the background of a practice helps it run seamlessly. We help with invoices, accounts payable, inventory assignment, and more.",
    items: ["Back-Office Processes & Documentation"],
    img: s5
  }
];
const audience = [
  { icon: Stethoscope, label: "Solo Practitioners" },
  { icon: Building2, label: "Health Clinics" },
  { icon: Network, label: "Health Networks" }
];
const stats = [
  { v: "96%", l: "of clients are growing" },
  { v: "8/10", l: "report happier staff" },
  { v: "2x", l: "growth in just one year" }
];
const steps = [
  { n: "1", t: "Book a discovery call", d: "Tell us about your practice and where you need help most." },
  { n: "2", t: "Choose your services", d: "We tailor a plan to your operations, finances, and IT." },
  { n: "3", t: "Watch your practice grow", d: "We handle the rest \u2014 you focus on patient care." }
];
const triageItems = [
  "I want to spend more time with patients",
  "I'm not sure if we're compliant / I need help with compliance",
  "I'm worried about security of data",
  "My staff spends too much time on paperwork",
  "I need to expand our network of insurance coverage"
];
const testimonials = [
  { name: "Rusty Osbourne", text: "We at Pain Spine And Sports Medicine are so grateful that we have Midsouth Healthcare Management as our medical billing company. Extremely knowledgeable team that is very easy to work with." },
  { name: "Kanwal Chaudry", text: "An all encompassing service from start up to everything needed to make a medical practice successful. The team is absolutely wonderful. Peace of mind and customer service at its best." },
  { name: "HappyKids Pediatrics", text: "Always received the best support and services. Professionalism, a wealth of experience, dedication, honesty, and going the extra mile to help the practice succeed." },
  { name: "Christopher Price Cunningham", text: "Rizwan and his team are extremely hard working. Dedicated to IT support always working to ensure customer satisfaction." }
];
const faqs = [
  { q: "Are you HIPAA-compliant?", a: "Yes! We are HIPAA compliant, and we help practices maintain compliance, too." },
  { q: "How long have you been in business?", a: "We've been serving the healthcare sector for 35+ years." },
  { q: "Why is credentialing important for healthcare providers?", a: "Credentialing ensures providers are recognized by insurance companies, allowing them to be in-network \u2014 leading to increased patient volume and revenue." },
  { q: "Do you assist with Electronic Health Record Systems?", a: "We provide comprehensive setup and training for EHRS, tailored to your practice, plus ongoing support and management." },
  { q: "Do you offer free consultations?", a: "We offer 'discovery calls' which are free, quick, and give you a direction to start in with us." }
];
function Logo() {
  return <div className="flex items-center gap-2 text-primary-foreground">
      <div className="grid grid-cols-2 grid-rows-2 gap-0.5">
        <div className="h-3 w-3 border-2 border-current" />
        <div className="h-3 w-3 bg-current" />
        <div className="h-3 w-3 bg-current" />
        <div className="h-3 w-3 border-2 border-current" />
      </div>
      <div className="text-xs font-bold leading-tight tracking-wider">
        MIDSOUTH<br />HEALTHCARE<br />MANAGEMENT
      </div>
    </div>;
}
function Header() {
  return <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-6 md:p-8">
      <Logo />
      <button className="flex items-center gap-2 rounded-md border border-primary-foreground/40 bg-primary-foreground/10 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur hover:bg-primary-foreground/20 transition">
        <span className="flex flex-col gap-1">
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </span>
        Menu
      </button>
    </header>;
}
function Hero() {
  return <section className="relative overflow-hidden rounded-b-[2rem] md:m-4 md:rounded-[2rem]">
      <img src={heroImg} alt="Healthcare professionals collaborating" width={1600} height={1024} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />
      <Header />
      <div className="relative z-10 px-6 pb-12 pt-40 md:px-16 md:pb-20 md:pt-56">
        <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-primary-foreground md:text-7xl lg:text-8xl">
          Manage your practice with ease.
        </h1>
        <div className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-end">
          <p className="max-w-xs text-base text-primary-foreground/90 md:text-right">
            Let us do the work while you focus on growth and patient care.
          </p>
          <a href="tel:+1-901-756-5565" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition hover:scale-105 hover:bg-accent/90">
            <Phone className="h-4 w-4" /> Schedule a Call <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>;
}
function ServicesSection() {
  return <section className="px-6 py-20 md:px-16 md:py-32">
      <p className="mx-auto max-w-3xl text-center text-2xl font-medium leading-relaxed text-foreground md:text-3xl">
        We keep you compliant, streamline and enhance operations, and reduce workloads for your staff. <span className="text-primary">Here's how.</span>
      </p>
      <div className="mt-20 space-y-24">
        {services.map((s, i) => <div key={i} className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
            <div>
              <h3 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">{s.title}</h3>
              <p className="mt-4 text-base text-muted-foreground">{s.desc}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {s.items.map((it) => <li key={it} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">
                    <Plus className="h-3.5 w-3.5 text-primary" /> {it}
                  </li>)}
              </ul>
              <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                Read More <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
              <img src={s.img} alt="" loading="lazy" width={1024} height={768} className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-xl" />
            </div>
          </div>)}
      </div>
      <div className="mt-16 text-center">
        <button className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-transparent px-8 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
          View All Services <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>;
}
function WhoWeServe() {
  return <section className="bg-secondary px-6 py-20 md:px-16">
      <h2 className="text-center text-4xl font-bold text-foreground md:text-5xl">Who We Serve</h2>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {audience.map(({ icon: Icon, label }) => <div key={label} className="group rounded-3xl bg-card p-10 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-10 w-10" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">{label}</h3>
          </div>)}
      </div>
    </section>;
}
function Stats() {
  return <section className="bg-primary px-6 py-20 text-primary-foreground md:px-16">
      <h2 className="text-center text-4xl font-bold md:text-5xl">Our data speaks volumes</h2>
      <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
        {stats.map((s) => <div key={s.l} className="text-center">
            <div className="text-6xl font-bold text-accent md:text-7xl">{s.v}</div>
            <div className="mt-2 text-base text-primary-foreground/80">{s.l}</div>
          </div>)}
      </div>
    </section>;
}
function HowItWorks() {
  return <section className="px-6 py-20 md:px-16 md:py-28">
      <h2 className="text-center text-4xl font-bold text-foreground md:text-5xl">Here's how it works</h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
        Three simple steps to a smoother, more profitable practice.
      </p>
      <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
        {steps.map((step) => <div key={step.n} className="relative rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="absolute -top-6 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground shadow-lg">
              {step.n}
            </div>
            <h3 className="mt-6 text-xl font-bold text-foreground">{step.t}</h3>
            <p className="mt-3 text-muted-foreground">{step.d}</p>
          </div>)}
      </div>
    </section>;
}
function Triage() {
  const [checked, setChecked] = useState(/* @__PURE__ */ new Set());
  const [show, setShow] = useState(false);
  const toggle = (i) => {
    const next = new Set(checked);
    next.has(i) ? next.delete(i) : next.add(i);
    setChecked(next);
  };
  return <section className="bg-secondary px-6 py-20 md:px-16">
      <div className="mx-auto max-w-3xl rounded-3xl bg-card p-8 shadow-lg md:p-12">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">Triage your Business</h2>
        <p className="mt-3 text-muted-foreground">Check off each that apply and see which area you need help in most:</p>
        <div className="mt-8 space-y-3">
          {triageItems.map((it, i) => <label key={i} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition hover:border-primary hover:bg-secondary">
              <input type="checkbox" checked={checked.has(i)} onChange={() => toggle(i)} className="sr-only" />
              <span className={`flex h-6 w-6 items-center justify-center rounded-md border-2 ${checked.has(i) ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                {checked.has(i) && <Check className="h-4 w-4" />}
              </span>
              <span className="text-foreground">{it}</span>
            </label>)}
        </div>
        <button onClick={() => setShow(true)} className="mt-8 w-full rounded-full bg-accent py-3 font-semibold text-accent-foreground transition hover:bg-accent/90">
          Generate Results
        </button>
        {show && checked.size > 0 && <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="font-semibold text-foreground">Recommended Services for You</h3>
            <ul className="mt-3 space-y-2">
              {Array.from(checked).map((i) => <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" /> {triageItems[i]}
                </li>)}
            </ul>
          </div>}
      </div>
    </section>;
}
function Testimonials() {
  return <section className="px-6 py-20 md:px-16 md:py-28">
      <h2 className="text-center text-4xl font-bold text-foreground md:text-5xl">Hear what your peers have to say</h2>
      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
        {testimonials.map((t) => <div key={t.name} className="relative rounded-3xl border border-border bg-card p-8 shadow-sm">
            <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/15" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
            </div>
            <p className="mt-4 text-foreground">{t.text}</p>
            <p className="mt-4 font-semibold text-foreground">{t.name}</p>
          </div>)}
      </div>
    </section>;
}
function ContactForm() {
  return <section className="bg-primary px-6 py-20 text-primary-foreground md:px-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-bold md:text-5xl">Request A Discovery Call</h2>
          <p className="mt-4 text-primary-foreground/80">
            Tell us a bit about your practice and we'll reach out within one business day.
          </p>
          <div className="mt-8 space-y-3 text-primary-foreground/90">
            <p className="flex items-center gap-3"><Phone className="h-4 w-4" /> {CONTACT_PHONE}</p>
          </div>
        </div>
        <form className="rounded-3xl bg-card p-8 text-foreground shadow-2xl">
          <h3 className="text-2xl font-bold">Get In Touch</h3>
          <div className="mt-6 grid gap-4">
            {["Name", "Clinic Name", "Phone", "Email"].map((p) => <input key={p} placeholder={p} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary" />)}
            <textarea placeholder="Message" rows={4} className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary" />
            <select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary">
              <option>Existing Practice</option>
              <option>New Practice Setup</option>
            </select>
            <button type="button" className="mt-2 rounded-full bg-accent py-3 font-semibold text-accent-foreground transition hover:bg-accent/90">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>;
}
function FAQ() {
  const [open, setOpen] = useState(0);
  return <section className="px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-4xl font-bold text-foreground md:text-5xl">FAQs</h2>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-6 text-left">
                <span className="font-semibold text-foreground">{f.q}</span>
                <Plus className={`h-5 w-5 flex-shrink-0 text-primary transition ${open === i ? "rotate-45" : ""}`} />
              </button>
              {open === i && <div className="px-6 pb-6 text-muted-foreground">{f.a}</div>}
            </div>)}
        </div>
      </div>
    </section>;
}
function Footer() {
  return <footer className="bg-foreground px-6 py-12 text-background md:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <Logo />
        <p className="text-sm text-background/60">© {(/* @__PURE__ */ new Date()).getFullYear()} Midsouth Healthcare Management. All rights reserved.</p>
      </div>
    </footer>;
}
function Index() {
  return <div className="min-h-screen bg-background">
      <Hero />
      <ServicesSection />
      <WhoWeServe />
      <Stats />
      <HowItWorks />
      <Triage />
      <Testimonials />
      <ContactForm />
      <FAQ />
      <Footer />
    </div>;
}
export {
  Route
};
