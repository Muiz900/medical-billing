import { useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useScrollDirection } from "@/components/motion";
import { Link } from "@/lib/router";
import { COMPANY_INITIAL, COMPANY_NAME, CONTACT_PHONE_LINK } from "@/lib/siteConfig";

const nav = [
  { label: "Home", to: "/" },
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "New Practice Setup", to: "/new-practice-setup" },
      { label: "Practice Management", to: "/practice-management" },
      { label: "Financial Management", to: "/financial-management" },
      { label: "Revenue Cycle Management", to: "/revenue-cycle-management" },
      { label: "Credentialing Services", to: "/credentialing-services" },
      { label: "IT Services", to: "/it-services" },
      { label: "Clinical Services", to: "/clinical-services" },
      { label: "Back Office Services", to: "/back-office-services" },
    ],
  },
  { label: "Our Difference", to: "/our-difference" },
  { label: "Partners", to: "/partners" },
  { label: "Blog", to: "/blog" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: "/contact" },
];

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const direction = useScrollDirection();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 32);
  });

  const shouldHide = !shouldReduceMotion && direction === "down" && isScrolled && !open;

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      animate={
        shouldReduceMotion
          ? { y: 0, opacity: 1 }
          : {
              y: shouldHide ? -96 : 0,
              opacity: shouldHide ? 0.92 : 1,
            }
      }
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="border-b backdrop-blur supports-[backdrop-filter]:bg-background/80"
        animate={
          shouldReduceMotion
            ? { backgroundColor: "rgba(255,255,255,0.95)" }
            : {
                backgroundColor: isScrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.78)",
                boxShadow: isScrolled
                  ? "0 16px 40px rgba(15, 122, 108, 0.10)"
                  : "0 0 0 rgba(15, 122, 108, 0)",
              }
        }
        transition={{ duration: 0.32, ease: "easeOut" }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-primary transition-transform duration-300 hover:scale-[1.02]"
          >
            <motion.span
              className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"
              whileHover={shouldReduceMotion ? {} : { rotate: -8, scale: 1.06 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {COMPANY_INITIAL}
            </motion.span>
            <span className="hidden max-w-[13rem] text-sm leading-tight sm:inline">
              {COMPANY_NAME}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-muted hover:text-foreground"
                  activeClassName="text-primary"
                >
                  {item.label}
                  {item.children ? (
                    <motion.span
                      animate={
                        openMenu === item.label && !shouldReduceMotion ? { rotate: 180 } : { rotate: 0 }
                      }
                      transition={{ duration: 0.22 }}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </motion.span>
                  ) : null}
                </Link>
                {item.children && openMenu === item.label ? (
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="absolute left-0 top-full w-64 rounded-md border bg-popover p-2 shadow-lg"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block rounded px-3 py-2 text-sm transition hover:bg-muted"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                ) : null}
              </div>
            ))}
          </nav>

          <motion.a
            href={CONTACT_PHONE_LINK}
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 md:inline-flex"
            whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          >
            <Phone className="h-4 w-4" />
            Schedule a Call
          </motion.a>

          <motion.button
            type="button"
            className="p-2 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </motion.div>

      {open ? (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="border-t bg-background lg:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-3">
            {nav.map((item) => (
              <div key={item.to}>
                <Link to={item.to} onClick={() => setOpen(false)} className="block py-2 font-medium">
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="mb-2 ml-4 border-l pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 text-sm text-muted-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <a
              href={CONTACT_PHONE_LINK}
              className="mt-3 block w-full rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              Schedule a Call
            </a>
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}

export { SiteHeader as default };
