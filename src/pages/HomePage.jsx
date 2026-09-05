import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  Mail,
  Network,
  Phone,
  Plus,
  Quote,
  Star,
  Stethoscope,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import s1 from "@/assets/service-1.jpg";
import s2 from "@/assets/service-2.jpg";
import s3 from "@/assets/service-3.jpg";
import s4 from "@/assets/service-4.jpg";
import s5 from "@/assets/service-5.jpg";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import {
  floatTransition,
  getHoverLift,
  getRevealVariants,
  getStaggerContainer,
  getTapPress,
  premiumEase,
  sectionViewport,
} from "@/components/motion";
import { Link } from "@/lib/router";
import {
  COMPANY_NAME,
  CONTACT_EMAIL,
  CONTACT_EMAIL_LINK,
  CONTACT_PHONE,
  CONTACT_PHONE_LINK,
  replaceSiteDetails,
} from "@/lib/siteConfig";
import logoImg from "@/assets/logo.png";
import { sendContactForm } from "@/lib/emailService";

const services = [
  {
    title: "We set up new practices and help manage existing ones",
    desc: "From negotiating leases and establishing your billing systems, to expanding your insurance network and providing 360-degree virtual assistance, we do it all.",
    items: [
      "New Practice Setup",
      "Practice Management Evaluation",
      "Accounts Receivable Management",
      "Finance & Accounting Management",
    ],
    href: "/new-practice-setup",
    img: s1,
  },
  {
    title: "We reduce your time spent managing finances",
    desc: "Let us take on the stress of billing, coding, and denials with RCM, and let our credentialing experts keep you in-network and above-board with licensing.",
    items: ["Revenue Cycle Management", "Credentialing Services"],
    href: "/revenue-cycle-management",
    img: s2,
  },
  {
    title: "We install and monitor your network and workspaces",
    desc: "To keep you running smoothly and safely, our IT services do the most for your data security, network support, EHRS, workstations, and more.",
    items: [
      "Electronic Health Record System",
      "Clinic Workflow Evaluation & Design",
      "Network Design & Support",
    ],
    href: "/it-services",
    img: s3,
  },
  {
    title: "We provide virtual care assistance to your patients",
    desc: "Chronic care management and remote patient monitoring ensure your patient gets consistent care in-between appointments.",
    items: ["Chronic Care Management", "Remote Patient Monitoring"],
    href: "/clinical-services",
    img: s4,
  },
  {
    title: "We help with your back-office operations",
    desc: "Whatever happens in the background of a practice helps it run seamlessly. We help with invoices, accounts payable, inventory assignment, and more.",
    items: ["Back-Office Processes & Documentation"],
    href: "/back-office-services",
    img: s5,
  },
];

const audience = [
  { icon: Stethoscope, label: "Solo Practitioners" },
  { icon: Building2, label: "Health Clinics" },
  { icon: Network, label: "Health Networks" },
];

const stats = [
  { value: 96, suffix: "%", label: "of clients are growing" },
  { value: 8, suffix: "/10", label: "report happier staff" },
  { value: 2, suffix: "x", label: "growth in just one year" },
];

const steps = [
  { number: "1", title: "Book a discovery call", desc: "Tell us about your practice and where you need help most." },
  { number: "2", title: "Choose your services", desc: "We tailor a plan to your operations, finances, and IT." },
  { number: "3", title: "Watch your practice grow", desc: "We handle the rest while you focus on patient care." },
];


const testimonials = [
  {
    name: "Derrick Jones",
    text: "We are so grateful that we have CoverRCM as our medical billing company. Extremely knowledgeable team that is very easy to work with.",
  },
  {
    name: "O'Brain Ogwanihu",
    text: "An all encompassing service from start up to everything needed to make a medical practice successful. The team is absolutely wonderful. Peace of mind and customer service at its best.",
  },
  {
    name: "Christopher Price",
    text: "Shawn and his team are extremely hard working. Dedicated to IT support always working to ensure customer satisfaction.",
  },
];

const faqs = [
  {
    q: "Are you HIPAA-compliant?",
    a: "Yes. We are HIPAA compliant, and we help practices maintain compliance too.",
  },
  {
    q: "How long have you been in business?",
    a: "Our team brings 15+ years of combined experience serving the healthcare sector.",
  },
  {
    q: "Why is credentialing important for healthcare providers?",
    a: "Credentialing ensures providers are recognized by insurance companies, allowing them to be in-network and helping support patient volume and revenue.",
  },
  {
    q: "Do you assist with Electronic Health Record Systems?",
    a: "We provide comprehensive EHR setup and training tailored to your practice, plus ongoing support and management.",
  },
  {
    q: "Do you offer free consultations?",
    a: "We offer free discovery calls that are quick and give you a clear direction to start with us.",
  },
];

function Logo() {
  return (
    <div className="flex items-center">
      <div className="rounded-2xl bg-white px-3 py-2 shadow-md">
        <img src={logoImg} alt={COMPANY_NAME} className="h-10 w-auto" />
      </div>
    </div>
  );
}

function HeroHeader() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-6 md:p-8"
      initial={shouldReduceMotion ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: premiumEase, delay: 0.15 }}
    >
      <Logo />
      <motion.div whileHover={getHoverLift(shouldReduceMotion, -3)} whileTap={getTapPress(shouldReduceMotion)}>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur transition hover:bg-primary-foreground/20"
        >
          <Phone className="h-4 w-4" />
          Contact Us
        </Link>
      </motion.div>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useSpring(
    useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 84]),
    { stiffness: 120, damping: 24, mass: 0.5 }
  );
  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -44]),
    { stiffness: 120, damping: 24, mass: 0.45 }
  );
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.18, 0.46]);

  return (
    <section ref={ref} className="relative overflow-hidden rounded-b-[2rem] md:m-4 md:rounded-[2rem]">
      <motion.img
        src={heroImg}
        alt="Healthcare professionals collaborating"
        width={1600}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ y: imageY, scale: shouldReduceMotion ? 1 : 1.06 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-foreground/35 via-foreground/15 to-foreground/65"
        style={{ opacity: overlayOpacity }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-20 top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
        animate={shouldReduceMotion ? {} : { y: [0, -24, 0], x: [0, -18, 0], scale: [1, 1.08, 1] }}
        transition={floatTransition}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -left-20 bottom-12 h-72 w-72 rounded-full bg-primary-foreground/12 blur-3xl"
        animate={shouldReduceMotion ? {} : { y: [0, 20, 0], x: [0, 12, 0] }}
        transition={{ ...floatTransition, duration: 5.4 }}
      />
      <HeroHeader />
      <motion.div className="relative z-10 px-6 pb-12 pt-40 md:px-16 md:pb-20 md:pt-56" style={{ y: contentY }}>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, ease: premiumEase, delay: 0.22 }}
        >
          <div className="mb-5 inline-flex rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1 text-xs uppercase tracking-[0.28em] text-primary-foreground/80 backdrop-blur">
            Strategy. Operations. Growth.
          </div>
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-primary-foreground md:text-7xl lg:text-8xl">
            Manage your practice with ease.
          </h1>
        </motion.div>
        <motion.div
          className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-end"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, ease: premiumEase, delay: 0.32 }}
        >
          <p className="max-w-xs text-base text-primary-foreground/90 md:text-right">
            Let us do the work while you focus on growth and patient care.
          </p>
          <motion.a
            href={CONTACT_PHONE_LINK}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg"
            whileHover={getHoverLift(shouldReduceMotion, -4)}
            whileTap={getTapPress(shouldReduceMotion)}
          >
            <Phone className="h-4 w-4" />
            Schedule a Call
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ServiceRow({ service, index }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useSpring(
    useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [30, -30]),
    { stiffness: 110, damping: 22, mass: 0.5 }
  );
  const imageRotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-1.6, 1.6]);
  const textDirection = index % 2 ? "right" : "left";
  const imageDirection = index % 2 ? "left" : "right";

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
        index % 2 ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      <Reveal direction={textDirection} className="space-y-0">
        <div>
          <h3 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">{service.title}</h3>
          <p className="mt-4 text-base text-muted-foreground">{service.desc}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {service.items.map((item, itemIndex) => (
              <Reveal key={item} direction={itemIndex % 2 ? "zoom" : "up"} delay={itemIndex * 70}>
                <motion.div whileHover={getHoverLift(shouldReduceMotion, -4)} whileTap={getTapPress(shouldReduceMotion)}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-sm text-secondary-foreground shadow-sm">
                    <Plus className="h-3.5 w-3.5 text-primary" />
                    {item}
                  </span>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <motion.div className="mt-8 inline-flex" whileHover={getHoverLift(shouldReduceMotion, -4)} whileTap={getTapPress(shouldReduceMotion)}>
            <Link
              to={service.href}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
            >
              Read More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </Reveal>
      <Reveal direction={imageDirection}>
        <motion.div className="relative" style={{ y: imageY, rotate: imageRotate }}>
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
          <motion.img
            src={service.img}
            alt=""
            loading="lazy"
            width={1024}
            height={768}
            className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
            whileHover={shouldReduceMotion ? {} : { scale: 1.025 }}
            transition={{ duration: 0.35, ease: premiumEase }}
          />
        </motion.div>
      </Reveal>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className="px-6 py-20 md:px-16 md:py-32">
      <Reveal>
        <p className="mx-auto max-w-3xl text-center text-2xl font-medium leading-relaxed text-foreground md:text-3xl">
          We keep you compliant, streamline operations, and reduce workloads for your staff.{" "}
          <span className="text-primary">Here's how.</span>
        </p>
      </Reveal>
      <div className="mt-20 space-y-24">
        {services.map((service, index) => (
          <ServiceRow key={service.title} service={service} index={index} />
        ))}
      </div>
      <Reveal direction="zoom" className="mt-16 text-center">
        <motion.div className="inline-flex" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.985 }}>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-transparent px-8 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </Reveal>
    </section>
  );
}

function WhoWeServe() {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = getStaggerContainer(shouldReduceMotion, {
    staggerChildren: 0.14,
    delayChildren: 0.05,
  });

  return (
    <motion.section
      className="bg-secondary px-6 py-20 md:px-16"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={containerVariants}
    >
      <motion.h2
        className="text-center text-4xl font-bold text-foreground md:text-5xl"
        variants={getRevealVariants("up", shouldReduceMotion)}
      >
        Who We Serve
      </motion.h2>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {audience.map(({ icon: Icon, label }, index) => (
          <motion.div
            key={label}
            className="group rounded-3xl bg-card p-10 text-center shadow-sm"
            variants={getRevealVariants(index === 1 ? "up" : index % 2 ? "right" : "left", shouldReduceMotion)}
            whileHover={shouldReduceMotion ? {} : { y: -12, rotate: index === 1 ? 0 : index % 2 ? 1.2 : -1.2 }}
            transition={{ duration: 0.3, ease: premiumEase }}
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-10 w-10" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">{label}</h3>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function Stats() {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = getStaggerContainer(shouldReduceMotion, { staggerChildren: 0.14 });

  return (
    <motion.section
      className="bg-primary px-6 py-20 text-primary-foreground md:px-16"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={containerVariants}
    >
      <motion.h2
        className="text-center text-4xl font-bold md:text-5xl"
        variants={getRevealVariants("up", shouldReduceMotion)}
      >
        Our data speaks volumes
      </motion.h2>
      <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 px-8 py-10 text-center backdrop-blur-sm"
            variants={getRevealVariants(index === 1 ? "up" : index % 2 ? "right" : "left", shouldReduceMotion)}
            whileHover={getHoverLift(shouldReduceMotion, -8)}
          >
            <div className="text-6xl font-bold text-accent md:text-7xl">
              <CountUp value={stat.value} suffix={stat.suffix} className="tabular-nums" />
            </div>
            <div className="mt-2 text-base text-primary-foreground/80">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="px-6 py-20 md:px-16 md:py-28">
      <Reveal>
        <h2 className="text-center text-4xl font-bold text-foreground md:text-5xl">Here's how it works</h2>
      </Reveal>
      <Reveal delay={90}>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Three simple steps to a smoother, more profitable practice.
        </p>
      </Reveal>
      <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal key={step.number} direction={index % 2 ? "up" : index === 0 ? "left" : "right"} delay={index * 90}>
            <motion.div
              className="relative rounded-3xl border border-border bg-card p-8 shadow-sm"
              whileHover={shouldReduceMotion ? {} : { y: -10, boxShadow: "0 24px 50px rgba(15, 122, 108, 0.12)" }}
              transition={{ duration: 0.32, ease: premiumEase }}
            >
              <motion.div
                className="absolute -top-6 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground shadow-lg"
                animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
                transition={{ ...floatTransition, duration: 3.8 + index * 0.3 }}
              >
                {step.number}
              </motion.div>
              <h3 className="mt-6 text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mt-3 text-muted-foreground">{step.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ROICalculator() {
  const shouldReduceMotion = useReducedMotion();
  const [monthlyVolume, setMonthlyVolume] = useState("50000");
  const [denialRate, setDenialRate] = useState("12");
  const [cleanClaim, setCleanClaim] = useState("85");

  const formatCurrency = (val) => {
    if (!val) return "";
    const numeric = val.replace(/[^0-9]/g, "");
    return new Intl.NumberFormat("en-US").format(numeric);
  };

  const volumeNum = parseFloat(monthlyVolume.replace(/,/g, "")) || 0;
  const denialNum = parseFloat(denialRate) || 0;
  const cleanNum = parseFloat(cleanClaim) || 0;

  const annualVolume = volumeNum * 12;
  const recaptured = annualVolume * (denialNum / 100) * 0.5;
  const adminSavings = annualVolume * ((100 - cleanNum) / 100) * 0.02;
  const estimatedFee = annualVolume * 0.05;
  const roiMultiplier = estimatedFee > 0 ? ((recaptured + adminSavings) / estimatedFee).toFixed(1) : "0.0";

  const handleClaim = () => {
    const msg = `Hi CoverRCM team,\n\nI just used the ROI Calculator on your website. Based on our metrics:\n- Monthly Volume: $${monthlyVolume}\n- Denial Rate: ${denialRate}%\n- Clean Claim Rate: ${cleanClaim}%\n\nWe could potentially recapture $${new Intl.NumberFormat("en-US").format(Math.round(recaptured))} annually. I'd like to schedule a Free Revenue Leak Check.`;
    window.dispatchEvent(new CustomEvent("fillContactForm", { detail: { message: msg } }));
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-secondary px-6 py-20 md:px-16">
      <Reveal direction="up">
        <div className="mx-auto max-w-4xl rounded-3xl bg-card p-8 shadow-lg md:p-12">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Calculate Your Revenue Potential</h2>
          <p className="mt-3 text-muted-foreground">
            Estimate your potential revenue recovery and administrative savings by entering your current billing metrics below.
          </p>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Monthly Billing Volume ($)</label>
                <input
                  type="text"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(formatCurrency(e.target.value))}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g., 50,000"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Current Denial Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={denialRate}
                  onChange={(e) => setDenialRate(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g., 12"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Clean Claim Percentage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={cleanClaim}
                  onChange={(e) => setCleanClaim(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g., 85"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-6 rounded-2xl bg-primary/5 p-6 border border-primary/10">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Annual Uncollected Revenue Recaptured</div>
                <div className="mt-1 text-3xl font-bold text-primary">
                  ${new Intl.NumberFormat("en-US").format(Math.round(recaptured))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Administrative Cost Savings</div>
                <div className="mt-1 text-3xl font-bold text-primary">
                  ${new Intl.NumberFormat("en-US").format(Math.round(adminSavings))}
                </div>
              </div>
              <div className="border-t border-primary/10 pt-4">
                <div className="text-sm font-medium text-muted-foreground">Net ROI Multiplier</div>
                <div className="mt-1 text-4xl font-bold text-accent">
                  {roiMultiplier}x
                </div>
              </div>
              <p className="text-xs text-muted-foreground opacity-80">
                *Estimated results based on industry averages and assumed CoverRCM recovery rates.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center md:text-left">
            <motion.button
              type="button"
              onClick={handleClaim}
              className="w-full rounded-full bg-accent py-4 text-lg font-semibold text-accent-foreground shadow-lg transition hover:bg-accent/90 md:w-auto md:px-12"
              whileHover={getHoverLift(shouldReduceMotion, -4)}
              whileTap={getTapPress(shouldReduceMotion)}
            >
              Claim Your Revenue
            </motion.button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = getStaggerContainer(shouldReduceMotion, { staggerChildren: 0.12 });

  return (
    <motion.section
      className="px-6 py-20 md:px-16 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={containerVariants}
    >
      <motion.h2
        className="text-center text-4xl font-bold text-foreground md:text-5xl"
        variants={getRevealVariants("up", shouldReduceMotion)}
      >
        Hear what your peers have to say
      </motion.h2>
      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            className="relative rounded-3xl border border-border bg-card p-8 shadow-sm"
            variants={getRevealVariants(index % 2 ? "right" : "left", shouldReduceMotion)}
            whileHover={shouldReduceMotion ? {} : { y: -10, rotate: index % 2 ? 0.8 : -0.8 }}
            transition={{ duration: 0.32, ease: premiumEase }}
          >
            <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/15" />
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <motion.div
                  key={starIndex}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.26, delay: starIndex * 0.04 }}
                >
                  <Star className="h-4 w-4 fill-accent text-accent" />
                </motion.div>
              ))}
            </div>
            <p className="mt-4 text-foreground">{testimonial.text}</p>
            <p className="mt-4 font-semibold text-foreground">{testimonial.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    clinicName: "",
    phone: "",
    email: "",
    message: "",
    practiceType: "Existing Practice",
    number_of_providers: "",
    monthly_revenue: "",
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const handleFill = (e) => {
      setFormData((prev) => ({ ...prev, message: e.detail.message }));
    };
    window.addEventListener("fillContactForm", handleFill);
    return () => window.removeEventListener("fillContactForm", handleFill);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await sendContactForm(formData);
      setStatus("success");
      setFormData({ name: "", clinicName: "", phone: "", email: "", message: "", practiceType: "Existing Practice", number_of_providers: "", monthly_revenue: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact-form" className="bg-primary px-6 py-20 text-primary-foreground md:px-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <Reveal direction="left">
          <div>
            <h2 className="text-4xl font-bold md:text-5xl">Request a discovery call</h2>
            <p className="mt-4 text-primary-foreground/80">
              Tell us a bit about your practice and we'll reach out within one business day.
            </p>
            <div className="mt-8 space-y-3 text-primary-foreground/90">
              <motion.p
                className="flex items-center gap-3"
                animate={shouldReduceMotion ? {} : { x: [0, 5, 0] }}
                transition={{ ...floatTransition, duration: 4.2 }}
              >
                <Phone className="h-4 w-4 shrink-0" />
                <a href={CONTACT_PHONE_LINK} className="hover:underline">{CONTACT_PHONE}</a>
              </motion.p>
              <motion.p
                className="flex items-center gap-3"
                animate={shouldReduceMotion ? {} : { x: [0, 5, 0] }}
                transition={{ ...floatTransition, duration: 4.8 }}
              >
                <Mail className="h-4 w-4 shrink-0" />
                <a href={CONTACT_EMAIL_LINK} className="hover:underline">{CONTACT_EMAIL}</a>
              </motion.p>
            </div>
          </div>
        </Reveal>
        <Reveal direction="right">
          <motion.form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-card p-8 text-foreground shadow-2xl"
            whileHover={shouldReduceMotion ? {} : { y: -6 }}
            transition={{ duration: 0.28, ease: premiumEase }}
          >
            <h3 className="text-2xl font-bold">Get In Touch</h3>
            {status === "success" && (
              <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-800">
                Thanks! We've received your message and will be in touch shortly.
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-800">
                Oops, something went wrong. Please try again or call us directly.
              </div>
            )}
            <div className="mt-6 grid gap-4">
              <motion.input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ duration: 0.28, delay: 0 * 0.05 }}
                whileFocus={shouldReduceMotion ? {} : { scale: 1.01 }}
              />
              <motion.input
                name="clinicName"
                value={formData.clinicName}
                onChange={handleChange}
                placeholder="Clinic Name"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ duration: 0.28, delay: 1 * 0.05 }}
                whileFocus={shouldReduceMotion ? {} : { scale: 1.01 }}
              />
              <motion.input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ duration: 0.28, delay: 2 * 0.05 }}
                whileFocus={shouldReduceMotion ? {} : { scale: 1.01 }}
              />
              <motion.input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ duration: 0.28, delay: 3 * 0.05 }}
                whileFocus={shouldReduceMotion ? {} : { scale: 1.01 }}
              />
              <motion.textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                required
                rows={4}
                className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ duration: 0.28, delay: 0.22 }}
                whileFocus={shouldReduceMotion ? {} : { scale: 1.01 }}
              />
              <motion.select
                name="practiceType"
                value={formData.practiceType}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ duration: 0.28, delay: 0.27 }}
                whileFocus={shouldReduceMotion ? {} : { scale: 1.01 }}
              >
                <option value="Existing Practice">Existing Practice</option>
                <option value="New Practice Setup">New Practice Setup</option>
              </motion.select>
              <motion.input
                name="number_of_providers"
                type="number"
                min="0"
                value={formData.number_of_providers}
                onChange={handleChange}
                placeholder="Number of Providers"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ duration: 0.28, delay: 0.28 }}
                whileFocus={shouldReduceMotion ? {} : { scale: 1.01 }}
              />
              <motion.select
                name="monthly_revenue"
                value={formData.monthly_revenue}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ duration: 0.28, delay: 0.29 }}
                whileFocus={shouldReduceMotion ? {} : { scale: 1.01 }}
              >
                <option value="" disabled>Select Monthly Revenue</option>
                <option value="$0–$50K">$0–$50K</option>
                <option value="$51K–$100K">$51K–$100K</option>
                <option value="$101K–$150K">$101K–$150K</option>
                <option value="$150K+">$150K+</option>
              </motion.select>
              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 rounded-full bg-accent py-3 font-semibold text-accent-foreground transition hover:bg-accent/90 disabled:opacity-50"
                whileHover={getHoverLift(shouldReduceMotion, -4)}
                whileTap={getTapPress(shouldReduceMotion)}
              >
                {status === "loading" ? "Sending..." : "Submit"}
              </motion.button>
            </div>
          </motion.form>
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="px-6 py-20 md:px-16 md:py-28">
      <Reveal>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-4xl font-bold text-foreground md:text-5xl">FAQs</h2>
          <div className="mt-12 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <Reveal key={faq.q} direction={index % 2 ? "right" : "left"} delay={index * 55}>
                  <div className="overflow-hidden rounded-2xl border border-border bg-card">
                    <motion.button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left"
                      whileHover={shouldReduceMotion ? {} : { backgroundColor: "rgba(15, 122, 108, 0.03)" }}
                    >
                      <span className="font-semibold text-foreground">{faq.q}</span>
                      <motion.span
                        animate={isOpen && !shouldReduceMotion ? { rotate: 45 } : { rotate: 0 }}
                        transition={{ duration: 0.24 }}
                      >
                        <Plus className="h-5 w-5 flex-shrink-0 text-primary" />
                      </motion.span>
                    </motion.button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: premiumEase }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-muted-foreground">{faq.a}</div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Reveal direction="up">
      <footer className="bg-foreground px-6 py-12 text-background md:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <motion.div animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }} transition={{ ...floatTransition, duration: 4.1 }}>
            <Logo />
          </motion.div>
          <p className="text-sm text-background/60">
            (c) {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </Reveal>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ServicesSection />
      <WhoWeServe />
      <Stats />
      <HowItWorks />
      <ROICalculator />
      <Testimonials />
      <ContactForm />
      <FAQ />
      <Footer />
    </div>
  );
}
