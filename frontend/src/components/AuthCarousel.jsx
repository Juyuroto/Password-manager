import { useState, useEffect } from 'react';
import { pictures } from '../assets/pictures/pictures';

const SLIDES = [
  {
    title: 'Vos mots de passe, enfin en sécurité',
    description: 'Lockbox chiffre chaque entrée avec AES-256. Même nous ne pouvons pas lire vos données.',
    image: pictures.test,
  },
  {
    title: 'Organisez par dossiers',
    description: 'Travail, perso, finance — classez vos identifiants comme vous le souhaitez.',
    image: pictures.test2,
  },
  {
    title: 'Générez des mots de passe forts',
    description: 'Un générateur intégré crée des mots de passe uniques et complexes en un clic.',
    image: pictures.test3,
  },
];

const INTERVAL_MS = 8000;

export default function AuthCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel-content">
      <span className="carousel-logo">Lockbox</span>

      <div className="carousel-slides">
        {SLIDES.map((slide, i) => (
          <div key={i} className={`carousel-slide ${i === current ? 'active' : ''}`}>
            <div className="carousel-illustration">
              <img
                src={slide.image}
                alt={slide.title}
                className="carousel-image"
              />
            </div>
            <h2 className="carousel-title">{slide.title}</h2>
            <p className="carousel-desc">{slide.description}</p>
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}