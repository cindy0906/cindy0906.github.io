import { useState, useEffect } from 'react';

export const useTypingEffect = (text: string, speed: number = 50): [string, boolean] => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingFinished, setIsTypingFinished] = useState(false);

  useEffect(() => {
    if (!text) {
      setIsTypingFinished(true);
      return;
    }
    
    setDisplayedText('');
    setIsTypingFinished(false);

    let isMounted = true;
    
    const type = (index: number) => {
      if (index < text.length && isMounted) {
        setDisplayedText(text.substring(0, index + 1));
        setTimeout(() => type(index + 1), speed);
      } else if (isMounted) {
        setIsTypingFinished(true);
      }
    };
    
    const startTimeout = setTimeout(() => type(0), 100);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
    };
  }, [text, speed]);

  return [displayedText, isTypingFinished];
};