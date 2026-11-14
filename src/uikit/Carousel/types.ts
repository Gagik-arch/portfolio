export interface CarouselProps {
    views?: HTMLElement[];
    images?: string[];
    timeout?: number;
    showToggles?: boolean; 
    onChange?: (offset: number) => void;
    stopAutoSlide?: boolean;
    showDots?: boolean;
}
