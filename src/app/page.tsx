import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Découverte Gabon | Activités et expériences inoubliables au Gabon",
  description:
    "Découverte Gabon vous aide à trouver les meilleures activités, excursions et expériences au Gabon : nature, aventure, culture et détente. Explorez le pays autrement !",
  keywords: [
    "Découverte Gabon",
    "Activités Gabon",
    "Tourisme Gabon",
    "Voyage Gabon",
    "Excursions Gabon",
    "Visites guidées Gabon",
    "Nature Gabon",
    "Loisirs Gabon",
    "Aventure au Gabon",
  ],
  alternates: {
    canonical: "https://www.decouvertegabon.com/",
  },
  openGraph: {
    title: "Découverte Gabon | Explorez les trésors du Gabon",
    description:
      "Découvrez les plus belles activités du Gabon : safaris, randonnées, plages, parcs nationaux et rencontres culturelles. Vivez une expérience unique avec Découverte Gabon.",
    url: "https://www.decouvertegabon.com/",
    siteName: "Découverte Gabon",
    images: [
      // {
      //   url: "https://www.decouvertegabon.com/assets/images/home/cover-gabon.jpg",
      //   width: 1200,
      //   height: 630,
      //   alt: "Découverte Gabon - Activités et tourisme au Gabon",
      // },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function Home() {
  return <p>COUCOU WORLD</p>;
}
