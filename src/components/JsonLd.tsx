import { clinicData } from "@/data/clinicData";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": "https://acureatus.com",
  name: clinicData.business_identity.name,
  description: clinicData.business_identity.branding_tagline,
  url: "https://acureatus.com",
  telephone: clinicData.locations[0].contact_numbers[0],
  image: "https://acureatus.com/pwa-512x512.png",
  logo: "https://acureatus.com/pwa-512x512.png",
  priceRange: "₹250 - ₹500",
  currenciesAccepted: "INR",
  paymentAccepted: clinicData.payment_options.join(", "),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: clinicData.business_identity.rating,
    reviewCount: clinicData.business_identity.review_count,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, Time Square Building, Shivabagh, Mallikatte, Kadri",
    addressLocality: "Mangaluru",
    addressRegion: "Karnataka",
    postalCode: "575002",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.8761,
    longitude: 74.856,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  medicalSpecialty: [
    "Physiotherapy",
    "Rehabilitation",
    "Pain Management",
    "Sports Medicine",
    "Neurorehabilitation",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Physiotherapy Treatments",
    itemListElement: clinicData.treatment_price_list_inr.map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "MedicalTherapy",
        name: item.item,
      },
      price: item.price || item.price_range?.toString().split(" - ")[0],
      priceCurrency: "INR",
    })),
  },
  sameAs: [
    clinicData.locations[0].google_maps_url,
  ],
};

const JsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
  />
);

export default JsonLd;
