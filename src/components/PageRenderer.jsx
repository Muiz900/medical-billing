import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import pagesData from "@/data/pages.json";
import Reveal from "@/components/Reveal";
import { getHoverLift, getTapPress, premiumEase } from "@/components/motion";
import { Link } from "@/lib/router";
import {
  COMPANY_NAME,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_EMAIL_LINK,
  CONTACT_PHONE,
  CONTACT_PHONE_LINK,
  withSiteDetails,
} from "@/lib/siteConfig";

const pages = withSiteDetails(pagesData);
const TOP_SERVICE_SLUGS = [
  "services",
  "new-practice-setup",
  "practice-management",
  "financial-management",
  "revenue-cycle-management",
  "credentialing-services",
  "it-services",
  "clinical-services",
  "back-office-services",
];
const CORE_FALLBACK_SLUGS = ["services", "our-difference", "faqs", "contact"];
const PLACEHOLDER_EMAIL = CONTACT_EMAIL;
const PLACEHOLDER_PHONE = CONTACT_PHONE;
const PLACEHOLDER_PHONE_LINK = CONTACT_PHONE_LINK;
const PLACEHOLDER_EMAIL_LINK = CONTACT_EMAIL_LINK;
const SERVICE_PAGE_LINKS = {
  "Practice Management": "practice-management",
  "Revenue Cycle Management": "revenue-cycle-management",
  "Credentialing Services": "credentialing-services",
  "New Practice Setup": "new-practice-setup",
  "IT Services": "it-services",
  "Financial Management": "financial-management",
  "Clinical Services": "clinical-services",
  "Back-Office Services": "back-office-services",
  "Back Office Services": "back-office-services",
};
const PLACEHOLDER_PATTERNS = [
  /service unavailable/i,
  /resource limit is reached/i,
  /temporarily unable to service/i,
  /errordocument/i,
  /503 service unavailable/i,
  /508 resource limit/i,
];
const RELATED_PAGE_OVERRIDES = {
  blog: ["services", "practice-management", "revenue-cycle-management", "it-services", "our-difference", "contact"],
  faqs: ["services", "practice-management", "credentialing-services", "revenue-cycle-management", "our-difference", "contact"],
  contact: ["our-difference", "services", "practice-management", "revenue-cycle-management", "faqs", "partners"],
};
const CURATED_PLACEHOLDER_PAGES = {
  blog: {
    badge: "Practice insights",
    intro:
      "Our blog is being rebuilt around the questions practice owners and operations leaders ask most often. Instead of generic industry noise, we want it to feel practical, grounded, and useful for real teams balancing patient care with operations.",
    cardsTitle: "Planned reads",
    cards: [
      {
        eyebrow: "Revenue",
        title: "How to catch revenue leakage before it starts affecting cash flow",
        text:
          "A practical look at charge lag, aging accounts, denial patterns, and the handoff issues that quietly slow collections.",
      },
      {
        eyebrow: "Operations",
        title: "What a smoother front desk actually looks like in a busy clinic",
        text:
          "An honest breakdown of intake, scheduling, follow-up, and documentation habits that reduce daily friction for staff.",
      },
      {
        eyebrow: "Growth",
        title: "Adding a new provider without overwhelming the rest of your team",
        text:
          "A grounded checklist covering credentialing, scheduling, systems access, and communication before the first day of clinic.",
      },
    ],
    checklistTitle: "What we plan to cover",
    checklistIntro:
      "Every post is meant to give administrators, physicians, and support staff something they can use right away.",
    checklist: [
      "Startup planning and practice expansion",
      "RCM performance, denials, and financial visibility",
      "Credentialing readiness and payer enrollment",
      "IT decisions that support clinical workflows",
      "Virtual care, staffing support, and back-office improvement",
    ],
    primaryCta: { to: "/services", label: "Explore services" },
    secondaryCta: { to: "/contact", label: "Ask about your practice" },
    relatedTitle: "Explore the service areas behind these topics",
  },
  faqs: {
    badge: "Common questions",
    intro:
      "These are the kinds of questions we hear from independent practices, specialty groups, and growing care teams when they first reach out. The answers stay direct because most people need clarity more than sales language.",
    cardsTitle: "Questions we answer most often",
    cards: [
      {
        eyebrow: "Getting started",
        title: "Can we begin with one service instead of changing everything at once?",
        text:
          "Yes. Many practices start with the area causing the most strain, like billing, credentialing, or workflow support, and build from there.",
      },
      {
        eyebrow: "Systems",
        title: "Will you work with the tools and workflows we already use?",
        text:
          "We begin by understanding what is already in place. If something is working well, we improve around it rather than forcing unnecessary disruption.",
      },
      {
        eyebrow: "Compliance",
        title: "How do you approach sensitive data and operational accountability?",
        text:
          "Security, access control, documentation, and dependable processes are treated as operating basics, not as add-ons after the fact.",
      },
      {
        eyebrow: "Communication",
        title: "What does support feel like after a project begins?",
        text:
          "Teams need follow-through, so we focus on practical updates, clear owners, and action items people can actually use in the flow of work.",
      },
    ],
    checklistTitle: "Helpful topics for a first conversation",
    checklistIntro:
      "If one of these areas is under pressure, a short call can usually clarify where to start.",
    checklist: [
      "Startup planning and early operational structure",
      "Revenue cycle bottlenecks and denial pressure",
      "Credentialing delays and payer enrollment",
      "IT support, EHR setup, and workflow design",
      "Virtual assistance and back-office support",
    ],
    primaryCta: { to: "/contact", label: "Talk with our team" },
    secondaryCta: { href: PLACEHOLDER_PHONE_LINK, label: "Call now" },
    relatedTitle: "Browse services connected to these questions",
  },
  contact: {
    badge: "Start the conversation",
    intro:
      "The first conversation should feel straightforward. Tell us where the pressure is showing up in your practice, and we will help you identify the right next step without making the process heavier than it needs to be.",
    cardsTitle: "Best ways to reach us",
    cards: [
      {
        eyebrow: "Phone",
        title: PLACEHOLDER_PHONE,
        text:
          "Calling is usually the fastest option when you want to talk through billing concerns, staffing pressure, or a time-sensitive operational issue.",
        href: PLACEHOLDER_PHONE_LINK,
        actionLabel: "Call the office",
      },
      {
        eyebrow: "Email",
        title: PLACEHOLDER_EMAIL,
        text:
          "Send a short note about your practice, your biggest challenge, and the kind of help you are exploring, and we will route it to the right person.",
        href: PLACEHOLDER_EMAIL_LINK,
        actionLabel: "Send an email",
      },
      {
        eyebrow: "Location",
        title: CONTACT_ADDRESS,
        text:
          "We support healthcare teams that need dependable help across practice management, finance, technology, and daily operations.",
        to: "/our-difference",
        actionLabel: "See how we work",
      },
    ],
    checklistTitle: "Helpful details to include",
    checklistIntro:
      "Even a short message with these basics helps make the first conversation more useful.",
    checklist: [
      "Your practice type and approximate number of providers",
      "The main issue you want to solve first",
      "Any billing, EHR, or workflow systems already in place",
      "Whether you need immediate support or longer-term planning",
    ],
    primaryCta: { href: PLACEHOLDER_EMAIL_LINK, label: "Email the team" },
    secondaryCta: { href: PLACEHOLDER_PHONE_LINK, label: "Schedule a call" },
    relatedTitle: "Pages people often review before reaching out",
  },
};

function getPage(slug) {
  return pages[slug] ?? null;
}

function listSlugs() {
  return Object.keys(pages);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeText(value) {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function formatSlugLabel(slug) {
  if (slug === "faqs") {
    return "FAQs";
  }

  return slug
    .split("/")
    .filter(Boolean)
    .pop()
    ?.split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ") ?? "This page";
}

function getPageTitle(slug) {
  const page = getPage(slug);
  if (!page || isPlaceholderPage(page)) {
    return formatSlugLabel(slug);
  }

  return normalizeText(page?.h1) || normalizeText(page?.title) || formatSlugLabel(slug);
}

function truncateText(value, length = 170) {
  const text = normalizeText(value);

  if (text.length <= length) {
    return text;
  }

  return `${text.slice(0, length).trimEnd()}...`;
}

function getPageLeadText(page) {
  const introBlock = page?.blocks?.find((block) => block.t === "p" && normalizeText(block.txt));
  return normalizeText(page?.desc) || normalizeText(introBlock?.txt);
}

function getCuratedPlaceholderContent(slug) {
  return CURATED_PLACEHOLDER_PAGES[slug] ?? null;
}

function getServicePageSlugFromLabel(label) {
  return SERVICE_PAGE_LINKS[normalizeText(label)] ?? null;
}

function getResolvedLeadText(slug) {
  const curated = getCuratedPlaceholderContent(slug);

  if (curated?.intro) {
    return curated.intro;
  }

  return getPageLeadText(getPage(slug));
}

function getFilename(src) {
  const url = (src ?? "").split("?")[0];
  return url.split("/").pop() ?? "";
}

function isDecorativeImage(block) {
  const filename = getFilename(block.src);
  return /^(group|vector)-/i.test(filename);
}

function getMeaningfulBlocks(page) {
  return (page?.blocks ?? []).filter((block) => {
    if (block.t === "img") {
      return !isDecorativeImage(block);
    }

    return ["p", "li", "h3", "h4"].includes(block.t) && normalizeText(block.txt);
  });
}

function estimateReadTime(blocks) {
  const words = blocks
    .map((block) => normalizeText(block.txt))
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 180));
}

function buildSections(blocks) {
  const sections = [];
  let current = { blocks: [] };

  for (const block of blocks) {
    if (block.t === "h2") {
      if (current.heading || current.blocks.length) {
        sections.push(current);
      }

      current = {
        heading: normalizeText(block.txt),
        blocks: [],
      };
    } else {
      current.blocks.push(block);
    }
  }

  if (current.heading || current.blocks.length) {
    sections.push(current);
  }

  return sections.map((section, index) => ({
    ...section,
    id: slugify(section.heading || `section-${index + 1}`) || `section-${index + 1}`,
  }));
}

function isPlaceholderPage(page) {
  const text = [page.title, page.desc, page.h1, ...(page.blocks ?? []).map((block) => block.txt ?? "")]
    .join(" ")
    .trim();

  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(text));
}

function isEmptyPage(page) {
  return getMeaningfulBlocks(page).length === 0;
}

function getPageState(slug) {
  const page = getPage(slug);

  if (!page) {
    return "missing";
  }

  if (isPlaceholderPage(page) || isEmptyPage(page)) {
    return "placeholder";
  }

  return "content";
}

function getResolvedPageMeta(slug) {
  const page = getPage(slug);
  const state = getPageState(slug);
  const label = getPageTitle(slug);

  if (state === "missing") {
    return {
      title: `Page not found - ${COMPANY_NAME}`,
      description: "The page you requested could not be found.",
    };
  }

  if (state === "placeholder") {
    const fallbackDescription =
      getResolvedLeadText(slug) ||
      `Explore ${label.toLowerCase()} and connect with ${COMPANY_NAME} while this page content is being refreshed.`;

    return {
      title: `${label} | ${COMPANY_NAME}`,
      description: truncateText(fallbackDescription, 150),
    };
  }

  return {
    title: page.title,
    description: page.desc ?? "Healthcare practice management consulting.",
  };
}

function findNearbyText(blocks, startIndex, direction) {
  const step = direction === "forward" ? 1 : -1;
  let index = startIndex + step;

  while (index >= 0 && index < blocks.length) {
    const block = blocks[index];

    if ((block.t === "p" || block.t === "h3" || block.t === "h4") && normalizeText(block.txt)) {
      return normalizeText(block.txt);
    }

    index += step;
  }

  return "";
}

function buildImageMeta(blocks, index, sectionHeading, pageTitle) {
  const previousHeading = [...blocks.slice(0, index)]
    .reverse()
    .find((block) => block.t === "h3" || block.t === "h4");
  const nextHeading = blocks.slice(index + 1).find((block) => block.t === "h3" || block.t === "h4");
  const captionTitle = normalizeText(previousHeading?.txt) || normalizeText(nextHeading?.txt) || sectionHeading || pageTitle;
  const captionLabel = normalizeText(sectionHeading) || normalizeText(pageTitle);
  const relatedText =
    findNearbyText(blocks, index, "forward") ||
    findNearbyText(blocks, index, "backward") ||
    `${captionTitle} is part of the practical day-to-day work involved in this service.`;

  return {
    captionLabel,
    captionTitle,
    captionText: truncateText(relatedText, 240),
    altText: normalizeText(blocks[index].alt) || `${captionTitle} illustration`,
  };
}

function normalizeSectionBlocks(blocks, sectionHeading, pageTitle) {
  const normalized = [];
  let listBuffer = [];

  const flushListBuffer = () => {
    if (!listBuffer.length) {
      return;
    }

    normalized.push({ t: "list", items: listBuffer });
    listBuffer = [];
  };

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (block.t === "li") {
      listBuffer.push(normalizeText(block.txt));
      continue;
    }

    flushListBuffer();

    if (block.t === "img") {
      if (isDecorativeImage(block)) {
        continue;
      }

      normalized.push({
        ...block,
        ...buildImageMeta(blocks, index, sectionHeading, pageTitle),
      });
      continue;
    }

    normalized.push({
      ...block,
      txt: normalizeText(block.txt),
    });
  }

  flushListBuffer();
  return normalized;
}

function getParentSlug(slug) {
  if (!slug.includes("/")) {
    return null;
  }

  return slug.split("/").slice(0, -1).join("/");
}

function getChildSlugs(slug) {
  return listSlugs().filter((candidate) => candidate.startsWith(`${slug}/`));
}

function uniqueSlugs(slugs) {
  return [...new Set(slugs.filter(Boolean))];
}

function toPageLink(slug) {
  const page = getPage(slug);

  if (!page) {
    return null;
  }

  return {
    slug,
    to: `/${slug}`,
    title: getPageTitle(slug),
    description:
      getResolvedLeadText(slug) ||
      `Explore ${getPageTitle(slug).toLowerCase()} with ${COMPANY_NAME}.`,
    state: getPageState(slug),
  };
}

function getRelatedPageLinks(slug) {
  const parent = getParentSlug(slug);
  const children = getChildSlugs(slug);
  let candidates = [];

  if (RELATED_PAGE_OVERRIDES[slug]) {
    candidates = RELATED_PAGE_OVERRIDES[slug];
  } else if (slug === "services") {
    candidates = TOP_SERVICE_SLUGS.filter((item) => item !== "services");
  } else if (parent) {
    candidates = [parent, ...getChildSlugs(parent).filter((item) => item !== slug)];
  } else if (children.length) {
    candidates = children;
  } else if (TOP_SERVICE_SLUGS.includes(slug)) {
    candidates = TOP_SERVICE_SLUGS.filter((item) => item !== slug && item !== "services");
  } else {
    candidates = [...CORE_FALLBACK_SLUGS.filter((item) => item !== slug), ...TOP_SERVICE_SLUGS.filter((item) => item !== "services")];
  }

  return uniqueSlugs(candidates)
    .filter((candidate) => candidate !== slug)
    .map(toPageLink)
    .filter(Boolean)
    .slice(0, 6);
}

function getBreadcrumbs(slug) {
  const parent = getParentSlug(slug);

  if (parent) {
    return [
      { label: getPageTitle(parent), to: `/${parent}` },
      { label: getPageTitle(slug), to: `/${slug}` },
    ];
  }

  if (TOP_SERVICE_SLUGS.includes(slug) && slug !== "services") {
    return [
      { label: "Services", to: "/services" },
      { label: getPageTitle(slug), to: `/${slug}` },
    ];
  }

  return [{ label: getPageTitle(slug), to: `/${slug}` }];
}

function getServicesOverviewCards(page) {
  const cards = [];
  const seen = new Set();
  const blocks = page?.blocks ?? [];

  for (let index = 0; index < blocks.length - 1; index += 1) {
    const imageBlock = blocks[index];
    const headingBlock = blocks[index + 1];

    if (imageBlock.t !== "img" || isDecorativeImage(imageBlock) || headingBlock?.t !== "h2") {
      continue;
    }

    const label = normalizeText(headingBlock.txt);
    const serviceSlug = getServicePageSlugFromLabel(label);

    if (!serviceSlug || seen.has(serviceSlug)) {
      continue;
    }

    seen.add(serviceSlug);
    cards.push({
      slug: serviceSlug,
      to: `/${serviceSlug}`,
      title: label,
      imageSrc: imageBlock.src,
      imageAlt: imageBlock.alt || `${label} service illustration`,
      description: truncateText(
        getResolvedLeadText(serviceSlug) ||
          `Explore ${label.toLowerCase()} support from ${COMPANY_NAME}.`,
        150,
      ),
    });
  }

  return cards;
}

function NotFoundState({ slug }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-4xl px-4 py-24 text-center md:py-32">
      <Reveal direction="up">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          We couldn&apos;t find <span className="text-primary">/{slug}</span>.
        </h1>
      </Reveal>
      <Reveal direction="up" delay={80}>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          The page may have moved or is still being updated. You can return home or contact the team directly.
        </p>
      </Reveal>
      <Reveal direction="zoom" delay={150}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <motion.div whileHover={getHoverLift(shouldReduceMotion, -4)} whileTap={getTapPress(shouldReduceMotion)}>
            <Link to="/" className="inline-flex rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground">
              Go home
            </Link>
          </motion.div>
          <motion.a
            href={CONTACT_PHONE_LINK}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-medium text-foreground"
            whileHover={getHoverLift(shouldReduceMotion, -4)}
            whileTap={getTapPress(shouldReduceMotion)}
          >
            <Phone className="h-4 w-4" />
            Call us
          </motion.a>
        </div>
      </Reveal>
    </div>
  );
}

function RelatedPages({ slug, title = "Explore related pages" }) {
  const shouldReduceMotion = useReducedMotion();
  const links = getRelatedPageLinks(slug);

  if (!links.length) {
    return null;
  }

  return (
    <section className="border-t border-border bg-muted/35">
      <div className="mx-auto max-w-5xl px-4 py-14">
        <Reveal direction="up">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {links.map((link, index) => (
            <Reveal key={link.to} direction={index % 2 ? "right" : "left"} delay={index * 60}>
              <motion.div whileHover={getHoverLift(shouldReduceMotion, -4)} whileTap={getTapPress(shouldReduceMotion)}>
                <Link to={link.to} className="block rounded-[1.5rem] border border-border bg-card p-5 shadow-sm transition hover:border-primary/20">
                  <p className="text-lg font-semibold text-foreground">{link.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {truncateText(link.description, 110)}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Open page
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlaceholderAction({ action, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const sharedClassName = [
    "inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!action) {
    return null;
  }

  const content = (
    <>
      {action.icon}
      {action.label}
      <ArrowRight className="h-4 w-4" />
    </>
  );

  if (action.to) {
    return (
      <motion.div whileHover={getHoverLift(shouldReduceMotion, -4)} whileTap={getTapPress(shouldReduceMotion)}>
        <Link to={action.to} className={sharedClassName}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={action.href}
      className={sharedClassName}
      whileHover={getHoverLift(shouldReduceMotion, -4)}
      whileTap={getTapPress(shouldReduceMotion)}
    >
      {content}
    </motion.a>
  );
}

function PlaceholderContentSection({ title, intro, cards, checklist }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mt-10 space-y-6">
      <Reveal direction="up">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2>
          {intro ? <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{intro}</p> : null}
        </div>
      </Reveal>

      {cards?.length ? (
        <div className={`grid gap-4 ${cards.length > 2 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {cards.map((card, index) => (
            <Reveal key={`${card.title}-${index}`} direction={index % 2 ? "right" : "left"} delay={index * 50}>
              <motion.div
                className="flex h-full flex-col rounded-[1.5rem] border border-border bg-card p-5 shadow-sm"
                whileHover={getHoverLift(shouldReduceMotion, -4)}
              >
                {card.eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {card.eyebrow}
                  </p>
                ) : null}
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                {card.to || card.href ? (
                  <div className="mt-5">
                    {card.to ? (
                      <Link to={card.to} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                        {card.actionLabel ?? "Open page"}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <a href={card.href} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                        {card.actionLabel ?? "Open"}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                ) : null}
              </motion.div>
            </Reveal>
          ))}
        </div>
      ) : null}

      {checklist?.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {checklist.map((item, index) => (
            <Reveal key={`${item}-${index}`} direction="up" delay={index * 40}>
              <div className="rounded-2xl border border-border bg-secondary/55 px-4 py-3">
                <p className="text-sm leading-relaxed text-foreground/85">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function PlaceholderState({ slug }) {
  const label = getPageTitle(slug);
  const curated = getCuratedPlaceholderContent(slug);
  const relatedTitle = curated?.relatedTitle ?? "Continue with these pages";

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        <div className="rounded-[2rem] border border-border bg-card px-6 py-10 shadow-sm md:px-10 md:py-12">
          <Reveal direction="up">
            <div className="inline-flex rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              {curated?.badge ?? "Content update"}
            </div>
          </Reveal>
          <Reveal direction="up" delay={70}>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">{label}</h1>
          </Reveal>
          <Reveal direction="up" delay={130}>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {curated?.intro ??
                "This page doesn't have full published content yet, so we're showing a clean placeholder instead of leaving you on an empty screen."}
            </p>
          </Reveal>
          <Reveal direction="zoom" delay={190}>
            <div className="mt-8 flex flex-wrap gap-3">
              <PlaceholderAction
                action={
                  curated?.primaryCta ?? {
                    to: "/contact",
                    label: "Contact us",
                  }
                }
                className="bg-primary text-primary-foreground"
              />
              <PlaceholderAction
                action={
                  curated?.secondaryCta ?? {
                    href: PLACEHOLDER_PHONE_LINK,
                    label: PLACEHOLDER_PHONE,
                    icon: <Phone className="h-4 w-4" />,
                  }
                }
                className="border border-border bg-card text-foreground"
              />
            </div>
          </Reveal>

          {curated ? (
            <>
              <PlaceholderContentSection title={curated.cardsTitle} cards={curated.cards} />
              <PlaceholderContentSection
                title={curated.checklistTitle}
                intro={curated.checklistIntro}
                checklist={curated.checklist}
              />
            </>
          ) : (
            <PlaceholderContentSection
              title="Keep moving"
              intro="You can still contact the team directly or use the related page links below to keep exploring connected services and company information."
              cards={[
                {
                  eyebrow: "Call",
                  title: PLACEHOLDER_PHONE,
                  text: "Speak with the team directly if you already know what part of your practice needs attention.",
                  href: PLACEHOLDER_PHONE_LINK,
                  actionLabel: "Call now",
                },
                {
                  eyebrow: "Email",
                  title: PLACEHOLDER_EMAIL,
                  text: "Share a short summary of what you need and we will point you in the right direction.",
                  href: PLACEHOLDER_EMAIL_LINK,
                  actionLabel: "Send an email",
                },
                {
                  eyebrow: "Location",
                  title: CONTACT_ADDRESS,
                  text: "A simple starting point for operations, finance, IT, and growth conversations.",
                  to: "/services",
                  actionLabel: "Browse services",
                },
              ]}
            />
          )}

          {slug === "contact" ? (
            <Reveal direction="up" delay={240}>
              <div className="mt-10 grid gap-4 border-t border-border pt-8 md:grid-cols-3">
                <div className="rounded-2xl bg-muted/40 px-4 py-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm font-semibold text-foreground">{PLACEHOLDER_PHONE}</p>
                  <p className="mt-1 text-sm text-muted-foreground">For direct conversations about active needs.</p>
                </div>
                <div className="rounded-2xl bg-muted/40 px-4 py-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm font-semibold text-foreground">{PLACEHOLDER_EMAIL}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Best for sharing background before a call.</p>
                </div>
                <div className="rounded-2xl bg-muted/40 px-4 py-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm font-semibold text-foreground">{CONTACT_ADDRESS}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Supporting healthcare practices with practical operational help.</p>
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
      <RelatedPages slug={slug} title={relatedTitle} />
    </div>
  );
}

function ServicesOverviewPage({ cards }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-14">
      <Reveal direction="up">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Choose a service area</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            Each card below opens the full service page, so you can move directly into the area that matches your practice needs.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {cards.map((card, index) => (
          <Reveal key={card.to} direction={index % 2 ? "right" : "left"} delay={index * 50}>
            <motion.div whileHover={getHoverLift(shouldReduceMotion, -4)} whileTap={getTapPress(shouldReduceMotion)}>
              <Link
                to={card.to}
                className="group block overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm transition hover:border-primary/20"
              >
                <div className="overflow-hidden">
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    loading="lazy"
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="space-y-3 px-6 py-6">
                  <p className="text-2xl font-bold tracking-tight text-foreground">{card.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{card.description}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    View service page
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function ContentBlock({ block, index }) {
  const shouldReduceMotion = useReducedMotion();
  const direction = index % 3 === 0 ? "up" : index % 3 === 1 ? "left" : "zoom";

  if (block.t === "img") {
    return (
      <Reveal direction="up" delay={index * 40}>
        <figure className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
          <motion.img
            src={block.src}
            alt={block.altText}
            loading="lazy"
            className="h-[20rem] w-full object-cover md:h-[28rem]"
            whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
            transition={{ duration: 0.28, ease: premiumEase }}
          />
          <figcaption className="border-t border-border bg-muted/40 px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {block.captionLabel}
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">{block.captionTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {block.captionText}
            </p>
          </figcaption>
        </figure>
      </Reveal>
    );
  }

  if (block.t === "h3") {
    return (
      <Reveal direction={direction} delay={index * 35}>
        <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">{block.txt}</h3>
      </Reveal>
    );
  }

  if (block.t === "h4") {
    return (
      <Reveal direction={direction} delay={index * 35}>
        <h4 className="text-lg font-semibold text-foreground">{block.txt}</h4>
      </Reveal>
    );
  }

  if (block.t === "list") {
    return (
      <Reveal direction="up" delay={index * 35}>
        <div className="grid gap-3">
          {block.items.map((item, itemIndex) => (
            <motion.div
              key={`${item}-${itemIndex}`}
              className="rounded-2xl border border-border bg-secondary/55 px-4 py-3"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.24, delay: itemIndex * 0.04 }}
            >
              <p className="text-base leading-relaxed text-foreground/85">{item}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal direction={direction} delay={index * 35}>
      <p className="text-base leading-relaxed text-foreground/80 md:text-[1.05rem]">{block.txt}</p>
    </Reveal>
  );
}

function SectionCard({ section, index }) {
  const normalizedBlocks = normalizeSectionBlocks(section.blocks, section.heading, section.pageTitle);

  if (!normalizedBlocks.length) {
    return null;
  }

  return (
    <Reveal direction={index % 2 ? "right" : "left"} className="scroll-mt-24">
      <section id={section.id} className="space-y-5 border-b border-border/70 pb-10 last:border-b-0 last:pb-0">
        {section.heading ? (
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{section.heading}</h2>
        ) : null}
        <div className="space-y-5">
          {normalizedBlocks.map((block, blockIndex) => (
            <ContentBlock
              key={`${block.t}-${blockIndex}-${block.txt ?? block.src ?? block.items?.[0] ?? "block"}`}
              block={block}
              index={blockIndex}
            />
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function PageRenderer({ slug }) {
  const page = getPage(slug);
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useSpring(
    useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -24]),
    { stiffness: 120, damping: 24, mass: 0.45 }
  );

  if (!page) {
    return <NotFoundState slug={slug} />;
  }

  if (getPageState(slug) === "placeholder") {
    return <PlaceholderState slug={slug} />;
  }

  const heroTitle = getPageTitle(slug);
  const intro = page.blocks.find((block) => block.t === "p" && normalizeText(block.txt));
  const introText = intro ? normalizeText(intro.txt) : normalizeText(page.desc);
  const breadcrumbs = getBreadcrumbs(slug);
  let skippedH1 = false;
  let skippedIntro = false;

  const body = page.blocks.filter((block) => {
    if (!skippedH1 && block.t === "h1") {
      skippedH1 = true;
      return false;
    }

    if (!skippedIntro && block.t === "p" && intro && normalizeText(block.txt) === normalizeText(intro.txt)) {
      skippedIntro = true;
      return false;
    }

    return true;
  });

  const sections = buildSections(body).map((section) => ({
    ...section,
    pageTitle: heroTitle,
  }));
  const renderedSections = sections.filter(
    (section) => normalizeSectionBlocks(section.blocks, section.heading, section.pageTitle).length > 0
  );
  const readingTime = estimateReadTime(page.blocks);
  const serviceCards = slug === "services" ? getServicesOverviewCards(page) : [];

  return (
    <div className="bg-background">
      <section ref={heroRef} className="border-b border-border bg-muted/35">
        <motion.div className="mx-auto max-w-5xl px-4 py-16 md:py-20" style={{ y: heroY }}>
          <Reveal direction="up">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.to} className="flex items-center gap-2">
                  {index > 0 ? <span className="text-primary/55">/</span> : null}
                  {index === breadcrumbs.length - 1 ? (
                    <span>{crumb.label}</span>
                  ) : (
                    <Link to={crumb.to} className="transition hover:text-primary/75">
                      {crumb.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal direction="up" delay={70}>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {heroTitle}
            </h1>
          </Reveal>
          {introText ? (
            <Reveal direction="up" delay={130}>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {introText}
              </p>
            </Reveal>
          ) : null}
          <Reveal direction="zoom" delay={190}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                {readingTime} min read
              </span>
              <motion.a
                href={CONTACT_PHONE_LINK}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
                whileHover={getHoverLift(shouldReduceMotion, -4)}
                whileTap={getTapPress(shouldReduceMotion)}
              >
                <Phone className="h-4 w-4" />
                Schedule a Call
              </motion.a>
              <motion.div whileHover={getHoverLift(shouldReduceMotion, -4)} whileTap={getTapPress(shouldReduceMotion)}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-medium text-foreground"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </motion.div>
      </section>

      {slug === "services" ? (
        <ServicesOverviewPage cards={serviceCards} />
      ) : (
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-14">
          <div className="space-y-10">
            {renderedSections.map((section, sectionIndex) => (
              <SectionCard key={`${section.id}-${sectionIndex}`} section={section} index={sectionIndex} />
            ))}
          </div>
        </div>
      )}

      <RelatedPages slug={slug} />

      <section className="border-t border-border bg-muted/35">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <Reveal direction="up">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Need help with this service?</h2>
          </Reveal>
          <Reveal direction="up" delay={70}>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Speak with our team for guidance tailored to your practice, your operations, and your growth goals.
            </p>
          </Reveal>
          <Reveal direction="zoom" delay={130}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <motion.a
                href={CONTACT_PHONE_LINK}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
                whileHover={getHoverLift(shouldReduceMotion, -4)}
                whileTap={getTapPress(shouldReduceMotion)}
              >
                <Phone className="h-4 w-4" />
                {CONTACT_PHONE}
              </motion.a>
              <motion.div whileHover={getHoverLift(shouldReduceMotion, -4)} whileTap={getTapPress(shouldReduceMotion)}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-medium text-foreground"
                >
                  Start a conversation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export { PageRenderer, getPage, getResolvedPageMeta, listSlugs };
