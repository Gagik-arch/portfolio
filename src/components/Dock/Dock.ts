import Element from '$lib/Element';

function Dock() {
    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                children: [ 'Dock' ],
            },
        }).dom
    );
}

export default Dock;
