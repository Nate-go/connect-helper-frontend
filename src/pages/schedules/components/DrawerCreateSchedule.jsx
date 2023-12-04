import { Modal, Input, List, Panel, Button, Drawer, Grid, Row, Col, Toggle, InputGroup } from "rsuite";
import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { AutoLoader } from '@/components';
import { ScheduleTypes, ScheduleStatuses, ScheduleClassifications } from "@/constants/ScheduleConstant";
import { scheduleEndpoints } from "@/apis";
import { SelectContact, SingleSelect, SelectDateTime, MultiCoworker } from "@/components/selects";
import { getConstantData } from "@/helpers/constantHelpers";
import { getIds } from "@/helpers/dataHelpers";
import { toast } from 'react-toastify';

const DrawerCreateSchedule = ({ open, handleClose, openConfirmation}) => {
    const newDate = new Date();

    const getFinishTime = (start) => {
        const finishTime = new Date(new Date(start).getTime() + 10 * 60 * 1000);
        return finishTime;
    }

    const defaultValue = {
        title: '',
        content: '',
        place: '',
        type: ScheduleTypes.OFFLINE,
        status: ScheduleStatuses.UNPUBLISH,
        classification: ScheduleClassifications.ACTION,
        started_at: newDate,
        finished_at: getFinishTime(newDate),
        userIds: [],
        contactIds: []
    }

    const [schedule, setSchedule] = useState(defaultValue);
    const [contacts, setContacts] = useState([]);

    const {loading, callApi:handleCreateSchedule} = useApi();

    const createSchedule = () => {
        if(schedule.type == ScheduleTypes.OFFLINE && schedule.place == '') {
            toast.error("The place can not be empty while the the type is offline");
            return;
        }

        if(schedule.title == '') {
            toast.error("The title can not be empty");
            return;
        }

        handleCreateSchedule(
            scheduleEndpoints.create,
            {
                method:"POST",
                data: {
                    ...schedule,
                }
            }
        )
    }

    const limitTime = (start, finish) => {
        if (finish < start) {
            return start;
        }

        return finish;
    }

    return (
        <Drawer size='full' placement='right' open={open} onClose={handleClose}>
            <Drawer.Header>
                <Drawer.Title>Create Schedule</Drawer.Title>
                <Drawer.Actions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <AutoLoader
                        display={!loading}
                        component={
                            <Button className="bg-blue-400" onClick={createSchedule} appearance="primary">
                                Create
                            </Button>
                        }
                    />
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={24} sm={24} md={24}>
                            <div className='flex flex-col gap-3 w-full h-full'>
                                <Panel header='Members' shaded className='w-full h-full'>
                                    <div className='flex flex-col w-full h-full gap-4'>
                                        <SelectContact contacts={contacts} setContacts={(value) => setSchedule({ ...schedule, contactIds: getIds(value) })} />
                                        <MultiCoworker defaultValue={schedule.userIds} setValue={(value) => setSchedule({ ...schedule, userIds: value })} />
                                    </div>
                                </Panel>
                                <Panel header='Schedule' shaded className='w-full h-full'>
                                    <div className='flex flex-col w-full h-full gap-4'>
                                        <div className="flex flex-row items-center gap-3">
                                            <SingleSelect
                                                data={getConstantData(ScheduleClassifications)}
                                                value={schedule.classification}
                                                onChange={(value) => setSchedule({ ...schedule, classification: value })}
                                                label="Classification"
                                            />
                                            <SingleSelect
                                                data={getConstantData(ScheduleStatuses)}
                                                value={schedule.status}
                                                onChange={(value) => setSchedule({ ...schedule, status: value })}
                                                label="Status"
                                            />
                                        </div>
                                        <InputGroup>
                                            <InputGroup.Addon>Title</InputGroup.Addon>
                                            <Input value={schedule.title} onChange={(value) => setSchedule({ ...schedule,  title: value })} />
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroup.Addon>Content</InputGroup.Addon>
                                            <Input as="textarea" rows={2} value={schedule.content} onChange={(value) => setSchedule({ ...schedule, content: value })} />
                                        </InputGroup>
                                        <SingleSelect
                                            data={getConstantData(ScheduleTypes)}
                                            value={schedule.type}
                                            onChange={(value) => setSchedule({ ...schedule, type: value })}
                                            label="Type"
                                        />
                                        <InputGroup>
                                            <InputGroup.Addon>Place</InputGroup.Addon>
                                            <Input value={schedule.place} onChange={(value) => setSchedule({ ...schedule, place: value })} />
                                        </InputGroup>
                                        <div className="flex flex-row items-center gap-3">
                                            <SelectDateTime
                                                value={schedule.started_at}
                                                onChange={(value) => setSchedule({ ...schedule, started_at: limitTime(newDate, value), finished_at: limitTime(getFinishTime(limitTime(newDate, value)), schedule.finished_at) })}
                                                label="From"
                                            />
                                            <SelectDateTime
                                                value={schedule.finished_at}
                                                onChange={(value) => setSchedule({ ...schedule, finished_at: limitTime(getFinishTime(schedule.started_at), value) })}
                                                label="To"
                                            />
                                        </div>
                                    </div>
                                </Panel>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </Drawer.Body>
        </Drawer>
    );
}

export default DrawerCreateSchedule