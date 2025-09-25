import "./globals.css";
import {
  Inter,
  Fira_Code,
  JetBrains_Mono,
  Source_Code_Pro,
} from "next/font/google";
import Navigation from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
  display: "swap",
});

export const metadata = {
  title: "Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} ${jetBrainsMono.variable} ${sourceCodePro.variable}`}
    >
      <body className="bg-charcoal text-white selection:bg-electric-orange/30 selection:text-white">
        <Navigation className="fixed top-0 left-0 right-0 z-50 border-b border-neon-cyan/30" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
