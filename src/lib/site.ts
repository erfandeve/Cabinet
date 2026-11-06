export const site = {
  name: "آرکا کابینت",
  nameEn: "Arka Cabinet",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://arkacabinet.ir").replace(/\/$/, ""),
  tagline: "طراحی، ساخت و فروش لوازم و یراق‌آلات کابینت",
  description:
    "آرکا کابینت؛ فروش تخصصی لوازم و یراق‌آلات کابینت (لولا، ریل، جک، دستگیره، سبد سوپری)، طراحی سه‌بعدی رایگان، ساخت و نصب کابینت آشپزخانه، کمد دیواری و روشویی در تهران با ضمانت و ارسال به سراسر ایران.",
  phone: "021-88776655",
  phoneHref: "+982188776655",
  mobile: "0912-345-6789",
  mobileHref: "+989123456789",
  email: "info@arkacabinet.ir",
  address: {
    street: "خیابان شریعتی، بالاتر از پل صدر، پلاک ۱۲۴۰",
    city: "تهران",
    region: "تهران",
    postalCode: "1937933111",
    country: "IR",
  },
  geo: { lat: 35.7676, lng: 51.4442 },
  hours: [
    { days: "شنبه تا چهارشنبه", time: "۹:۰۰ تا ۱۹:۰۰" },
    { days: "پنجشنبه", time: "۹:۰۰ تا ۱۴:۰۰" },
  ],
  social: {
    instagram: "https://instagram.com/arkacabinet",
    telegram: "https://t.me/arkacabinet",
    whatsapp: "https://wa.me/989123456789",
    aparat: "https://www.aparat.com/arkacabinet",
  },
  founded: "۱۳۹۲",
  keywords: [
    "لوازم کابینت",
    "یراق آلات کابینت",
    "خرید لولا کابینت",
    "ریل کشو کابینت",
    "جک کابینت",
    "دستگیره کابینت",
    "سبد سوپری",
    "کابینت آشپزخانه",
    "کابینت های گلاس",
    "طراحی سه بعدی کابینت",
    "کمد دیواری",
    "کابینت روشویی",
  ],
};

export const absUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

export const nav = [
  { href: "/", label: "خانه" },
  { href: "/categories", label: "فروشگاه لوازم" },
  { href: "/services", label: "خدمات" },
  { href: "/gallery", label: "نمونه کارها" },
  { href: "/blog", label: "مجله" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];
