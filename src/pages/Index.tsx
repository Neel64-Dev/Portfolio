import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Education } from '@/components/Education';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Certificates } from '@/components/Certificates';
import { Contact } from '@/components/Contact';
import { TerminalAdvanced } from '@/components/TerminalAdvanced';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  return (
    <main className="relative">
      <ThemeToggle />
      <Hero />
      <About />
      <Skills />
      <Education />
      {/* <Projects /> */}
      <Experience />
      <Certificates />
      <Contact />
      <TerminalAdvanced />

      <footer className="py-8 text-center border-t border-border">
        <p className="text-muted-foreground font-mono text-sm">
          <span className="text-primary">{'// '}</span>
           {new Date().getFullYear()} &copy; Neel Prajapati Crafted with ❤️
          <span className="text-primary">{' //'}</span>
        </p>
      </footer>
    </main>
  );
};

export default Index;
