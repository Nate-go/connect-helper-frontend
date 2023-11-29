import { Panel } from "rsuite";
import { name_web, icon } from '@/assets/images'

const BaseFooter = () => {
    return (
        <Panel>
            <div className="flex flex-row justify-center gap-1"><img className="h-10 w-10" src={icon} alt="" /><img className="h-9 w-64" src={name_web} alt="" /></div>
        </Panel>
    );
}
export default BaseFooter