export type TIcons = {
  className: string;
  onClick?: () => void;
};

export type Pricing = {
  id: number;
  title: string;
};

export type PanelKey = "agir" | "asso" | "actions";

export type Slide = {
  id: number;
  image: string;
  title?: string;
};
