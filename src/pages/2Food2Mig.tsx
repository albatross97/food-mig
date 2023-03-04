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
      <div className="u-container">
        <div className="card fade1" ref={cardRef}>
          <h3 className="">
            Is food insecurity <span className="u-red">the root cause</span> of
            this migration issue?
          </h3>
          <p>
            Given that the Northern Triangle are currently facing food security
            challenges and account for a significant portion of the migration to
            the US, some suggest that enhancing food security could potentially
            serve as a solution to address the issue of migration.
          </p>
          <p>
            However, the survey below{' '}
            <span> suggests a more complicated result </span>
            than a simple bifurcated answer based on{' '}
            <span>different food insecurity levels</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Food2Mig;
