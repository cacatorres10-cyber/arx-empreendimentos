"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site, whatsappLink } from "@/lib/site";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink(
            `Olá, ${site.name}! Vim pelo site e gostaria de mais informações.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/20"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
          <svg
            viewBox="0 0 32 32"
            className="relative h-7 w-7 fill-white"
            aria-hidden="true"
          >
            <path d="M16.004 5.333c-5.887 0-10.667 4.78-10.667 10.667 0 1.88.492 3.72 1.428 5.343L5.333 26.667l5.49-1.44a10.62 10.62 0 0 0 5.18 1.32h.004c5.887 0 10.667-4.78 10.667-10.667S21.89 5.333 16.004 5.333zm0 19.2h-.003a8.83 8.83 0 0 1-4.5-1.232l-.323-.192-3.257.854.869-3.176-.21-.326a8.79 8.79 0 0 1-1.348-4.663c0-4.885 3.975-8.86 8.865-8.86 2.368 0 4.593.922 6.268 2.598a8.803 8.803 0 0 1 2.596 6.27c0 4.885-3.975 8.86-8.867 8.86zm4.86-6.633c-.266-.133-1.576-.777-1.82-.866-.244-.089-.422-.133-.6.134-.177.266-.688.866-.844 1.043-.155.178-.31.2-.577.067-.266-.134-1.124-.414-2.142-1.322-.792-.706-1.327-1.578-1.482-1.845-.155-.266-.017-.41.117-.543.12-.12.266-.31.4-.466.133-.155.177-.266.266-.444.089-.178.045-.333-.022-.466-.067-.134-.6-1.446-.822-1.98-.216-.52-.437-.45-.6-.458l-.51-.009c-.178 0-.466.067-.71.333-.244.266-.933.911-.933 2.223 0 1.311.955 2.578 1.088 2.756.133.178 1.88 2.87 4.555 4.023.636.275 1.132.439 1.52.562.638.203 1.219.174 1.678.106.512-.077 1.576-.644 1.798-1.266.222-.622.222-1.156.155-1.267-.066-.111-.244-.178-.51-.311z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
