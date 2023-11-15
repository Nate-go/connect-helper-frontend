import { Panel, Avatar, InputGroup, Whisper, IconButton, Tooltip, Button } from "rsuite";
import { FaCrown, TrashIcon, PlusIcon } from '@/components/icons'
import { MultiCoworker } from "@/components/selects";
import { getIds } from '@/helpers/dataHelpers'
import { useState } from "react";

const UserConnection = ({users, owner}) => {
    const [values, setValues] = useState(getIds(users))

    return (
        <>
            <Panel header="Add user to connection">
                <div className="flex flex-row gap-4">
                    <MultiCoworker defaultValue={values} setValue={setValues} />
                    <Button color="blue" className='bg-blue-600' appearance="primary" startIcon={<PlusIcon />} onClick={() => { }}>
                        Add user
                    </Button>
                </div>
            </Panel>
            <Panel bordered>
                {
                    users.map((user) => (
                        <div key={user.id} className="flex justify-between items-center">
                            <div className="flex flex-row items-center gap-3">
                                <Avatar
                                    size="md"
                                    circle
                                    src={user.image_url}
                                />
                                <div className="flex flex-col items-start">
                                    <div className="text-lg font-sans">{user.name}</div>
                                    <div className="text-xs text-slate-400">{user.email}</div>
                                </div>
                            </div>

                            <div>
                                {
                                    user.id === owner.id ? (
                                        <FaCrown style={{ fontSize: '2em' }} className="text-yellow-500" />
                                    ) :
                                        (
                                            <InputGroup className="h-10">
                                                <Whisper placement="left" trigger="hover" speaker={<Tooltip>change onwer</Tooltip>}>
                                                    <IconButton icon={<FaCrown style={{ fontSize: '1em' }} />} className='hover:bg-yellow-500 text-yellow-500 bg-white hover:text-white rounded-none' onClick={() => { }} />
                                                </Whisper>
                                                <Whisper placement="right" trigger="hover" speaker={<Tooltip>delete</Tooltip>}>
                                                    <IconButton icon={<TrashIcon style={{ fontSize: '1em' }} />} className='hover:bg-red-500 text-red-500 bg-white hover:text-white rounded-none' onClick={() => { }} />
                                                </Whisper>
                                            </InputGroup>
                                        )
                                }
                            </div>
                        </div>
                    ))
                }
            </Panel>
            
        </>
    );

}
export default UserConnection