import { Modal, Input, List, Panel, Button, Drawer, Grid, Row, Col, Toggle, InputGroup } from "rsuite";
import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { AutoLoader } from '@/components';
import { ScheduleTypes, ScheduleStatuses, ScheduleClassifications } from "@/constants/ScheduleConstant";
import { scheduleEndpoints } from "@/apis";
import { SelectContact, SingleSelect, SelectDateTime, MultiCoworker } from "@/components/selects";
import { getConstantData } from "@/helpers/constantHelpers";
import { getIds } from "@/helpers/dataHelpers";

const DrawerCreateSchedule = ({ open, handleClose, openConfirmation}) => {
    const newDate = new Date();

    const defaultValue = {
        title: '',
        content: '',
        place: '',
        type: ScheduleTypes.OFFLINE,
        status: ScheduleStatuses.UNPUBLISH,
        classification: ScheduleClassifications.ACTION,
        started_at: newDate.setDate(newDate.getDate() + 0.5),
        finished_at: newDate.setDate(newDate.getDate() + 0.75),
        autoCreate: true,
        userIds: [],
        contactIds: []
    }

    const [schedule, setSchedule] = useState(defaultValue);
    const [contacts, setContacts] = useState([]);

    const {loading, callApi:handleCreateSchedule} = useApi();

    const createSchedule = () => {
        handleCreateSchedule(
            scheduleEndpoints.create,
            {
                method:"POST",
                data: {
                    ...schedule
                }
            }
        )
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
                                                value={schedule.type}
                                                onChange={(value) => setSchedule({ ...schedule, type: value })}
                                                label="Classification"
                                            />
                                            <SingleSelect
                                                data={getConstantData(ScheduleStatuses)}
                                                value={schedule.type}
                                                onChange={(value) => setSchedule({ ...schedule, type: value })}
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
                                        <div className="grid grid-cols-4 gap-3">
                                            <div className="flex col-span-3">
                                                <SingleSelect
                                                    data={getConstantData(ScheduleTypes)}
                                                    value={schedule.type}
                                                    onChange={(value) => setSchedule({ ...schedule, type: value })}
                                                    label="Type"
                                                />
                                            </div>
                                            <div className="flex flex-row col-span-1 items-center gap-3 justify-center">
                                                <p>Auto create</p>
                                                <Toggle disabled={schedule.type === ScheduleTypes.OFFLINE} checked={schedule.autoCreate} onChange={(value) => setSchedule({ ...schedule, autoCreate: value })} />
                                            </div>
                                        </div>
                                        <InputGroup>
                                            <InputGroup.Addon>Place</InputGroup.Addon>
                                            <Input value={schedule.place} onChange={(value) => setSchedule({ ...schedule, place: value })} />
                                        </InputGroup>
                                        <div className="flex flex-row items-center gap-3">
                                            <SelectDateTime
                                                value={schedule.started_at}
                                                onChange={(value) => setSchedule({ ...schedule, started_at: value })}
                                                label="From"
                                                limitStart={newDate}
                                            />
                                            <SelectDateTime
                                                value={schedule.finished_at}
                                                onChange={(value) => setSchedule({ ...schedule, finished_at: value })}
                                                label="To"
                                                limitStart={schedule.started_at}
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