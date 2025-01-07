import localFont from "next/font/local";

const BelerenTitle = localFont({
  src: [
    {
      path: "../../../public/fonts/beleren/Beleren2016-Bold.woff",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../../../public/fonts/beleren/Beleren2016SmallCaps-Bold.woff",
      weight: "bold",
      style: "small-caps",
    },
    {
      path:
        "../../../public/fonts/beleren/Beleren2016SmallCaps-BoldItalic.woff",
      weight: "bold",
      style: "italic",
    },
  ],
  variable: "--font-beleren-title",
});

export { BelerenTitle };
