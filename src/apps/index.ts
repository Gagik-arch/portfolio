import Advelit from './Advelit';
import Calculator from './Calculator';
import Calendar from './Calendar';
import Fibi from './Fibi';
import Finder from './Finder';
import Notes from './Notes';
import Settings from './Settings';
import Datewise from './Datewise';
import Preview from './Preview';
import Music from './Music';
import Balljunge from './Balljunge';
import Axis from './Axis';
import Npm_Packages from './Npm-Packages';
    
const APPS = {
    Calculator,
    Calendar,
    Notes,
    Settings,
    Finder,
    Advelit,
    Fibi,
    Datewise,
    Preview,
    Music,
    Balljunge,
    Axis,
    'Npm-packages': Npm_Packages,
} as const;
    
export default APPS;
