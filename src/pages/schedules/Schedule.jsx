import { Calendar, Whisper, Popover, Badge, Tooltip, Panel, ButtonToolbar, Button } from 'rsuite';
import { PlusIcon } from '@/components/icons'
import { useState } from 'react';
import { DrawerCreateSchedule } from './components';
import { useApi } from '@/hooks'
import { scheduleEndpoints } from '@/apis';
import { AutoLoader } from '@/components';
import { useEffect } from 'react';
import { createReducer } from '@reduxjs/toolkit';

const getTodoList = (date, data) => {
    const day = date.getDate();
    const filteredSchedules = data.filter(schedule => {
        const startedAtDate = new Date(schedule.started_at);
        return (startedAtDate.getDate() === date.getDate() && startedAtDate.getMonth() === date.getMonth());
    });

    const extractedInfo = filteredSchedules.map(schedule => {
        const startedAt = new Date(schedule.started_at);
        const time = `${startedAt.getHours()}:${startedAt.getMinutes()}`;

        return {
            id: schedule.id,
            time,
            title: schedule.title
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
    const renderCell = (date) => {
        const list = getTodoList(date, data ?? []);
        const displayList = list.filter((item, index) => index < 2);

        if (list.length) {
            const moreCount = list.length - displayList.length;
            const moreItem = (
                <li className='flex justify-start'>
                    <Whisper
                        placement="top"
                        trigger="click"
                        speaker={
                            <Popover>
                                {list.map((item, index) => (
                                    <p key={index} onClick={() => alert(item)}>
                                        <b>{item.time}</b> - {item.title}
                                    </p>
                                ))}
                            </Popover>
                        }
                    >
                        <a className='text-blue-500'>{moreCount} more</a>
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
                                <div className='truncate' onClick={() => alert(item)}>
                                    <Badge /> <b>{item.time}</b> - {item.title}
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

    return (
        <Panel header="Schedules" bordered shaded>
            { openCreate && <DrawerCreateSchedule open={openCreate} handleClose={() => setOpenCreate(false)}/> }
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