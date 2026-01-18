import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";

// Load animation data dynamically
const loadAnimationData = async () => {
  const filename = encodeURIComponent("success confetti.json");
  const response = await fetch(`/images/category-amount/${filename}`);
  if (!response.ok) {
    throw new Error("Failed to load animation");
  }
  return await response.json();
};

interface SuccessAnimationProps {
  onComplete: () => void;
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
                                                                    onComplete,
                                                                  }) => {
  const lottieRef = useRef<any>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    void loadAnimationData()
        .then((data) => setAnimationData(data))
        .catch((error) => console.error("Failed to load animation:", error));
  }, []);

  useEffect(() => {
    if (!animationData) return;

    // 3 seconds duration
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [animationData, onComplete]);

  // Loading State
  if (!animationData) {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 animate-in fade-in duration-300">
          <div className="text-white font-manrope font-bold">Loading...</div>
        </div>
    );
  }

  // Animation State
  return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 animate-in fade-in duration-300">
        <div className="w-full h-full max-w-150 max-h-150 flex items-center justify-center">
          <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay={true}
              className="w-full h-full"
          />
        </div>
      </div>
  );
};
