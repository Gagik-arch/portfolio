import Calculator from './Calculator';
import Calendar from './Calendar';
import Finder from './Finder';
import Notes from './Notes';
import Settings from './Settings';
    
const apps = {
    Calculator,
    Calendar,
    Notes,
    Settings,
    Finder,
} as const;
    
export default apps;
