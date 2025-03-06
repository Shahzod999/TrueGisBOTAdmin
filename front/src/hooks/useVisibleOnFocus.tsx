import { useEffect, useRef, useState } from 'react';

/**
 * Хук для управления видимостью элементов при фокусе на поля ввода
 * @returns Объект с состоянием фокуса, ссылкой на контейнер и обработчиками событий
 */
const useVisibleOnFocus = <T extends HTMLElement = HTMLDivElement>() => {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<T>(null);

  // Обработчик фокуса на поле ввода
  const handleFocus = () => {
    setIsFocused(true);
    
    if (containerRef.current) {
      containerRef.current.classList.add('form-container-focused');
      
      // Прокручиваем к активному элементу
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (activeElement) {
          activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  // Обработчик потери фокуса
  const handleBlur = () => {
    setIsFocused(false);
    
    if (containerRef.current) {
      containerRef.current.classList.remove('form-container-focused');
    }
  };

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      if (isFocused && document.activeElement) {
        document.activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isFocused]);

  return {
    isFocused,
    containerRef,
    handleFocus,
    handleBlur
  };
};

export default useVisibleOnFocus; 