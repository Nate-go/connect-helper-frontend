import BaseLoader from "./BaseLoader";

const AutoLoader = ({display, component}) => {
    return (
        <>
            {display ?
                component :
                <BaseLoader/>
            }
        </>
    );
}
export default AutoLoader