import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactez-nous pour plus d'information | Gabon Decouverte",
  description:
    "Contactez Gabon Decouverte pour en savoir plus sur nos activités.",
  keywords: [
    "activité nautique",
    "contact",
    "informations règles",
    "restauration",
    "voyages",
    "activites",
    "gabon",
    "organisation de voyages",
  ],
  alternates: {
    canonical: "https://www.decouvertegabon.com/contact",
  },
  openGraph: {
    title: "Contact | Decouverte Gabon",
    description: "Bla bla",
    url: "https://www.decouvertegabon.com/contact",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ContactPage() {
  return <p>Page de contact</p>;
}
