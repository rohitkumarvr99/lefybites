export interface ProductConfig {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discountBadge: string;
  themeColor: string; // Hex code or tailwind color
  coverImage: string;
  pdfFilename: string;
  pdfPath: string;
  emailSubject: string;
  driveUrl?: string; // Direct download link (e.g. Google Drive folder) used in the email
}

export const products: Record<string, ProductConfig> = {
  "dadi-sutra": {
    id: "dadi-sutra",
    name: "दादी सूत्र (Dadi Sutra)",
    title: "दादी सूत्र (Dadi Sutra)",
    subtitle: "दादी माँ के आज़माए हुए घरेलू नुस्खे — Complete Family Health & Ayurvedic Home Guide",
    price: 199,
    originalPrice: 499,
    discountBadge: "60% छूट",
    themeColor: "#6b1f1f", // primary-800 maroon
    coverImage: "/cover.png",
    pdfFilename: "Dadi_Sutra_Ebook.pdf",
    pdfPath: "dadi-sutra.pdf",
    emailSubject: "दादी सूत्र (Dadi Sutra) ई-बुक: आपका डाउनलोड लिंक तैयार है!",
  },
  "god-reels": {
    id: "god-reels",
    name: "600+ AI Animated God Reels Bundle",
    title: "600+ AI Animated God Reels Bundle",
    subtitle: "Introducing the Ultimate 600+ AI Animated God Reels Bundle! ✨🚀",
    price: 148,
    originalPrice: 1499,
    discountBadge: "90% OFF",
    themeColor: "#312e81", // indigo-900 / royal purple theme color
    coverImage: "/god-reels-cover.png",
    pdfFilename: "600_AI_Animated_God_Reels_Bundle.pdf",
    pdfPath: "god-reels.pdf",
    emailSubject: "600+ AI Animated God Reels Bundle: Your Download Link is Ready! ✨🙏",
    driveUrl: "https://drive.google.com/drive/folders/1Gh_PUaOohrIJ7eJSsx9vI9zeyOjWxbuj?usp=sharing",
  },
};

export const defaultProduct = products["dadi-sutra"];

export function getProduct(id: string | null | undefined): ProductConfig {
  if (!id) return defaultProduct;
  return products[id] || defaultProduct;
}
