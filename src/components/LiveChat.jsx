import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById("tawk-to-script")) {
      return;
    }

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Hide the default widget on load
    window.Tawk_API.onLoad = function () {
      window.Tawk_API.hideWidget();
    };

    // When the user minimizes/closes the chat from the Tawk.to UI
    window.Tawk_API.onChatMinimized = function () {
      setIsOpen(false);
      window.Tawk_API.hideWidget();
    };

    // When the user maximizes the chat
    window.Tawk_API.onChatMaximized = function () {
      setIsOpen(true);
    };

    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/6a9fd22a0cdcdb34524aba1e/1k204pue8";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s1.id = "tawk-to-script";

    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      document.head.appendChild(s1);
    }
  }, []);

  const openChat = () => {
    if (window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
      window.Tawk_API.showWidget();
      window.Tawk_API.maximize();
      setIsOpen(true);
    }
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          onClick={openChat}
          className="group fixed bottom-6 right-6 z-[999] flex items-center justify-center rounded-full bg-primary p-4 text-primary-foreground shadow-xl ring-1 ring-primary/20 transition-all hover:bg-primary/90 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 md:bottom-8 md:right-8"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open live chat"
        >
          <div className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold tracking-wide transition-all duration-300 ease-in-out group-hover:max-w-xs group-hover:pr-2">
            Need Help?
          </div>
          <motion.span
            className="text-2xl leading-none"
            animate={{ rotate: [0, 20, -10, 20, -10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3.5,
              ease: "easeInOut",
            }}
          >
            ??
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
