import { useEffect, useState } from "react";

const NAVIGATION_EVENT = "app:navigate";
const BASE_URL = import.meta.env.BASE_URL || "/";

function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "/";
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}

const BASE_PATH = normalizeBasePath(BASE_URL);

function isModifiedEvent(event) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

function isExternalHref(href) {
  return /^(?:[a-z]+:)?\/\//i.test(href);
}

function normalizeInternalPath(path) {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

function stripBasePath(pathname) {
  if (!pathname) {
    return "/";
  }

  if (BASE_PATH === "/") {
    return pathname || "/";
  }

  const trimmedBase = BASE_PATH.slice(0, -1);

  if (pathname === trimmedBase) {
    return "/";
  }

  if (pathname.startsWith(BASE_PATH)) {
    const relativePath = pathname.slice(BASE_PATH.length - 1);
    return relativePath || "/";
  }

  return pathname;
}

function withBasePath(path) {
  const normalizedPath = normalizeInternalPath(path);

  if (BASE_PATH === "/") {
    return normalizedPath;
  }

  if (normalizedPath === "/") {
    return BASE_PATH;
  }

  return `${BASE_PATH.slice(0, -1)}${normalizedPath}`;
}

function toHref(to) {
  if (
    !to ||
    to.startsWith("#") ||
    to.startsWith("mailto:") ||
    to.startsWith("tel:") ||
    isExternalHref(to)
  ) {
    return to;
  }

  return withBasePath(to);
}

export function navigate(to) {
  if (typeof window === "undefined") return;

  const href = toHref(to);
  const nextUrl = new URL(href, window.location.origin);
  const currentUrl = `${stripBasePath(window.location.pathname)}${window.location.search}${window.location.hash}`;
  const nextPath = `${stripBasePath(nextUrl.pathname)}${nextUrl.search}${nextUrl.hash}`;

  if (currentUrl === nextPath) return;

  window.history.pushState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  window.dispatchEvent(new Event(NAVIGATION_EVENT));
  window.scrollTo(0, 0);
}

export function usePathname() {
  const [pathname, setPathname] = useState(() =>
    typeof window === "undefined" ? "/" : stripBasePath(window.location.pathname),
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncPathname = () => setPathname(stripBasePath(window.location.pathname));

    window.addEventListener("popstate", syncPathname);
    window.addEventListener(NAVIGATION_EVENT, syncPathname);

    return () => {
      window.removeEventListener("popstate", syncPathname);
      window.removeEventListener(NAVIGATION_EVENT, syncPathname);
    };
  }, []);

  return pathname;
}

export function Link({
  to,
  onClick,
  className,
  activeClassName,
  children,
  target,
  rel,
  ...props
}) {
  const pathname = usePathname();
  const href = toHref(to);
  const isActive = !isExternalHref(to) && !to.startsWith("#") && !to.startsWith("mailto:") && !to.startsWith("tel:")
    ? pathname === normalizeInternalPath(to)
    : false;
  const mergedClassName = [className, isActive ? activeClassName : ""].filter(Boolean).join(" ");

  return (
    <a
      {...props}
      href={href}
      target={target}
      rel={rel}
      className={mergedClassName || undefined}
      aria-current={isActive ? "page" : undefined}
      onClick={(event) => {
        onClick?.(event);

        if (
          event.defaultPrevented ||
          isModifiedEvent(event) ||
          target === "_blank" ||
          props.download ||
          to.startsWith("#") ||
          to.startsWith("mailto:") ||
          to.startsWith("tel:") ||
          isExternalHref(to)
        ) {
          return;
        }

        event.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}
