import { APP_IMAGES } from '$utils/constants';

export {
    getCssVariable, setCSSVariable, onCssVariableChange 
} from './css';

export const clamp = (num: number, min: number, max: number = Number.MAX_SAFE_INTEGER): number => Math.max(min, Math.min(num, max));

export const minNumberIndex = (arr: number[]): number => {
    return arr.reduce((r, v, i, a) => v > a[r] ? r : i, -1);
};

export const genRandomNumber = (min = 0, max = 10) => {
    if (min > max) throw new Error('max num must be greater than min');

    return min + Math.floor(Math.random() * (max - min) );
};

export const isStrictDesktop = () => {
    const mobileRegex = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i;
    const isMobileUA = mobileRegex.test(navigator.userAgent);

    return !isMobileUA && navigator.maxTouchPoints === 0;
};

export function getAppIcon(appName: keyof typeof APP_IMAGES) {
    return APP_IMAGES[appName];
}
