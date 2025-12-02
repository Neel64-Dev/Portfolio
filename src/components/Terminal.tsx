import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { X, Minus, Square } from 'lucide-react';

const commands = [
  { input: 'hello --name="Visitor"', output: 'Hello Visitor! Welcome to my portfolio.' },
  { input: 'show projects', output: 'Loading project showcase... ✓' },
  { input: 'get skills', output: 'React • TypeScript • Three.js • Node.js • More...' },
  { input: 'contact --email', output: 'Email: hello@example.com | Ready to connect!' },
];

export const Terminal = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<Array<{ input: string; output: string }>>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Check if screen is large enough (hide on mobile)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth >= 768); // Show on tablet and above
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      if (currentLine < commands.length) {
        const currentCommand = commands[currentLine];
        
        if (currentChar < currentCommand.input.length) {
          // Type input character by character
          setCurrentChar(currentChar + 1);
        } else {
          // Show output and move to next line
          setDisplayedLines([...displayedLines, currentCommand]);
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }
      }
    }, currentChar === 0 ? 1000 : 50); // Pause before new line, then type

    return () => clearTimeout(timer);
  }, [currentChar, currentLine, displayedLines, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-8 right-8 w-[500px] max-w-[calc(100vw-4rem)] z-50 hidden md:block"
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="bg-card border border-border rounded-lg overflow-hidden card-glow">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-2 bg-secondary border-b border-border">
          <div className="flex gap-2">
            <button className="w-3 h-3 rounded-full bg-destructive hover:opacity-80 transition-opacity" />
            <button className="w-3 h-3 rounded-full bg-yellow-500 hover:opacity-80 transition-opacity" />
            <button className="w-3 h-3 rounded-full bg-green-500 hover:opacity-80 transition-opacity" />
          </div>
          <span className="text-xs font-mono text-muted-foreground">terminal</span>
          <div className="flex gap-2">
            <Minus className="w-3 h-3 text-muted-foreground" />
            <Square className="w-3 h-3 text-muted-foreground" />
            <X className="w-3 h-3 text-muted-foreground" />
          </div>
        </div>

        {/* Terminal content */}
        <div className="p-4 font-mono text-sm h-64 overflow-y-auto">
          {displayedLines.map((line, index) => (
            <div key={index} className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-primary">{'>'}</span>
                <span className="text-foreground">{line.input}</span>
              </div>
              <div className="text-muted-foreground pl-4">{line.output}</div>
            </div>
          ))}
          
          {currentLine < commands.length && (
            <div className="flex items-center gap-2">
              <span className="text-primary">{'>'}</span>
              <span className="text-foreground">
                {commands[currentLine].input.slice(0, currentChar)}
              </span>
              <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
