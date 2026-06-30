export const metadata = {
  metadataBase: new URL("https://martineskorbakk.com"),
  title: {
    template: `%s | Martine's Portfolio`,
    default: `Martine's Portfolio`,
  },
  description: "Designer & Developer. Crafting thoughtful digital experiences.",
  openGraph: {
    title: "Martine | Frontend Developer & UI Designer",
    description:
      "Designer & Developer. Crafting thoughtful digital experiences.",
    url: "https://martineskorbakk.com",
    siteName: "Martine Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Martine",
    creator: "@martinedev_",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
