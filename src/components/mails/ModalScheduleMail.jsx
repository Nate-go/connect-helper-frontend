import { Modal, Button, InputNumber } from "rsuite";
import { SelectDateTime, SingleSelect } from '@/components/selects'
import { ScheduleMailAfter } from "@/constants";
import { getConstantData } from '@/helpers/constantHelpers'

const ModalScheduleMail = ({open, handleClose, schedule, setSchedule, onClick}) => {
    const limitTime = (start, finish) => {
        if (finish < start) {
            return start;
        }

        return finish;
    }
    return (
        <Modal size='sm' open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Schedule mail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-3 items-center">
                    <SelectDateTime
                        value={schedule.started_at}
                        onChange={(value) => setSchedule({ ...schedule, started_at: limitTime(new Date(), value) })}
                        label="Start"
                        placement='bottomStart'
                    />
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1">
                            <InputNumber className='w-full' max={100} min={1} value={schedule.number} onChange={(value) => setSchedule({ ...schedule, number: value })} />
                        </div>
                        <div className="col-span-2">
                            <SingleSelect
                                data={getConstantData(ScheduleMailAfter)}
                                value={schedule.after}
                                onChange={(value) => setSchedule({ ...schedule, after: value })}
                                label="Per"
                            />
                        </div>

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} appearance="subtle">
                    Cancel
                </Button>
                <Button onClick={() => {handleClose(); onClick()}} appearance="primary" className='bg-blue-500'>
                    Schedule
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalScheduleMail