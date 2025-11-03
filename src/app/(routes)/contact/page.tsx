import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactez nous pour plus d'information | La Culotte Rouge",
  description:
    "Contactez l’association La Culotte Rouge pour en savoir plus sur nos actions d’éducation menstruelle et nos ressources autour du cycle menstruel.",
  keywords: [
    "éducation menstruelle",
    "cycle menstruel",
    "informations règles",
    "pédagogie menstruelle",
    "santé des femmes",
    "sensibilisation cycle",
    "La Culotte Rouge association",
    "Contact",
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
