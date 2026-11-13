export interface CarouselProps {
    views?: HTMLElement[];
    images?: string[];
    timeout?: number;
    showToggles?: boolean; 
    togglesClassName?: string;
    onChange?: (offset: number) => void;
    stopAutoSlide?: boolean;
    showDots?: boolean;
}
