import { useEffect, useRef } from "react";

interface InfiniteScrollTriggerProps {
  onBottomReached: (
    intersectionObserverEntry: IntersectionObserverEntry[],
  ) => void;
}

/**
 * A hook that creates an IntersectionObserver that calls
 * `onBottomReached` when the bottom of the element is
 * reached.
 *
 * @param {InfiniteScrollTriggerProps} props The props for the component.
 * @param {(
 *   intersectionObserverEntry: IntersectionObserverEntry[],
 * ) => void} props.onBottomReached The function to be called when the bottom
 * of the element is reached.
 * @returns The rendered component.
 */
export default function InfiniteScrollTrigger({
  onBottomReached,
}: InfiniteScrollTriggerProps) {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observerRefCurrent = observerRef.current;
    const observer = new IntersectionObserver(onBottomReached, {
      threshold: 1,
    });
    observer.observe(observerRefCurrent);

    return () => {
      observer.unobserve(observerRefCurrent);
    };
  }, [observerRef, onBottomReached]);

  return <div ref={observerRef} />;
}
