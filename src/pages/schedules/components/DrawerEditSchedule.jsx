import { Modal, Input, List, Panel, Button, Drawer, Grid, Row, Col, InputGroup, Avatar } from "rsuite";
import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { AutoLoader } from '@/components';
import { ScheduleTypes, ScheduleStatuses, ScheduleClassifications } from "@/constants/ScheduleConstant";
import { scheduleEndpoints } from "@/apis";
import { SelectContact, SingleSelect, SelectDateTime, MultiCoworker } from "@/components/selects";
import { getConstantData, getConstantTitle } from "@/helpers/constantHelpers";
import { getIds } from "@/helpers/dataHelpers";
import { BaseLoader } from "@/components"
import { stringToDate, getDateTimeZone } from "@/helpers/dateTimeHelpers";
import { getAuthentication } from "@/helpers/authenHelpers";
import UserCheckBox from "./UserCheckBox";
import ContactCheckBox from "./ContactCheckBox";
import { toast } from 'react-toastify';

const DrawerEditSchedule = ({ open, handleClose, openConfirmation, id}) => {
    const newDate = new Date();
    const getFinishTime = (start) => {
        const finishTime = new Date(new Date(start).getTime() + 10 * 60 * 1000);
        return finishTime;
    }

    const limitTime = (start, finish) => {
        if (finish < start) {
            return start;
        }

        return finish;
    }

    const [schedule, setSchedule] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);

    const {data, loading, callApi:handleGetSchedule} = useApi();
    const {data:updateData, loading:updateLoading, callApi: handleUpdateSchedule } = useApi();
    const { data: addMemberData, loading: addMemberLoading, callApi: handleAddMember } = useApi();
    const { data: deleteMemberData, loading: deleteMemberLoading, callApi: handleDeleteMember } = useApi();
    const { data: publishData, loading: publishLoading, callApi: handlePublish } = useApi();
    const { data: deleteData, loading: deleteLoading, callApi: handleDeleteSchedule } = useApi();

    const getSchedule = async () => {
        await handleGetSchedule(scheduleEndpoints.show + id, {});
    }

    const addMember = async () => {
        await handleAddMember(
            scheduleEndpoints.edit + id + "/add-members",
            {
                method:"POST",
                data:{
                    userIds: users,
                    contactIds: getIds(contacts),
                }
            }
        )
    }

    const deleteMember = async () => {
        await handleDeleteMember(
            scheduleEndpoints.edit + id + "/delete-members",
            {
                method: "DELETE",
                data: {
                    userIds: selectedUsers,
                    contactIds: selectedContacts,
                }
            }
        )
    }

    const publishSchedule = async () => {
        await handlePublish(
            scheduleEndpoints.edit + id + "/publish",
            {
                method:"PUT"
            } 
        )
    }

    useEffect(() => {
        if(!data) return;
        setSchedule({ ...data, started_at: getDateTimeZone(stringToDate(data.started_at)), finished_at: getDateTimeZone(stringToDate(data.finished_at)) });
    }, [data])

    useEffect(() => {
        if (!deleteData) return;
        handleClose();
    }, [deleteData])

    useEffect(() => {
        if (!updateData && !addMemberData && !deleteMemberData && publishData) return;
        getSchedule();
    }, [updateData, addMemberData, deleteMemberData, publishData])

    const updateSchedule = async () => {
        await handleUpdateSchedule(scheduleEndpoints.update, {
            method: "PUT",
            data: {
                ids: [id],
                data: {
                    title: schedule.title,
                    content: schedule.content,
                    type: schedule.type,
                    place: schedule.place,
                    started_at: schedule.started_at,
                    finished_at: schedule.finished_at
                }
            }
        })
    }

    const deleteSchedule = async () => {
        await handleDeleteSchedule(scheduleEndpoints.delete, {
            method: "DELETE",
            data: {
                ids: [id],
            }
        })
    }

    useEffect(() => {
        getSchedule();
    }, []);

    const confirmUpdate = () => {
        if (schedule.type == ScheduleTypes.OFFLINE && (schedule.place == '' || schedule.place == null)) {
            toast.error("The place can not be empty while the the type is offline");
            return;
        }

        if (schedule.title == '') {
            toast.error("The title can not be empty");
            return;
        }

        openConfirmation(updateSchedule, [], "Are you sure to update this schedule ?");
    }

    const confirmAddMember = () => {
        openConfirmation(addMember, [], "Are you sure to add members to this schedule ?");
    }

    const confirmDeleteMember = () => {
        openConfirmation(deleteMember, [], "Are you sure to delete members from this schedule ?");
    }

    const confirmPublishSchedule = () => {
        openConfirmation(publishSchedule, [], "Are you sure to publish this schedule ?");
    }

    const confirmDeleteSchedule = () => {
        openConfirmation(deleteSchedule, [], "Are you sure to delete this schedule ?");
    }

    const body = () => {
        if(loading || updateLoading) return( <BaseLoader/>);

        return (
            <>
                {
                    schedule &&
                    <div className='flex flex-col w-full h-full gap-4'>
                        <div className="flex flex-row items-center gap-3">
                            <InputGroup>
                                <InputGroup.Addon>Classification</InputGroup.Addon>
                                <Input value={getConstantTitle(ScheduleClassifications, schedule.classification)} readOnly />
                            </InputGroup>
                            {schedule.status === ScheduleStatuses.PUBLISH ?
                                <InputGroup>
                                    <InputGroup.Addon>Status</InputGroup.Addon>
                                    <Input value="Published" readOnly />
                                </InputGroup> :

                                <div className="flex flex-row gap-3 items-center">
                                    <AutoLoader
                                        display={!publishLoading}
                                        component={
                                            <Button className="bg-blue-500" onClick={confirmPublishSchedule} appearance="primary">
                                                Publish
                                            </Button>
                                        }
                                    />

                                    <AutoLoader
                                        display={!deleteLoading}
                                        component={
                                            <Button className="bg-red-500 text-white hover:bg-red-600 hover:text-white" onClick={confirmDeleteSchedule} appearance="primary">
                                                Delete
                                            </Button>
                                        }
                                    />

                                    
                                </div>

                            }
                        </div>
                        <InputGroup>
                            <InputGroup.Addon>Title</InputGroup.Addon>
                            <Input value={schedule.title} onChange={(value) => setSchedule({ ...schedule, title: value })} readOnly={!editable()} />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Addon>Content</InputGroup.Addon>
                            <Input as="textarea" readOnly={!editable()} rows={2} value={schedule.content ?? ''} onChange={(value) => setSchedule({ ...schedule, content: value })} />
                        </InputGroup>
                        <SingleSelect
                            data={getConstantData(ScheduleTypes)}
                            value={schedule.type}
                            onChange={(value) => setSchedule({ ...schedule, type: value })}
                            label="Type"
                            readOnly={!editable()}
                        />
                        <InputGroup>
                            <InputGroup.Addon>Place</InputGroup.Addon>
                            <Input readOnly={!editable()} value={schedule.place} onChange={(value) => setSchedule({ ...schedule, place: value })} />
                        </InputGroup>
                        <div className="flex flex-row items-center gap-3">
                            <SelectDateTime
                                value={schedule.started_at}
                                onChange={(value) => setSchedule({ ...schedule, started_at: limitTime(newDate, value), finished_at: limitTime(getFinishTime(limitTime(newDate, value)), schedule.finished_at) })}
                                label="From"
                                readOnly={!editable()}
                            />
                            <SelectDateTime
                                value={schedule.finished_at}
                                onChange={(value) => setSchedule({ ...schedule, finished_at: limitTime(getFinishTime(schedule.started_at), value) })}
                                label="To"
                                readOnly={!editable()}
                            />
                        </div>
                    </div>
                }
            </>
        );
    }

    const members = () => {
        if (loading || updateLoading) return (<BaseLoader />);
        return (
            <>
                {schedule &&
                    <div className='flex flex-col w-full h-full gap-4'>
                        {editable() &&
                            <div className="justify-end flex">
                                <AutoLoader
                                    display={!deleteMemberLoading}
                                    component={
                                        <Button className="bg-red-500 text-white hover:bg-red-600 hover:text-white" onClick={confirmDeleteMember}>
                                            Delete
                                        </Button>
                                    }
                                />

                            </div>
                        }

                        <UserCheckBox data={schedule.users} setValue={setSelectedUsers} />
                        <hr />
                        <ContactCheckBox data={schedule.contacts} setValue={setSelectedContacts} />
                    </div>
                }
            </>
            
        );
    }

    const editable = () => {
        return getAuthentication().user.id === schedule?.user.id && schedule?.status === ScheduleStatuses.UNPUBLISH;
    }

    const owner = () => {
        if (loading) return (<BaseLoader />);

        return (
            <>
                { schedule &&
                    <div className="flex flex-row items-center gap-3">
                        <Avatar
                            size="md"
                            circle
                            src={schedule.user?.image_url}
                        />
                        <div className="flex flex-col items-start">
                            <div className="text-lg font-sans">{schedule.user?.name}</div>
                            <div className="text-xs text-slate-400">{schedule.user?.email}</div>
                        </div>
                    </div>
                }
            </>
        );
    }

    return (
        <Drawer size='full' placement='right' open={open} onClose={handleClose}>
            <Drawer.Header>
                <Drawer.Title>Edit Schedule</Drawer.Title>
                <Drawer.Title>{owner()}</Drawer.Title>

                <Drawer.Actions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {editable() &&
                        <AutoLoader
                            display={!updateLoading}
                            component={
                                <Button className="bg-blue-400" onClick={confirmUpdate} appearance="primary">
                                    Update
                                </Button>
                            }
                        />
                    }
                    
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={24} sm={24} md={7}>
                            <div className='flex flex-col gap-3 w-full h-full'>
                                <Panel header='Current Members' shaded className='w-full h-full'>
                                    {members()}
                                </Panel>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={17}>
                            <div className='flex flex-col gap-3 w-full h-full'>
                                {editable() && 
                                    <Panel header='Members' shaded className='w-full h-full'>
                                        <div className='flex flex-col w-full h-full gap-4'>
                                            <SelectContact contacts={contacts} setContacts={setContacts} />
                                            <MultiCoworker defaultValue={users} setValue={setUsers} />
                                            <div className="flex justify-end">
                                                <AutoLoader
                                                    display={!addMemberLoading}
                                                    component={
                                                        <Button className="bg-green-500 text-white hover:bg-green-600 hover:text-white" onClick={confirmAddMember}>
                                                            Add members
                                                        </Button>
                                                    }
                                                />

                                            </div>
                                        </div>
                                    </Panel>
                                }
                                
                                <Panel header='Schedule' shaded className='w-full h-full'>
                                    {body()}
                                </Panel>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </Drawer.Body>
        </Drawer>
    );
}

export default DrawerEditSchedule