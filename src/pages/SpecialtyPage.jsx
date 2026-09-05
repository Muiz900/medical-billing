import { motion, useReducedMotion } from "framer-motion";
import {
  Stethoscope,
  Brain,
  Activity,
  HeartHandshake,
  MessageCircle,
  ActivitySquare,
  Puzzle,
  Heart,
  FlaskConical,
  Scan,
  Building2,
  Building,
  Home,
  CheckCircle,
  ArrowRight,
  UserPlus
} from "lucide-react";
import Reveal from "@/components/Reveal";
import {
  getRevealVariants,
  getStaggerContainer,
  premiumEase,
  sectionViewport,
} from "@/components/motion";
import { Link } from "@/lib/router";

const specialties = [
  { name: "Internal & Family Medicine", icon: Stethoscope },
  { name: "Psychiatry, Mental & Behavioral Health", icon: Brain },
  { name: "Gastroenterology", icon: Activity },
  { name: "Pain Management", icon: ActivitySquare },
  { name: "Geriatric Medicine", icon: UserPlus },
  { name: "Hospice & Palliative Care", icon: HeartHandshake },
  { name: "Occupational Therapy", icon: CheckCircle },
  { name: "Speech-Language Therapy", icon: MessageCircle },
  { name: "Physical Therapy", icon: Activity },
  { name: "ABA Therapy", icon: Puzzle },
  { name: "Cardiology", icon: Heart },
  { name: "Laboratory", icon: FlaskConical },
  { name: "Radiology", icon: Scan },
  { name: "Skilled Nursing Facilities (SNF)", icon: Building2 },
  { name: "Nursing Facilities", icon: Building },
  { name: "Home Health", icon: Home },
  { name: "Hospice Centers", icon: Building2 },
];

export default function SpecialtyPage() {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = getStaggerContainer(shouldReduceMotion, {
    staggerChildren: 0.08,
    delayChildren: 0.05,
  });

  return (
    <div className="pb-24">
      {/* Page Header */}
      <section className="bg-primary px-6 py-24 text-primary-foreground md:px-16 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal direction="up">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Specialties We Serve
            </h1>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
              We provide expert medical billing and revenue cycle management services tailored to a wide range of healthcare specialties.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Specialties Grid */}
      <motion.section
        className="mx-auto max-w-6xl px-6 pt-20 md:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={containerVariants}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              className="group flex flex-col items-start rounded-3xl border border-border bg-card p-8 shadow-sm transition-colors hover:border-primary/20"
              variants={getRevealVariants("up", shouldReduceMotion)}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              transition={{ duration: 0.3, ease: premiumEase }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground">
                {name}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="mx-auto mt-24 max-w-4xl px-6 text-center md:px-16">
        <Reveal direction="up">
          <h2 className="text-3xl font-bold text-foreground">
            Don't see your specialty?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our team has extensive experience across the healthcare spectrum. Reach out to see how we can support your unique practice.
          </p>
        </Reveal>
        <Reveal direction="zoom" delay={100}>
          <motion.div className="mt-8 inline-flex" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.985 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </Reveal>
      </section>
    </div>
  );
}
