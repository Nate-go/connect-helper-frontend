import { Panel, Avatar, InputGroup, Whisper, IconButton, Tooltip, Button } from "rsuite";
import { FaCrown, TrashIcon, PlusIcon } from '@/components/icons'
import { MultiCoworker } from "@/components/selects";
import { getIds } from '@/helpers/dataHelpers'
import { useEffect, useState } from "react";
import { getAuthentication } from '@/helpers/authenHelpers'
import { useApi } from "@/hooks";
import { connectionEndpoints } from '@/apis'
import { AutoLoader } from '@/components'

const UserConnection = ({ users, owner, openConfirmation, setFetchConnections, connectionId, connectionLoading, confirmChangeOwner }) => {
    const [values, setValues] = useState(getIds(users))
    const {data: addUserData, loading:addUserLoading, callApi: handleAddUser} = useApi();
    const { data: deleteUserData, loading: deleteUserLoading, callApi: handleDeleteUser } = useApi();

    const confirmAddUser = () => {
        openConfirmation(
            addUser,
            [],
            'Are you sure to add user to your connection ?',
        );
    }

    const confirmDeleteUser = (id) => {
        openConfirmation(
            deleteUser,
            [id],
            'Are you sure to delete user from your connection ?',
        );
    }
    
    const addUser = () => {
        handleAddUser(
            connectionEndpoints.addUserConnections,
            {
                method: "POST",
                data: {
                    connectionIds: [connectionId],
                    userIds: values
                }
            }
        )
    }

    const deleteUser = (id) => {
        handleDeleteUser(
            connectionEndpoints.deleteUserConnections,
            {
                method: "POST",
                data: {
                    connectionIds: [connectionId],
                    userIds: [id]
                }
            }
        )
    }

    useEffect(() => {
        if(!addUserData) return;

        setFetchConnections(true);

    }, [addUserData])

    useEffect(() => {
        if (!deleteUserData) return;

        setFetchConnections(true);

    }, [deleteUserData])

    return (
        <>
            {getAuthentication().user.id === owner.id &&
                <AutoLoader
                    display={!addUserLoading}
                    component={
                        <Panel header="Add user to connection">
                            <div className="flex flex-row gap-4">
                                <MultiCoworker defaultValue={values} setValue={setValues} />
                                <Button color="blue" className='bg-blue-600' appearance="primary" startIcon={<PlusIcon />} onClick={confirmAddUser}>
                                    Add user
                                </Button>
                            </div>
                        </Panel>
                    }
                />
            }
            <Panel bordered >
                <AutoLoader
                    display={!(deleteUserLoading || connectionLoading)}
                    component={
                        <div className="flex flex-col gap-5 w-full h-full">
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
                                                                <IconButton icon={<FaCrown style={{ fontSize: '1em' }} />} className='hover:bg-yellow-500 text-yellow-500 bg-white hover:text-white rounded-none' onClick={() => confirmChangeOwner(user.id)} />
                                                            </Whisper>
                                                            <Whisper placement="right" trigger="hover" speaker={<Tooltip>delete</Tooltip>}>
                                                                <IconButton icon={<TrashIcon style={{ fontSize: '1em' }} />} className='hover:bg-red-500 text-red-500 bg-white hover:text-white rounded-none' onClick={() => confirmDeleteUser(user.id)} />
                                                            </Whisper>
                                                        </InputGroup>
                                                    )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                />
                
                
            </Panel>
            
        </>
    );

}
export default UserConnection