import React, {useEffect, useRef} from 'react';
import Lottie from 'lottie-web';

interface LottieAnimationProps {
  animationData: any; // Or a more specific type if you have one
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
    if (containerRef.current) {
      anim = Lottie.loadAnimation({
        container: containerRef.current,
        animationData: animationData,
        loop: loop,
        autoplay: autoplay,
      });
    }

    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, [animationData, loop, autoplay]);

  return <div ref={containerRef}/>;
};

export default LottieAnimation;