import Image from "next/image";
import type { PortfolioContent } from "@/lib/types";
import { BASE_PATH } from "@/lib/content";
import HeroParticles from "./HeroParticles";
import LocaleSwitch from "./LocaleSwitch";
import ThemeToggle from "./ThemeToggle";
import Reveal from "./Reveal";
import type { Locale } from "@/lib/types";

export function Header({ locale, content }: { locale: Locale; content: PortfolioContent }) {
  const ui = content.profile.ui;
  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        {ui.skipToContent}
      </a>
      <div className="header-inner">
        <a href="#top" className="brand">
          {content.profile.name}
        </a>
        <nav className="section-nav" aria-label="Sections">
          <a href="#about">{ui.about}</a>
          <a href="#skills">{ui.skills}</a>
          <a href="#career">{ui.career}</a>
          <a href="#projects">{ui.projects}</a>
        </nav>
        <div className="header-actions">
          <LocaleSwitch current={locale} />
          <ThemeToggle labelToDark={ui.switchToDark} labelToLight={ui.switchToLight} />
        </div>
      </div>
    </header>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="section-heading">
      <p className="kicker" aria-hidden="true">
        {kicker}
      </p>
      <h2>{title}</h2>
    </div>
  );
}

export function Hero({ content }: { content: PortfolioContent }) {
  const p = content.profile;
  return (
    <section id="top" className="hero">
      <HeroParticles />
      <div className="hero-grid">
        <div className="hero-text">
          <h1 className="hero-name enter" style={{ "--d": "70ms" } as React.CSSProperties}>
            {p.name}
          </h1>
          <p className="hero-role enter" style={{ "--d": "150ms" } as React.CSSProperties}>
            {p.role}
            <span className="cursor" aria-hidden="true" />
          </p>
          <p className="hero-tagline enter" style={{ "--d": "230ms" } as React.CSSProperties}>
            {p.tagline}
          </p>
          <ul className="hero-meta" aria-label="Experience">
            {content.career.map((entry, i) => (
              <li
                key={entry.id}
                className="enter"
                style={{ "--d": `${310 + i * 40}ms` } as React.CSSProperties}
              >
                {entry.area} — {entry.years}
                {p.ui.years}
              </li>
            ))}
          </ul>
          <p className="hero-links enter" style={{ "--d": "450ms" } as React.CSSProperties}>
            <a className="button" href={p.githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="button-ghost" href="#projects">
              {p.ui.projects} ↓
            </a>
          </p>
        </div>
        <Image
          src={`${BASE_PATH}/avatar.png`}
          alt=""
          width={160}
          height={160}
          className="avatar enter-avatar"
          style={{ "--d": "0ms" } as React.CSSProperties}
          priority
        />
      </div>
    </section>
  );
}

export function About({ content }: { content: PortfolioContent }) {
  const p = content.profile;
  return (
    <section id="about" className="section">
      <SectionHeading kicker="ABOUT" title={p.ui.about} />
      {p.about.map((paragraph) => (
        <p key={paragraph.slice(0, 16)} className="body-text">
          {paragraph}
        </p>
      ))}
    </section>
  );
}

export function Skills({ content }: { content: PortfolioContent }) {
  return (
    <section id="skills" className="section">
      <SectionHeading kicker="SKILLS" title={content.profile.ui.skills} />
      <div className="skills-grid">
        {content.skills.map((category, i) => (
          <Reveal key={category.id} delay={Math.min(i, 2) * 70}>
            <article className="card">
              <h3>{category.title}</h3>
              <ul className="skill-list">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <span className="skill-name">{item.name}</span>
                    <span className="skill-note">{item.note}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Career({ content }: { content: PortfolioContent }) {
  const ui = content.profile.ui;
  return (
    <section id="career" className="section">
      <SectionHeading kicker="CAREER" title={ui.career} />
      <div className="career-grid">
        {content.career.map((entry, i) => (
          <Reveal key={entry.id} delay={i * 70}>
            <article className="card career-card">
              <span className="career-ghost" aria-hidden="true">
                {entry.years}
              </span>
              <p className="career-years">
                <span className="years-number">{entry.years}</span>
                <span className="years-unit">{ui.years}</span>
              </p>
              <h3>{entry.area}</h3>
              <p className="body-text">{entry.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Certifications({ content }: { content: PortfolioContent }) {
  return (
    <section id="certifications" className="section">
      <SectionHeading kicker="CERTIFICATIONS" title={content.profile.ui.certifications} />
      <ul className="cert-list">
        {content.certifications.map((cert) => (
          <li key={cert.id} className="cert-item">
            <span className="cert-name">{cert.name}</span>
            <span className="cert-status">{cert.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Projects({ content }: { content: PortfolioContent }) {
  return (
    <section id="projects" className="section">
      <SectionHeading kicker="PROJECTS" title={content.profile.ui.projects} />
      <div className="projects-grid">
        {content.projects.map((project, i) => (
          <Reveal key={project.id} delay={Math.min(i, 2) * 70}>
            <article className="card">
              <h3>
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noreferrer">
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </h3>
              <p className="body-text">{project.description}</p>
              <ul className="tech-list" aria-label="Tech">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Footer({ content }: { content: PortfolioContent }) {
  const p = content.profile;
  return (
    <footer className="site-footer">
      <p className="footer-wordmark" aria-hidden="true">
        {p.name}
      </p>
      <p>
        <a href={p.githubUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </p>
      <p className="footer-note">{p.ui.footerNote}</p>
      <p className="footer-copy">© 2026 {p.name}</p>
    </footer>
  );
}
