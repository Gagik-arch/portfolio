import type { ActiveAppType } from '$types/index';

export type AppProps = Partial<Omit<ActiveAppType, 'createdAt'>> & {
    key?: string;
};
