import React, { useRef } from 'react';
import { useIntersection } from 'react-use';
import gsap from 'gsap';

declare global {
  interface useIntersection {}
}

const Food2Mig = () => {
  const cardRef = useRef(null);

  const intersection = useIntersection(cardRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  });

  // Animation for fading in
  const fadeIn = (element: any) => {
    gsap.to(element, 2, {
      opacity: 1,
      x: 0,
      ease: 'power4.out',
      stagger: {
        amount: 0.3,
      },
    });
  };
  // Animation for fading out
  const fadeOut = (element: any) => {
    gsap.to(element, 2, {
      opacity: 0,
      x: -100,
      ease: 'power4.out',
    });
  };

  // checking to see when the vieport is visible to the user
  intersection && intersection.intersectionRatio < 0.3
    ? fadeOut('.fade1')
    : fadeIn('.fade1');

  return (
    <div className="u-section">
      <div className="card fade1" ref={cardRef}>
        <h3 className="">
          Is food security<div className="u-red">a solution to</div>
          migration issue?
        </h3>
        <p>
          Since those three countries are having food security issues and
          contribute to a large proportion of migration in the US, it is
          tempting to say that maybe increasing food security is a solution to
          migration.
        </p>
        <p>
          However, the survey <span> suggests a more complicated outcome </span>
          than a simple bifurcated answer{' '}
          <span>based on different food insecurity level</span>.
        </p>
      </div>
    </div>
  );
};

export default Food2Mig;
