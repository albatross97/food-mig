import React, { useRef } from 'react';
import { useIntersection } from 'react-use';
import gsap from 'gsap';

declare global {
  interface useIntersection {}
}

const Mig2Eco = () => {
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
    ? fadeOut('.fade3')
    : fadeIn('.fade3');

  return (
    <div className="u-section">
      <div className="u-container">
        <div className="card fade3" ref={cardRef}>
          <h3>
            How <span className="u-red"> economic status</span> impact migration
            plan and action?
          </h3>
          <p>
            To confirm better off people have are less actions on migration, we
            need to study the how many people have to work to ensure food
            security to better understand how economic status impact migration
            plan and action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mig2Eco;
