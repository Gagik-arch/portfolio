import Typography from '$uikit/Typography';
import styles from './style.module.css';

function Tooltip(text = 'asd') {

    return new Typography({
        text,
        className: styles.tooltip,
        children: [ text ],
    }).dom;
}

export default Tooltip;
