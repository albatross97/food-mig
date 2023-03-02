import React, { useRef } from 'react';
import { useIntersection } from 'react-use';
import gsap from 'gsap';

declare global {
  interface useIntersection {}
}

const Mig2Action = () => {
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
    ? fadeOut('.fade2')
    : fadeIn('.fade2');

  return (
    <div className="u-section">
      <div className="u-container">
        <div className="card fade2" ref={cardRef}>
          <h3>
            What is the relationship between food insecurity and{' '}
            <span className="u-red">
              migration's intention, plan and preparation?
            </span>
          </h3>
          <p>
            Instead of asking only the desire to migrate, we look into more
            detailed aspects of migration other than intension, such as plan and
            preparation. These factors serve as a stronger indicator for the
            migration action. We explore the relationship of these factors with
            food security level.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mig2Action;
