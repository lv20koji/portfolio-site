import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/types";
import { Header, Hero, About, Skills, Career, Certifications, Projects, Footer } from "./sections";

export default function PortfolioPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <>
      <Header locale={locale} content={content} />
      <main id="main">
        <Hero content={content} />
        <About content={content} />
        <Skills content={content} />
        <Career content={content} />
        <Certifications content={content} />
        <Projects content={content} />
      </main>
      <Footer content={content} />
    </>
  );
}
