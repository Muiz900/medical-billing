import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PageRenderer, getResolvedPageMeta } from "@/components/PageRenderer";
import ScrollProgress from "@/components/ScrollProgress";
import { premiumEase } from "@/components/motion";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { usePathname } from "@/lib/router";
import { COMPANY_NAME, SITE_DESCRIPTION } from "@/lib/siteConfig";
import HomePage from "@/pages/HomePage";
import SpecialtyPage from "@/pages/SpecialtyPage";

function getSlug(pathname) {
  const normalized = pathname.replace(/^\/+|\/+$/g, "");
  return normalized ? decodeURIComponent(normalized) : "";
}

function setDocumentMetadata({ title, description }) {
  document.title = title;

  const upsertMetaTag = (selector, attributeName, attributeValue) => {
    let tag = document.querySelector(selector);

    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attributeName, attributeValue);
      document.head.appendChild(tag);
    }

    return tag;
  };

  upsertMetaTag('meta[name="description"]', "name", "description").setAttribute("content", description);
  upsertMetaTag('meta[property="og:title"]', "property", "og:title").setAttribute("content", title);
  upsertMetaTag('meta[property="og:description"]', "property", "og:description").setAttribute("content", description);
  upsertMetaTag('meta[name="twitter:title"]', "name", "twitter:title").setAttribute("content", title);
  upsertMetaTag('meta[name="twitter:description"]', "name", "twitter:description").setAttribute("content", description);
}

export default function App() {
  const pathname = usePathname();
  const slug = getSlug(pathname);
  const isHomePage = slug === "";
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isHomePage) {
      setDocumentMetadata({
        title: `${COMPANY_NAME} - Manage your practice with ease`,
        description: SITE_DESCRIPTION,
      });
      return;
    }

    setDocumentMetadata(getResolvedPageMeta(slug));
  }, [isHomePage, slug]);

  const pageMotion = shouldReduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, y: 18 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: premiumEase },
        },
        exit: {
          opacity: 0,
          y: -18,
          transition: { duration: 0.28, ease: "easeOut" },
        },
      };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <AnimatePresence mode="wait">
        {isHomePage ? (
          <motion.div key="home" {...pageMotion}>
            <HomePage />
          </motion.div>
        ) : (
          <motion.div key={pathname} {...pageMotion}>
            <SiteHeader />
            <main>
              {slug === "specialty" ? <SpecialtyPage /> : <PageRenderer slug={slug} />}
            </main>
            <SiteFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
