import { useEffect, type RefObject } from 'react';

export function useParallax(
    containerRef: RefObject<HTMLElement | null>,
    bgRef: RefObject<HTMLElement | null>,
    speed = 0.35,
) {
    useEffect(() => {
        const container = containerRef.current;
        const bg = bgRef.current;
        if (!container || !bg) return;

        let ticking = false;

        const update = () => {
            const rect = container.getBoundingClientRect();
            if (rect.bottom > -200 && rect.top < window.innerHeight + 200) {
                bg.style.transform = `translate3d(0, ${-rect.top * speed}px, 0)`;
            }
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [containerRef, bgRef, speed]);
}
