import { useRef } from 'react';
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
            How do <span className="u-red"> economic conditions</span> impact
            migration plan and action?
          </h3>
          <p>
            Overall, a limited proportion of the population from the Northern
            Triangle region has made concrete plans to migrate, irrespective of
            their food security status. To gain a better understanding of the
            factors driving their primary motive to migrate, namely economic
            conditions, this report further examines the relationship between
            their employment status and food security status.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mig2Eco;
