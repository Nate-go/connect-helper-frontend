import { Panel, Timeline, Avatar, Button } from "rsuite";
import { differenceInDays, parse } from 'date-fns';
import { ConnectionHistoryType } from "@/constants";
import { SendIcon, RiUserReceivedLine, UpdateRoundIcon } from "@/components/icons";
import useApi from "@/hooks/useApi";
import { connectionHistoryEndpoints } from "@/apis";
import { AutoLoader } from '@/components';

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
                <p className="pt-1 -mb-1">
                    <a href={history.link} target="_blank">
                        [Send mail to]
                    </a>
                </p>
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
                        <div className="text-sm font-sans">{history.user.name}</div>
                    </div>
                </div>
                <p className="pt-1 -mb-1">[Receive mail from]</p>
                <p>{'<' + history.contact.content + '>'}</p>

            </div>
            
        </Timeline.Item>
    );

}

const renderDot = (first, second) => {
    if (!second) return [];

    const firstDate = parse(first, 'yyyy-MM-dd HH:mm:ss', new Date());
    const secondDate = parse(second, 'yyyy-MM-dd HH:mm:ss', new Date());

    const numberOfDays = differenceInDays(secondDate, firstDate);

    const timelineItems = [];

    if(numberOfDays > 2) {
        timelineItems.push(
            <Timeline.Item  time={numberOfDays + " days"}>
                <p className="h-12"></p>
            </Timeline.Item>
        );

        return timelineItems;
    }

    for (let i = 0; i <= numberOfDays; i++) {
        timelineItems.push(
            <Timeline.Item key={i}>
                <p className="h-5"></p>
            </Timeline.Item>
        );
    }

    return timelineItems;
};

const HistoriesContact = ({ histories, openConfirmation, setFetchContacts, isMember }) => {
    const { loading, callApi } = useApi();

    const timelineItems = histories.reduce((accumulator, history, index) => {
        const dots = renderDot(history.contacted_at, index === 0 ? null : histories[index - 1].contacted_at);
        return [
            ...accumulator,
            ...dots,
            renderTimeLine(history),
            
        ];
    }, []);

    const confirmUpdate = () => {
        openConfirmation(updateConnection, [], 'Are you sure to update this connection history ?');
    }

    const updateConnection = async () => {
        await callApi(connectionHistoryEndpoints.updateConnection, { method: "PUT" });
        setFetchContacts(true);
    }

    return (
        <Panel header="Timeline" bordered >
            {isMember() && 
                <AutoLoader
                    display={!loading}
                    component={
                        <Button color="blue" className='bg-blue-600 col-span-1' appearance="primary" startIcon={<UpdateRoundIcon rotate='180' />} onClick={confirmUpdate}>
                            Update
                        </Button>
                    }
                />
            }
            <Timeline align="left" className="w-full max-h-96 overflow-y-auto" endless>
                {timelineItems}
            </Timeline> 
        </Panel>
    );
};

export default HistoriesContact;