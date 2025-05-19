import React, { useEffect, useRef } from 'react';

interface LottieAnimationProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  loop = true,
  autoplay = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  let anim: any = null;

  useEffect(() => {
    // Dynamically import lottie-web only on the client-side
    import('lottie-web').then((Lottie) => {
      if (containerRef.current) {
        anim = Lottie.default.loadAnimation({ // Access default export
          container: containerRef.current,
          animationData: animationData,
          loop: loop,
          autoplay: autoplay,
        });
      }
    });

    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, [animationData, loop, autoplay]);

  return <div ref={containerRef} />;
};

export default LottieAnimation;