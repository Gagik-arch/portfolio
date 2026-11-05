import Advelit from '$assets/images/app-icons/advelit.png';
import Fibi from '$assets/images/app-icons/fibi.png';
import Balljunge from '$assets/images/app-icons/balljunge.png';
import Datewise from '$assets/images/app-icons/datewise.png';
import Launchpad from '$assets/images/app-icons/launchpad.png';
import Calculator from '$assets/images/app-icons/calculator.png';
import Finder from '$assets/images/app-icons/finder.png';
import Notes from '$assets/images/app-icons/notes.png';
import Preview from '$assets/images/app-icons/preview.png';
import Music from '$assets/images/app-icons/music.png';
import Folder from '$assets/images/app-icons/folder.png';
import Trash from '$assets/images/app-icons/trash.png';
import Settings from '$assets/images/app-icons/settings.png';
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
} as const;
