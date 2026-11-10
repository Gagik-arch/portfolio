import Advelit from '$assets/images/app-icons/advelit.avif';
import Fibi from '$assets/images/app-icons/fibi.avif';
import Balljunge from '$assets/images/app-icons/balljunge.avif';
import Datewise from '$assets/images/app-icons/datewise.avif';
import Launchpad from '$assets/images/app-icons/launchpad.avif';
import Calculator from '$assets/images/app-icons/calculator.avif';
import Finder from '$assets/images/app-icons/finder.avif';
import Notes from '$assets/images/app-icons/notes.avif';
import Preview from '$assets/images/app-icons/preview.avif';
import Music from '$assets/images/app-icons/music.avif';
import Folder from '$assets/images/app-icons/folder.avif';
import Trash from '$assets/images/app-icons/trash.avif';
import Settings from '$assets/images/app-icons/settings.avif';
import Axis from '$assets/images/app-icons/axis.avif';
import Npm from '$assets/images/app-icons/npm.avif';
import type APPS from '$apps/index';

export const APP_IMAGES:Record<keyof typeof APPS | 'Launchpad' | 'Folder' | 'Trash', string | undefined> = {
    Calendar: localStorage.getItem('calendarIcon') ?? undefined,
    Fibi,
    Advelit,
    Balljunge,
    Calculator,
    Datewise,
    Launchpad,
    Finder,
    Notes,
    Preview,
    Music,
    Folder,
    Trash,
    Settings,
    Axis,
    Npm,
} as const;
