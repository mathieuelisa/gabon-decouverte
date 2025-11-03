"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAVBAR_CONTENT } from "./Navbar.data";

import { BsChevronCompactUp } from "react-icons/bs";
import { BsChevronCompactDown } from "react-icons/bs";

import { PanelKey } from "@/app/types/common";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useMobileMenu } from "@/app/contexts/MobileMenuContext";

export default function Navbar() {
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);

  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const activitéMessage = isActive("/activité/art-et-culture")
    ? "Inspire, partage, fais grandir les autres en t’amusant."
    : isActive("/activité/nature-et-decouverte")
    ? "Ensemble, changeons les choses, un geste à la fois."
    : "Ton soutien fait battre le cœur de La Culotte Rouge.";

  const decouverteMessage = isActive("/voyage-decouverte/libreville")
    ? "Une équipe de cœurs engagés pour un monde plus juste et solidaire."
    : "Nos valeurs guident chacune de nos actions : humanité, solidarité, dignité.";

  const actionsMessageMap: Record<string, string> = {
    "/actions/ateliers-ludiques":
      "Apprendre, créer, s’amuser… pour grandir ensemble autrement.",
    "/actions/sensibilisation":
      "Parce que chaque échange peut semer une graine de changement.",
    "/actions/formations": "Se former pour mieux agir, ensemble.",
    "/actions/conferences":
      "Des paroles qui éveillent, des idées qui font bouger les lignes.",
    "/actions/initiatives-locales":
      "Le changement commence ici, dans nos quartiers et nos villages.",
    "/actions/initiatives-a-l-etranger":
      "Solidaires sans frontières, unis par la même humanité.",
  };

  // On cherche le premier slug qui matche la route courante,
  // sinon on renvoie un message par défaut.
  const matchedAction = Object.entries(actionsMessageMap).find(([href]) =>
    isActive(href)
  );
  const actionsMessage =
    matchedAction?.[1] ?? "Nos actions sur le terrain, toute l’année.";

  const panelLinkClass = (href: string) =>
    twMerge("text-black text-sm", isActive(href) && "text-red-500");

  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } =
    useMobileMenu();

  const isOpen = activePanel !== null;

  const closePanel = () => setActivePanel(null);

  const subMenuArray = [
    "/activité/nature-et-decouverte",
    "/activité/art-et-culture",
    "/activité/ecotourisme-et-balneaire",
  ];

  const subMenuArray2 = [
    "/actions/ateliers-ludiques",
    "/actions/sensibilisation",
    "/actions/formations",
    "/actions/conferences",
    "/actions/initiatives-locales",
    "/actions/initiatives-a-l-etranger",
  ];

  const subMenuArray3 = [
    "/voyage-decouverte/libreville",
    "/voyage-decouverte/lambarene",
    "/voyage-decouverte/mayumba",
    "/voyage-decouverte/oyem",
  ];

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

  return (
    <header className='sticky top-0 sup-md:px-0 z-50 pl-4 flex flex-col items-center justify-between'>
      <section className='w-full'>
        <div className='border-b border-gray-200 h-[81px] flex items-center justify-between sup-md:px-14'>
          <Link
            href='/'
            aria-label='Aller a la page d accueil'
            onClick={() => setMobileMenuOpen(false)}
            className='flex justify-center items-center text-2xl sup-md:text-3xl font-display ml-5'
          >
            GABON DECOUVERTE
          </Link>

          <section className='flex w-2xs items-center gap-4 justify-center'>
            <p>Login</p>
            <p>Switch EN/FR</p>
          </section>
        </div>
      </section>

      <section className='sticky bg-white w-full top-0 sup-md:px-14 z-50 pl- h-24 flex items-center justify-between'>
        <nav aria-label='Navigation principale'>
          <ul className='flex items-center'>
            {NAVBAR_CONTENT.map((item) => {
              const isActive =
                item.link === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.link);

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
                onClick={() => togglePanel("agir")}
                aria-expanded={isOpen && activePanel === "agir"}
                aria-controls='navbar-extended-panel'
                className={twMerge(
                  "text-black cursor-pointer flex items-center gap-2 text-sm uppercase ml-5 duration-300 font-display",
                  isOpen && activePanel === "agir" ? "text-black" : ""
                )}
              >
                Activités
                {activePanel === "agir" ? (
                  <BsChevronCompactDown />
                ) : (
                  <BsChevronCompactUp />
                )}
              </button>
            </li>
            <li className='flex items-center justify-center gap-2'>
              <button
                type='button'
                onClick={() => togglePanel("asso")}
                aria-expanded={isOpen && activePanel === "asso"}
                aria-controls='navbar-extended-panel'
                className={twMerge(
                  "text-black cursor-pointer text-sm flex  items-center gap-2 uppercase ml-5 duration-300 font-display",
                  isOpen && activePanel === "asso" ? "text-black" : ""
                )}
              >
                Découvrir
                {activePanel === "asso" ? (
                  <BsChevronCompactDown />
                ) : (
                  <BsChevronCompactUp />
                )}
              </button>
            </li>
            <li className='flex items-center justify-center gap-2'>
              <button
                type='button'
                onClick={() => togglePanel("actions")}
                aria-expanded={isOpen && activePanel === "actions"}
                aria-controls='navbar-extended-panel'
                className={twMerge(
                  "text-black cursor-pointer text-sm flex items-center gap-2 uppercase ml-5 duration-300 font-display",
                  isOpen && activePanel === "actions" ? "text-black" : ""
                )}
              >
                Nos actions
                {activePanel === "actions" ? (
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
                "text-black text-sm uppercase ml-5 duration-500 ease-in-out transition-all font-display"
              )}
            >
              Bavardons ensemble
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
              {/* <CloseIcon className='text-red-500 h-6 w-16 cursor-pointer duration-500 ease-in-out transition-all' /> */}
            </button>
          ) : (
            // <BurgerMenuIcon
            //   aria-label='Ouvrir le menu mobile'
            //   onClick={toggleMobileMenu}
            //   className='h-11 duration-500 transition ease-in-out text-red-500 cursor-pointer w-16'
            // />
            <p>B</p>
          )}
        </nav>
      </section>

      {/* Overlay cliquable (click-outside) */}
      {isOpen && (
        <button
          type='button'
          aria-label='Fermer le panneau'
          onClick={closePanel}
          className='fixed inset-0 z-40 cursor-default'
        />
      )}

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
                {activePanel === "agir" ? (
                  <>
                    <div className='sup-md:px-14 border-r border-red-500 px-4 py-4 w-[30%]'>
                      <ul className='flex flex-col gap-4'>
                        <li>
                          <Link
                            href='/activité/art-et-culture'
                            className={panelLinkClass("/art-et-culture")}
                            onClick={handleNavClick}
                          >
                            Art & culture
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={panelLinkClass(
                              "/ecotourisme-et-balneaire"
                            )}
                            href='/activité/ecotourisme-et-balneaire'
                            onClick={handleNavClick}
                          >
                            Ecotourisme & balnéaire
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={panelLinkClass("/nature-et-decouverte")}
                            href='/activité/nature-et-decouverte'
                            onClick={handleNavClick}
                          >
                            Nature & Découverte
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className='sup-md:px-14 w-[60%] px-4 py-4'>
                      <p className='text-red-500 text-sm italic'>
                        {activitéMessage}
                      </p>
                    </div>
                  </>
                ) : activePanel === "asso" ? (
                  <>
                    <div className='sup-md:px-14 border-r border-red-500 px-4 py-4 w-[30%]'>
                      <ul className='flex flex-col gap-4'>
                        <li>
                          <Link
                            className={panelLinkClass(
                              "/voyage-decouverte/libreville"
                            )}
                            href='/voyage-decouverte/libreville'
                            onClick={handleNavClick}
                          >
                            Partir a la découverte de libreville
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={panelLinkClass(
                              "/voyage-decouverte/lambarene"
                            )}
                            href='/voyage-decouverte/lambarene'
                            onClick={handleNavClick}
                          >
                            Visitez Lambaréné, le cœur battant du Gabon
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={panelLinkClass(
                              "/voyage-decouverte/mayumba"
                            )}
                            href='/voyage-decouverte/mayumba'
                            onClick={handleNavClick}
                          >
                            Explorez Mayumba, un joyau du Gabon
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={panelLinkClass(
                              "/voyage-decouverte/oyem"
                            )}
                            href='/voyage-decouverte/oyem'
                            onClick={handleNavClick}
                          >
                            À la découverte de Oyem, entre traditions et
                            modernité
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className='sup-md:px-14 w-[60%] px-4 py-4'>
                      <p className='text-red-500 text-sm italic'>
                        {decouverteMessage}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='sup-md:px-14 border-r border-red-500 px-4 py-4 w-[30%]'>
                      <ul className='flex flex-col gap-4'>
                        <li>
                          <Link
                            href='/actions/ateliers-ludiques'
                            onClick={handleNavClick}
                            className={panelLinkClass(
                              "/actions/ateliers-ludiques"
                            )}
                          >
                            Nos ateliers ludiques
                          </Link>
                        </li>
                        <li>
                          <Link
                            href='/actions/sensibilisation'
                            onClick={handleNavClick}
                            className={panelLinkClass(
                              "/actions/sensibilisation"
                            )}
                          >
                            Nos stands de sensibilisation
                          </Link>
                        </li>
                        <li>
                          <Link
                            href='/actions/formations'
                            onClick={handleNavClick}
                            className={panelLinkClass("/actions/formations")}
                          >
                            Nos formations
                          </Link>
                        </li>
                        <li>
                          <Link
                            href='/actions/conferences'
                            onClick={handleNavClick}
                            className={panelLinkClass("/actions/conferences")}
                          >
                            Nos conferences
                          </Link>
                        </li>
                        <li>
                          <Link
                            href='/actions/initiatives-locales'
                            onClick={handleNavClick}
                            className={panelLinkClass(
                              "/actions/initiatives-locales"
                            )}
                          >
                            Nos initiatives locales
                          </Link>
                        </li>
                        <li>
                          <Link
                            href='/actions/initiatives-a-l-etranger'
                            onClick={handleNavClick}
                            className={panelLinkClass(
                              "/actions/initiatives-a-l-etranger"
                            )}
                          >
                            Nos initiatives à l&#39;étranger
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className='sup-md:px-14 w-[60%] px-4 py-4'>
                      <p className='text-red-500 text-sm italic'>
                        {actionsMessage}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
