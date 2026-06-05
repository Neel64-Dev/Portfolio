import { useEffect, useRef, useState } from 'react';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';
import gsap from 'gsap';
import { skillCategories } from './Skills';
import { projects } from './Projects';
import { experiences } from './Experience';

interface TerminalLine {
  type: 'input' | 'output' | 'success' | 'error';
  text: string;
}

const commands = {
  help: `Available commands:
  help        - Show this help message
  about       - View information about me
  skills      - Show my technology stack
  projects    - See my project list
  experience  - Show experience timeline
  contact     - Send me a message
  clear       - Clear terminal`,

  about: `Full Stack Developer & Creative Coder

I'm a passionate developer who loves building beautiful, interactive web experiences.
With expertise in modern web technologies and a keen eye for design, I create
applications that are both functional and visually stunning.

Specializing in React, TypeScript, Three.js, and modern web animation.`,

  skills: () => {
    let output = 'Technology Stack:\n\n';
    skillCategories.forEach(cat => {
      output += `${cat.category}:\n`;
      cat.skills.forEach(skill => {
        output += `  > ${skill}\n`;
      });
      output += '\n';
    });
    return output.trim();
  },

  projects: () => {
    let output = 'Project Portfolio:\n\n';
    projects.forEach((project, i) => {
      output += `${i + 1}. ${project.title}\n`;
      output += `   ${project.description}\n`;
      output += `   Tech: ${project.technologies.join(', ')}\n`;
      // if (project.link) output += `   Link: ${project.link}\n`;
      if (project.github) output += `   Link: ${project.github}\n`;
      output += '\n';
    });
    return output.trim();
  },

  experience: () => {
    let output = 'Work Experience:\n\n';
    experiences.forEach((exp, i) => {
      output += `${i + 1}. ${exp.role} at ${exp.company}\n`;
      output += `   Period: ${exp.period}\n`;
      output += `   ${exp.description}\n`;
      output += `   Tech: ${exp.technologies.join(', ')}\n\n`;
    });
    return output.trim();
  },
};

export const TerminalAdvanced = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [contactStep, setContactStep] = useState<'none' | 'name' | 'email' | 'subject' | 'message'>('none');
  const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' });

  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => setIsVisible(window.innerWidth >= 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Startup animation
  useEffect(() => {
    if (!isVisible) return;

    const startupSequence = [
      { text: 'Initializing system...', delay: 0.5 },
      { text: 'Loading portfolio modules...', delay: 1.2 },
      { text: 'Welcome to Neel\'s Portfolio!', delay: 1.8 },
      { text: 'Type "help" to see available commands.', delay: 2.5 },
    ];

    startupSequence.forEach(({ text, delay }) => {
      setTimeout(() => {
        setLines(prev => [...prev, { type: 'output', text }]);

        // Scroll to bottom
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
          }
        }, 50);
      }, delay * 1000);
    });

    // Animate terminal entrance
    if (terminalRef.current) {
      gsap.fromTo(
        terminalRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.3, ease: 'back.out(1.7)' }
      );
    }

    // Cursor blink animation
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }, [isVisible]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Handle contact form flow
    if (contactStep !== 'none') {
      handleContactInput(cmd);
      return;
    }

    // Add input line
    setLines(prev => [...prev, { type: 'input', text: cmd }]);

    if (trimmedCmd === '') return;

    if (trimmedCmd === 'clear') {
      setLines([]);
      return;
    }

    if (trimmedCmd === 'contact') {
      setContactStep('name');
      setLines(prev => [...prev, { type: 'output', text: 'Enter your full name:' }]);
      return;
    }

    // Execute command
    if (trimmedCmd === 'help') {
      typeText(commands.help);
    } else if (trimmedCmd === 'about') {
      typeText(commands.about);
    } else if (trimmedCmd === 'skills') {
      typeText(commands.skills());
    } else if (trimmedCmd === 'projects') {
      typeText(commands.projects());
    } else if (trimmedCmd === 'experience') {
      typeText(commands.experience());
    } else {
      setLines(prev => [...prev, {
        type: 'error',
        text: `Command not found: ${cmd}\nType "help" for available commands.`
      }]);
    }
  };

  const handleContactInput = (value: string) => {
    if (contactStep === 'name') {
      setContactData(prev => ({ ...prev, name: value }));
      setLines(prev => [...prev,
      { type: 'input', text: value },
      { type: 'output', text: 'Enter your email:' }
      ]);
      setContactStep('email');
    } else if (contactStep === 'email') {
      setContactData(prev => ({ ...prev, email: value }));
      setLines(prev => [...prev,
      { type: 'input', text: value },
      { type: 'output', text: 'Enter subject:' }
      ]);
      setContactStep('subject');
    } else if (contactStep === 'subject') {
      setContactData(prev => ({ ...prev, subject: value }));
      setLines(prev => [...prev,
      { type: 'input', text: value },
      { type: 'output', text: 'Enter message (press ENTER when done):' }
      ]);
      setContactStep('message');
    } else if (contactStep === 'message') {
      const finalContactData = { ...contactData, message: value };
      setContactData(finalContactData);
      setLines(prev => [...prev,
      { type: 'input', text: value },
      { type: 'output', text: 'Sending email...' }
      ]);

      // Send actual email
      sendEmail(finalContactData);
    }
  };

  const sendEmail = async (data: { name: string; email: string; subject: string; message: string }) => {
    try {
      // Using Web3Forms - Free email service, no signup required
      // Get your access key from: https://web3forms.com/
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd8f08d79-6677-4af4-be0d-1de21d0716aa', // Replace with your key from web3forms.com
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          from_name: data.name,
          replyto: data.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setLines(prev => [...prev, {
          type: 'success',
          text: `✓ Email sent successfully!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
From: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your message has been delivered to my inbox.
I'll get back to you as soon as possible!

Type 'help' to see other commands.`
        }]);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email Error:', error); // Debug log

      setLines(prev => [...prev, {
        type: 'error',
        text: `✗ Failed to send email.

Error: ${error instanceof Error ? error.message : 'Network error'}

Please check your internet connection and try again.
Type 'contact' to retry.`
      }]);
    } finally {
      setContactStep('none');
      setContactData({ name: '', email: '', subject: '', message: '' });
    }
  };

  const typeText = (text: string) => {
    const lines = text.split('\n');
    let currentIndex = 0;

    const typeNextLine = () => {
      if (currentIndex < lines.length) {
        setLines(prev => [...prev, { type: 'output', text: lines[currentIndex] }]);
        currentIndex++;
        setTimeout(typeNextLine, 30);
      }
    };

    typeNextLine();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines]);

  if (!isVisible) return null;

  return (
    <div
      ref={terminalRef}
      className={`fixed bottom-8 right-8 z-50 hidden md:block transition-all duration-300 ${isMinimized
        ? 'w-14 h-14 rounded-full'
        : 'w-[600px] max-w-[calc(100vw-4rem)] h-96 rounded-lg'
        }`}
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full h-full bg-card border border-border rounded-full card-glow flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg"
          aria-label="Open Terminal"
        >
          <TerminalIcon className="w-6 h-6 text-primary" />
        </button>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden card-glow h-full flex flex-col shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-2 bg-secondary border-b border-border">
            <div className="flex gap-2 items-center">
              {/* <button 
                onClick={() => setIsVisible(false)}
                className="w-3 h-3 rounded-full bg-destructive hover:opacity-80 transition-opacity"
              />
              <button className="w-3 h-3 rounded-full bg-yellow-500 hover:opacity-80 transition-opacity" />
              <button 
                onClick={() => setIsMinimized(true)}
                className="w-3 h-3 rounded-full bg-green-500 hover:opacity-80 transition-opacity"
              /> */}
              <TerminalIcon className="w-4 h-4 text-primary ml-2" />
              <span className="text-xs font-mono text-muted-foreground">terminal</span>
            </div>
            <div className="flex gap-2">
              {/* <button>
                <Square className="w-3 h-3 text-muted-foreground hover:text-foreground transition-colors" />
              </button> */}
              {/* <button onClick={() => setIsVisible(false)}>
                <X className="w-3 h-3 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
               <button onClick={() => setIsMinimized(true)}>
                <Minus className="w-3 h-3 text-muted-foreground hover:text-foreground transition-colors" />
              </button> */}
              <button onClick={() => setIsMinimized(true)}>
                <X className="w-3 h-3 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            </div>
          </div>

          {/* Terminal content */}
          <div
            ref={contentRef}
            className="flex-1 p-4 font-mono text-sm overflow-y-auto"
          >
            {lines.map((line, index) => (
              <div
                key={index}
                className={`mb-1 ${line.type === 'input' ? 'text-foreground' :
                  line.type === 'success' ? 'text-green-500' :
                    line.type === 'error' ? 'text-destructive' :
                      'text-muted-foreground'
                  }`}
              >
                {line.type === 'input' && <span className="text-primary mr-2">{'>'}</span>}
                <span className="whitespace-pre-wrap">{line.text}</span>
              </div>
            ))}
          </div>

          {/* Input line */}
          <form onSubmit={handleSubmit} className="px-4 py-2 border-t border-border bg-secondary/50">
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-primary">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-foreground"
                autoFocus
              />
              {/* <span ref={cursorRef} className="inline-block w-2 h-4 bg-primary" /> */}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
