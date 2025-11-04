export type TIcons = {
  className: string;
  onClick?: () => void;
};

export type Pricing = {
  id: number;
  title: string;
};

export type PanelKey = "activité" | "decouverte";
export type ActiviteKey = "art" | "eco" | "nature";
export type DecouverteKey = "libreville" | "oyem" | "mayumba" | "lambarene";

export type Slide = {
  id: number;
  image: string;
  title?: string;
};
