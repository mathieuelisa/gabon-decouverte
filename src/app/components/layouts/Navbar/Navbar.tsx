"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAVBAR_CONTENT } from "./Navbar.data";

import { BsChevronCompactUp } from "react-icons/bs";
import { BsChevronCompactDown } from "react-icons/bs";
import { CiMenuBurger } from "react-icons/ci";
import { VscClose } from "react-icons/vsc";
import { SlUser } from "react-icons/sl";

import { ActiviteKey, DecouverteKey, PanelKey } from "@/app/types/common";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useMobileMenu } from "@/app/contexts/MobileMenuContext";

import Image from "next/image";

export default function Navbar() {
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const [selectedActivite, setSelectedActivite] = useState<ActiviteKey | null>(
    null
  );
  const [selectedDecouverte, setSelectedDecouverte] =
    useState<DecouverteKey | null>(null);

  // Images de couverture pour activité part
  const activiteImageMap: Record<ActiviteKey, { src: string; alt: string }> = {
    art: {
      src: "/assets/images/activites/art-culture.jpg",
      alt: "Art & culture au Gabon",
    },
    eco: {
      src: "/assets/images/activites/ecotourisme-balneaire.jpg",
      alt: "Ecotourisme & balnéaire au Gabon",
    },
    nature: {
      src: "/assets/images/activites/nature-decouverte.jpg",
      alt: "Nature & Découverte au Gabon",
    },
  };

  // Images de couverture pour decouverte part
  const decouverteImageMap: Record<
    DecouverteKey,
    { src: string; alt: string }
  > = {
    libreville: {
      src: "/assets/images/activites/art-culture.jpg",
      alt: "Art & culture au Gabon",
    },
    lambarene: {
      src: "/assets/images/activites/ecotourisme-balneaire.jpg",
      alt: "Ecotourisme & balnéaire au Gabon",
    },
    mayumba: {
      src: "/assets/images/activites/nature-decouverte.jpg",
      alt: "Nature & Découverte au Gabon",
    },
    oyem: {
      src: "/assets/images/activites/nature-decouverte.jpg",
      alt: "Nature & Découverte au Gabon",
    },
  };

  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const panelLinkClass = (href: string) =>
    twMerge("text-black text-sm", isActive(href) && "text-red-500");

  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } =
    useMobileMenu();

  const isOpen = activePanel !== null;

  const closePanel = () => setActivePanel(null);

  const handleNavClick = () => {
    closePanel();
    setMobileMenuOpen(false);
  };

  const togglePanel = (key: PanelKey) => {
    setActivePanel((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    // --- Activités ---
    if (isActive("/activité/art-et-culture")) {
      setSelectedActivite("art");
    } else if (isActive("/activité/ecotourisme-et-balneaire")) {
      setSelectedActivite("eco");
    } else if (isActive("/activité/nature-et-decouverte")) {
      setSelectedActivite("nature");
    }

    // --- Découvrir ---
    if (isActive("/voyage-decouverte/libreville")) {
      setSelectedDecouverte("libreville");
    } else if (isActive("/voyage-decouverte/lambarene")) {
      setSelectedDecouverte("lambarene");
    } else if (isActive("/voyage-decouverte/mayumba")) {
      setSelectedDecouverte("mayumba");
    } else if (isActive("/voyage-decouverte/oyem")) {
      setSelectedDecouverte("oyem");
    }
  }, [pathname]);

  return (
    <header className='sticky top-0 sup-md:px-0 z-50 pl-4 flex flex-col items-center justify-between'>
      <section className='w-full'>
        <div className='border-b border-gray-200 h-[81px] flex items-center justify-between sup-md:px-14'>
          <Link
            href='/'
            aria-label='Se rendre a la page daccueil'
            onClick={() => setMobileMenuOpen(false)}
            className='flex justify-center items-center text-2xl sup-md:text-3xl font-display ml-5'
          >
            GABON DECOUVERTE
          </Link>

          <section className='flex w-2xs items-center gap-4 justify-center'>
            <SlUser />
            <p>EN / FR</p>
          </section>
        </div>
      </section>

      <section className='sticky bg-white w-full top-0 sup-md:px-14 z-50 pl- h-24 flex items-center justify-between'>
        <nav aria-label='Navigation principale'>
          <ul className='flex items-center'>
            {NAVBAR_CONTENT.map((item) => {
              return (
                <Link
                  key={item.label}
                  href={item.link}
                  onClick={handleNavClick}
                  className={twMerge(
                    "text-black text-sm uppercase ml-5 duration-500 ease-in-out transition-all font-display"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <li className='flex items-center justify-center gap-2'>
              <button
                type='button'
                onClick={() => togglePanel("activité")}
                aria-expanded={isOpen && activePanel === "activité"}
                aria-controls='navbar-extended-panel'
                className={twMerge(
                  "text-black cursor-pointer flex items-center gap-2 text-sm uppercase ml-5 duration-300 font-display",
                  isOpen && activePanel === "activité" ? "text-black" : ""
                )}
              >
                Activités
                {activePanel === "activité" ? (
                  <BsChevronCompactDown />
                ) : (
                  <BsChevronCompactUp />
                )}
              </button>
            </li>
            <li className='flex items-center justify-center gap-2'>
              <button
                type='button'
                onClick={() => togglePanel("decouverte")}
                aria-expanded={isOpen && activePanel === "decouverte"}
                aria-controls='navbar-extended-panel'
                className={twMerge(
                  "text-black cursor-pointer text-sm flex  items-center gap-2 uppercase ml-5 duration-300 font-display",
                  isOpen && activePanel === "decouverte" ? "text-black" : ""
                )}
              >
                Découvrir
                {activePanel === "decouverte" ? (
                  <BsChevronCompactDown />
                ) : (
                  <BsChevronCompactUp />
                )}
              </button>
            </li>

            <Link
              href='/contact'
              onClick={handleNavClick}
              className={twMerge(
                "text-black text-sm uppercase ml-5 font-display"
              )}
            >
              Contact
            </Link>
          </ul>
        </nav>

        <nav className='flex flex-col sup-md:hidden'>
          {isMobileMenuOpen ? (
            <button
              aria-label='Fermer le menu mobile'
              className='flex'
              onClick={toggleMobileMenu}
              type='button'
            >
              <VscClose />
            </button>
          ) : (
            <CiMenuBurger
              aria-label='Ouvrir le menu mobile'
              onClick={toggleMobileMenu}
            />
          )}
        </nav>
      </section>

      {/* Panneau extensible qui s'ouvre EN DESSOUS de la navbar */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id='navbar-extended-panel'
            key='extended-wrapper'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.25, 0.1, 0.25, 1],
              opacity: { duration: 0.25 },
            }}
            className='fixed z-60 w-full top-41 flex overflow-hidden bg-white rounded-b-2xl'
          >
            <AnimatePresence mode='wait' initial={false}>
              <motion.div
                key={activePanel}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className='flex w-full'
              >
                {activePanel === "activité" ? (
                  <>
                    <div className='sup-md:px-14 border-r border-red-500 px-4 py-4 w-[30%]'>
                      <ul className='flex flex-col gap-4'>
                        <li>
                          <Link
                            href='/activité/art-et-culture'
                            className={
                              (panelLinkClass("/activité/art-et-culture"),
                              "hover:font-bold")
                            }
                            onClick={handleNavClick}
                            onMouseEnter={() => setSelectedActivite("art")}
                            onFocus={() => setSelectedActivite("art")}
                          >
                            Art & culture
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              (panelLinkClass(
                                "/activité/ecotourisme-et-balneaire"
                              ),
                              "hover:font-bold")
                            }
                            href='/activité/ecotourisme-et-balneaire'
                            onClick={handleNavClick}
                            onMouseEnter={() => setSelectedActivite("eco")}
                            onFocus={() => setSelectedActivite("eco")}
                          >
                            Ecotourisme & balnéaire
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              (panelLinkClass("/activité/nature-et-decouverte"),
                              "hover:font-bold")
                            }
                            href='/activité/nature-et-decouverte'
                            onClick={handleNavClick}
                            onMouseEnter={() => setSelectedActivite("nature")}
                            onFocus={() => setSelectedActivite("nature")}
                          >
                            Nature & Découverte
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className='relative sup-md:px-14 w-full bg-amber-200'>
                      {selectedActivite ? (
                        <div className='relative w-full h-full sup-md:h-[420px] rounded-xl overflow-hidden'>
                          <Image
                            src={activiteImageMap[selectedActivite].src}
                            alt={activiteImageMap[selectedActivite].alt}
                            fill
                            sizes='(max-width: 768px) 100vw, 70vw'
                            className='object-cover'
                            priority
                          />
                        </div>
                      ) : (
                        // Image par defaut
                        <div className='relative w-full h-full sup-md:h-[420px] rounded-xl overflow-hidden'>
                          <Image
                            src='/assets/images/activites/art-culture.jpg'
                            alt='Activités'
                            fill
                            className='object-cover'
                          />
                        </div>
                      )}

                      <button
                        type='button'
                        className='absolute cursor-pointer bottom-56 font-display transition-all ease-in-out duration-400 bg-black hover:bg-shark-800 text-white font-bold px-7 py-2'
                      >
                        DECOUVRIR NOS ACTIVITES
                      </button>
                    </div>
                  </>
                ) : (
                  activePanel === "decouverte" && (
                    <>
                      <div className='sup-md:px-14 border-r border-red-500 px-4 py-4 w-[30%]'>
                        <ul className='flex flex-col gap-4'>
                          <li>
                            <Link
                              className={
                                (panelLinkClass(
                                  "/voyage-decouverte/libreville"
                                ),
                                "hover:font-bold")
                              }
                              href='/voyage-decouverte/libreville'
                              onClick={handleNavClick}
                              onMouseEnter={() =>
                                setSelectedDecouverte("libreville")
                              }
                              onFocus={() =>
                                setSelectedDecouverte("libreville")
                              }
                            >
                              Partir à la découverte de libreville
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={
                                (panelLinkClass("/voyage-decouverte/lambarene"),
                                "hover:font-bold")
                              }
                              href='/voyage-decouverte/lambarene'
                              onClick={handleNavClick}
                              onMouseEnter={() =>
                                setSelectedDecouverte("lambarene")
                              }
                              onFocus={() => setSelectedDecouverte("lambarene")}
                            >
                              Visitez Lambaréné, le cœur battant du Gabon
                            </Link>
                          </li>

                          <li>
                            <Link
                              className={
                                (panelLinkClass("/voyage-decouverte/mayumba"),
                                "hover:font-bold")
                              }
                              href='/voyage-decouverte/mayumba'
                              onClick={handleNavClick}
                              onMouseEnter={() =>
                                setSelectedDecouverte("mayumba")
                              }
                              onFocus={() => setSelectedDecouverte("mayumba")}
                            >
                              Explorez Mayumba, un joyau du Gabon
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={
                                (panelLinkClass("/voyage-decouverte/oyem"),
                                "hover:font-bold")
                              }
                              href='/voyage-decouverte/oyem'
                              onClick={handleNavClick}
                              onMouseEnter={() => setSelectedDecouverte("oyem")}
                              onFocus={() => setSelectedDecouverte("oyem")}
                            >
                              À la découverte de Oyem, entre traditions et
                              modernité
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className='sup-md:px-14 w-full px-4 py-4 bg-red-200'>
                        {selectedDecouverte ? (
                          <div className='relative w-full h-full sup-md:h-[420px] rounded-xl overflow-hidden'>
                            <Image
                              src={decouverteImageMap[selectedDecouverte].src}
                              alt={decouverteImageMap[selectedDecouverte].alt}
                              fill
                              sizes='(max-width: 768px) 100vw, 70vw'
                              className='object-cover'
                              priority
                            />
                          </div>
                        ) : (
                          // Image par defaut
                          <div className='relative w-full h-full sup-md:h-[420px] rounded-xl overflow-hidden'>
                            <Image
                              src='/assets/images/activites/art-culture.jpg'
                              alt='Activités'
                              fill
                              className='object-cover'
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
