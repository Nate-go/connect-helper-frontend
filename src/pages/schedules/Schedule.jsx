import { Calendar, Whisper, Popover, Badge, Tooltip, Panel, ButtonToolbar, Button } from 'rsuite';
import { PlusIcon } from '@/components/icons'
import { useState } from 'react';
import { DrawerCreateSchedule, DrawerEditSchedule } from './components';
import { scheduleEndpoints } from '@/apis';
import { AutoLoader } from '@/components';
import { useEffect } from 'react';
import { useConfirmation, useApi } from '@/hooks';
import { PopupConfirm } from '@/components/popups';
import { ScheduleStatuses } from '@/constants/ScheduleConstant';
import { getDateTimeZone } from '@/helpers/dateTimeHelpers';

const getTodoList = (date, data) => {
    const filteredSchedules = data.filter(schedule => {
        const startedAtDate = getDateTimeZone(schedule.started_at);
        return (startedAtDate.getDate() === date.getDate() && startedAtDate.getMonth() === date.getMonth());
    });

    const extractedInfo = filteredSchedules.map(schedule => {
        const startedAt = getDateTimeZone(schedule.started_at);
        const time = `${startedAt.getHours()}:${startedAt.getMinutes()}`;

        return {
            id: schedule.id,
            time,
            title: schedule.title,
            status: schedule.status,
        };
    });

    return extractedInfo;
}

const getCalendarPage = (month, year) => {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    const firstSunday = new Date(firstDayOfMonth);
    firstSunday.setDate(firstSunday.getDate() + (0 - firstSunday.getDay() + 7) % 7);

    const startOfPage = new Date(firstSunday);
    const first = firstSunday.getDate() === firstDayOfMonth.getDate() ? 0 : 7;
    startOfPage.setDate(startOfPage.getDate() - first);

    const lastSunday = new Date(lastDayOfMonth);
    lastSunday.setDate(lastSunday.getDate() - (lastSunday.getDay() + 7) % 7);

    const endOfPage = new Date(lastSunday);
    const last = lastSunday.getDate() === lastDayOfMonth.getDate() ? 6 : 13
    endOfPage.setDate(endOfPage.getDate() + last);

    return {
        startOfPage: startOfPage,
        endOfPage: endOfPage
    };
}

const Schedule = () => {
    const {
        isConfirmationOpen,
        openConfirmation,
        handleConfirm,
        handleCancel,
        confirmType,
        confirmData,
        confirmValue,
        setConfirmValue,
        message
    } = useConfirmation();

    const renderCell = (date) => {
        const list = getTodoList(date, data ?? []);
        const displayList = list.filter((item, index) => index < 2);
        const [open, setOpen] = useState(false);
        if (list.length) {
            const moreCount = list.length - displayList.length;
            const moreItem = (
                <li className='flex justify-start'>
                    <Whisper
                        placement="top"
                        trigger="click"
                        open={open}
                        speaker={
                            <Popover>
                                {list.map((item, index) => (
                                    <div key={index} onClick={() => {setOpenEdit({open: true, id:item.id}); setOpen(false)}} className='flex flex-row items-center gap-1 cursor-pointer hover:text-blue-500'>
                                        <Badge color={item.status === ScheduleStatuses.PUBLISH ? "green" : "red"} /> <p><b>{item.time}</b> - {item.title}</p>
                                    </div>
                                ))}
                            </Popover>
                        }
                    >
                        <a className='text-blue-500' onClick={() => setOpen(!open)}>{moreCount} more</a>
                    </Whisper>
                </li>
            );

            return (
                <ul className="calendar-todo-list">
                    {displayList.map((item, index) => (
                        <li key={index}>
                            <Whisper
                                trigger="hover"
                                placement="autoHorizontalEnd"
                                speaker={
                                    <Tooltip>{item.title}</Tooltip>
                                }
                            >
                                <div className=' hover:text-blue-500' onClick={() => setOpenEdit({ open: true, id: item.id })}>
                                    <div className='flex flex-row items-center justify-start gap-1'>
                                        <Badge color={item.status === ScheduleStatuses.PUBLISH ? "green" : "red"} /> <p className='truncate'><b>{item.time}</b> - {item.title}</p>
                                    </div>
                                </div>
                            </Whisper>
                        </li>
                    ))}
                    {moreCount ? moreItem : null}
                </ul>
            );
        }

        return null;
    }

    const newDate = new Date();
    const [currentDate, setCurrentDate] = useState(newDate)
    const {data, callApi, loading} = useApi();

    const getSchedule = async (date) => {
        const range = getCalendarPage(date.getMonth() + 1, date.getFullYear());

        await callApi(scheduleEndpoints.get, {
            params: {
                from: range.startOfPage,
                to : range.endOfPage
            }
        })
    }

    useEffect(() => {
        getSchedule(currentDate);
    }, [])

    const changeMonth = async (date) => {
        await getSchedule(date);
        setCurrentDate(date);
    }

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState({
        open: false,
        id: null,
    });

    return (
        <Panel header="Schedules" bordered shaded>
            <PopupConfirm
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
                type={confirmType}
                data={confirmData}
                message={() => message()}
                setValue={setConfirmValue}
                open={isConfirmationOpen}
            />
            {openEdit.open && <DrawerEditSchedule open={openEdit.open} handleClose={() => {setOpenEdit({ open: false, id: null }), getSchedule(currentDate);}} id={openEdit.id} openConfirmation={openConfirmation}/>}
            {openCreate && <DrawerCreateSchedule open={openCreate} handleClose={() => { setOpenCreate(false), getSchedule(currentDate); }}/> }
            <ButtonToolbar className="pl-3">
                <Button color="green" className='bg-green-600' appearance="primary" startIcon={<PlusIcon />} onClick={() => setOpenCreate(true)}>
                    New schedule
                </Button>
            </ButtonToolbar>
            <AutoLoader
                display={!loading}
                component={
                    <Calendar className='z-0' bordered onMonthChange={changeMonth} renderCell={renderCell} cellClassName={date => (date.getDay() % 2 ? 'bg-gray-50' : undefined)} value={currentDate}/>
                }
            />
        </Panel>
    );
}
export default Schedule