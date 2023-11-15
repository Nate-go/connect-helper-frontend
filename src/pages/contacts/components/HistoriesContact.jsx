import { Panel, Timeline, Avatar } from "rsuite";
import { differenceInDays, parse } from 'date-fns';
import { ConnectionHistoryType } from "@/constants";
import { SendIcon, RiUserReceivedLine } from "@/components/icons";

const renderTimeLine = (history) => {
    if (history.type == ConnectionHistoryType.SEND) return (
        <Timeline.Item dot={<SendIcon style={{ fontSize: '3em' }} className="rounded-full text-blue-500 bg-white -ml-4 px-2 border-2 border-blue-500" />} time={<p className="pr-5">{history.contacted_at}</p>}>
            <div className="pl-5">
                <div className="flex flex-row items-center gap-2">
                    <Avatar
                        size="xs"
                        circle
                        src={history.user.image_url}
                    />
                    <div className="flex flex-col items-start">
                        <div className="text-sm font-sans">{history.user.name}</div>
                    </div>
                </div>
                <p className="pt-1 -mb-1">[Send mail to]</p>
                <p>{'<' + history.contact.content + '>'}</p>
            </div>
        </Timeline.Item>
    );

    return (
        <Timeline.Item dot={<RiUserReceivedLine style={{ fontSize: '3em' }} className="rounded-full text-blue-500 bg-white -ml-4 px-2 border-2 border-blue-500" />} time={<p className="pr-5" > { history.contacted_at }</p>} >
            <div className="pl-5">
                <div className="flex flex-row items-center gap-3">
                    <Avatar
                        size="xs"
                        circle
                        src={history.user.image_url}
                    />
                    <div className="flex flex-col items-start">
                        <div className="text-lg font-sans">{history.user.name}</div>
                    </div>
                </div>
                <p className="pt-1 -mb-1">[Receive mail from]</p>
                <p>{'<' + history.contact.content + '>'}</p>

            </div>
            
        </Timeline.Item>
    );

}

const renderDot = (first, second) => {
    if (!second) return null;

    const firstDate = parse(first, 'yyyy-MM-dd HH:mm:ss', new Date());
    const secondDate = parse(second, 'yyyy-MM-dd HH:mm:ss', new Date());

    const numberOfDays = differenceInDays(secondDate, firstDate);

    const timelineItems = [];
    for (let i = 0; i <= numberOfDays; i++) {
        timelineItems.push(
            <Timeline.Item key={i}>
                <p className="h-10"></p>
            </Timeline.Item>
        );
    }

    return timelineItems;
};

const HistoriesContact = ({ histories }) => {
    const timelineItems = histories.reduce((accumulator, history, index) => {
        const dots = renderDot(index === 0 ? null : histories[index - 1].contacted_at, history.contacted_at);
        return [
            ...accumulator,
            ...dots,
            renderTimeLine(history)
        ];
    }, []);

    return (
        <Panel header="Time line" bordered >
            <div className="w-full flex items-center max-h-96 overflow-y-auto">
                <Timeline align="left" className="w-full">
                    {timelineItems}
                </Timeline>
            </div>
        </Panel>
    );
};

export default HistoriesContact;