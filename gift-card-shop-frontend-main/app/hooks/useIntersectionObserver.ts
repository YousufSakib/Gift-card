import { useEffect, useRef } from 'react';

type IntersectionObserverProps = {
    handleIntersect: (entry: IntersectionObserverEntry) => void;
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
};

const useIntersectionObserver = <T extends HTMLDivElement>({
    handleIntersect,
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
}: IntersectionObserverProps) => {
    const elementRef = useRef<T | null>(null);

    useEffect(() => {
        const currentElement = elementRef.current;

        if (!currentElement) return;

        const options: IntersectionObserverInit = {
            root,
            rootMargin,
            threshold,
        };

        const observer = new IntersectionObserver(([entry]) => {
            handleIntersect(entry);
        }, options);

        observer.observe(currentElement);

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [handleIntersect, threshold, root, rootMargin]);

    return elementRef;
};

export default useIntersectionObserver;
