import { useState, useEffect, useRef } from 'react';

interface UseTypingEffectOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const useTypingEffect = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: UseTypingEffectOptions) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentText = texts[currentIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
          timeoutRef.current = setTimeout(handleTyping, typingSpeed);
        } else {
          // Finished typing, pause then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
          timeoutRef.current = setTimeout(handleTyping, deletingSpeed);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    timeoutRef.current = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, currentIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
};
