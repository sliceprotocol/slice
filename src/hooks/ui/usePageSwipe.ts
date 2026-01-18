import { useDrag } from "@use-gesture/react";

interface SwipeConfig {
  onSwipeLeft?: () => void; // Next
  onSwipeRight?: () => void; // Back
}

export function usePageSwipe({ onSwipeLeft, onSwipeRight }: SwipeConfig) {
  const bind = useDrag(({ swipe: [swipeX] }) => {
    // swipeX is -1 (left), 1 (right), or 0 (none)
    if (swipeX === -1 && onSwipeLeft) {
      onSwipeLeft();
    } else if (swipeX === 1 && onSwipeRight) {
      onSwipeRight();
    }
  });

  return bind;
}
