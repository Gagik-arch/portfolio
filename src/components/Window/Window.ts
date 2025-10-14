import Element from '$lib/Element';

function Window() {
    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {

            },
        })
    );
}

export default Window;
