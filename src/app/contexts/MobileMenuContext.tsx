"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type MobileMenuContextProps = {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileMenuContext = createContext<MobileMenuContextProps>({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => {},
  setMobileMenuOpen: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const MobileMenuProvider = ({ children }: Props) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <MobileMenuContext.Provider
      value={{ isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenu = () => {
  return useContext(MobileMenuContext);
};
