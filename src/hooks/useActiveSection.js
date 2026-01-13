import { useEffect, useState } from 'react';

const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-40% 0px -40% 0px',
        }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [sectionIds]);

  return activeSection;
};

export default useActiveSection;
