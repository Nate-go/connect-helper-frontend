import {
    Input,
    Panel,
    Button,
    Drawer,
    Grid,
    Row,
    Col,
    InputPicker,
    Nav,
    Avatar,
    InputGroup
} from "rsuite";
import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { AutoLoader } from "@/components";
import connectionEndpoints from "@/apis/enpoints/connection";
import ConnectionTags from "./ConnectionTags";
import { ConnectionStatus } from "@/constants";
import { getIds, checkObjectEmpty } from "@/helpers/dataHelpers";
import BaseLoader from "@/components/BaseLoader";
import { Contacts } from "@/pages/contacts";
import UserConnection from "./UserConnection";
import { HistoriesContact } from "@/pages/contacts/components";
import { getAuthentication } from '@/helpers/authenHelpers';
import { StatusSingleSelect } from "@/components/selects";

const tabConstant = {
    CONTACTS : 0,
    USERS : 1,
    HISTORIES : 2,
}

const DrawerEditConnection = ({
    open,
    handleClose,
    openConfirmation,
    tagData,
    setFetchTag,
    connectionId,
}) => {
    const [tags, setTags] = useState([]);
    const [connection, setConnection] = useState({});
    const [tab, setTab] = useState(tabConstant.CONTACTS);
    const [fetchContacts, setFetchContacts] = useState(true);
    const [fetchConnections, setFetchConnections] = useState(true);
    const [ownerId, setOwnerId] = useState(null);

    const {
        data: connectionData,
        loading: connectionLoading,
        callApi: handleGetConnection,
    } = useApi();

    const {
        data: contactData,
        loading: contactLoading,
        callApi: handleGetContact,
    } = useApi();

    const {
        loading: connectionEditLoading,
        callApi: handleEditConnection,
    } = useApi();

    const handleConnection = (data) => {
        setConnection((prevConnection) => ({ ...prevConnection, ...data }));
    };

    const updateConnection = async () => {
        await handleEditConnection(connectionEndpoints.edit + connectionId, {
            method: "PUT",
            data: {
                tagIds: tags,
                name: connection.name,
                note: connection.note,
                status: connection.status,
                ownerId: ownerId,
                contact_id: connection.contact_id
            },
        });
        setFetchConnections(true);
    };

    const confirmUpdateConnection = () => {
        openConfirmation(
            updateConnection,
            [],
            'Are you sure to update this connection ?',
        );
    }

    const confirmChangeOwner = (id) => {
        openConfirmation(
            setOwnerId,
            [id],
            'Are you sure to change this connection owner ?',
        );
    }

    useEffect(() => {
        if (ownerId == connection.owner?.id) return;
        updateConnection();
    }, [ownerId]);

    useEffect(() => {
        if (connectionId == null || !fetchConnections) return;
        handleGetConnection(connectionEndpoints.show + connectionId, {});
        setFetchConnections(false);
    }, [fetchConnections]);

    useEffect(() => {
        if (connectionId == null || !fetchContacts) return;
        handleGetContact(connectionEndpoints.getContacts + connectionId + '/contacts');
        setFetchContacts(false);
    }, [fetchContacts]);

    useEffect(() => {
        if (!connectionData) return;
        setConnection({...connectionData});
        setTags(getIds(connectionData.tags));
        setOwnerId(connectionData.owner.id);
    }, [connectionData]);

    const isOwner = () => {
        return getAuthentication().user.id === ownerId;
    }

    const isMember = () => {
        return getIds(connection?.users).includes(getAuthentication().user.id);
    }

    const tabs = () => {
        if(tab == tabConstant.CONTACTS) return (
            <Contacts contacts={contactData?.contacts ?? []} isMember={isMember} setFetchContacts={setFetchContacts} openConfirmation={openConfirmation} contactLoading={contactLoading} connection={connection} updateConnection={(value) => handleConnection({ contact_id: value })} />
        );

        if (tab == tabConstant.USERS) return (
            <UserConnection users={connection.users} owner={connection.owner} openConfirmation={openConfirmation} setFetchConnections={setFetchConnections} connectionId={connectionId} connectionLoading={connectionLoading} confirmChangeOwner={confirmChangeOwner}/>
        );

        if (tab == tabConstant.HISTORIES) return (
            <HistoriesContact histories={contactData?.histories ?? []} isMember={isMember}  openConfirmation={openConfirmation} setFetchContacts={setFetchContacts} />
        );
    }

    const body = () => {
        if (checkObjectEmpty(connection) || connectionLoading || connectionEditLoading) return (<BaseLoader/>);
        return (
            <Grid fluid>
                <Row className="show-grid">
                    <Col xs={24} sm={24} md={6} className="sm:mb-4">
                        <div className="flex flex-col gap-3 w-full h-full">
                            <Panel header="Connection" shaded className="w-full h-full">
                                <div className="flex flex-col w-full h-full gap-4">
                                    <InputGroup>
                                        <InputGroup.Addon>Name</InputGroup.Addon>
                                        <Input
                                            readOnly={!isOwner()}
                                            value={connection.name}
                                            onChange={(value) => handleConnection({ name: value })}
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroup.Addon>Note</InputGroup.Addon>
                                        <Input
                                            readOnly={!isOwner()}
                                            value={connection.note}
                                            onChange={(value) => handleConnection({ note: value })}
                                        />
                                    </InputGroup>
                                </div>
                            </Panel>
                            <Panel header="Status" shaded className="w-full h-full">
                                <div className="flex flex-col w-full h-full gap-4">
                                    <StatusSingleSelect
                                        readOnly={!isOwner()}
                                        value={connection.status}
                                        onChange={(value) => handleConnection({ status: value })}
                                    />
                                    <hr />
                                    <AutoLoader
                                        display={tagData}
                                        component={
                                            <ConnectionTags
                                                tagData={tagData}
                                                setTags={setTags}
                                                openConfirmation={openConfirmation}
                                                setFetchTag={setFetchTag}
                                                defaultValue={tags}
                                            />
                                        }
                                    />
                                </div>
                            </Panel>
                        </div>
                    </Col>

                    <Col xs={24} sm={24} md={18}>
                        <div className="flex flex-col gap-4 w-full h-full">
                            <Panel shaded className="w-full h-full">
                                <Nav appearance="subtle" justified className="mb-5">
                                    <Nav.Item active={(tab == tabConstant.CONTACTS)} className="text-center" onClick={() => setTab(tabConstant.CONTACTS)}>Contacts</Nav.Item>
                                    <Nav.Item active={(tab == tabConstant.USERS)} onClick={() => setTab(tabConstant.USERS)}>Users</Nav.Item>
                                    <Nav.Item active={(tab == tabConstant.HISTORIES)} onClick={() => setTab(tabConstant.HISTORIES)}>Histories</Nav.Item>
                                </Nav>
                                <AutoLoader
                                    display={!connectionLoading}
                                    component={
                                        connection && tabs()
                                    }
                                />
                            </Panel>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }

    const owner = () => {
        if (checkObjectEmpty(connection) || connectionLoading || connectionEditLoading) return (<BaseLoader />);

        return (
            <div className="flex flex-row items-center gap-3">
                <Avatar
                    size="md"
                    circle
                    src={connection.owner.image_url}
                />
                <div className="flex flex-col items-start">
                    <div className="text-lg font-sans">{connection.owner.name}</div>
                    <div className="text-xs text-slate-400">{connection.owner.email}</div>
                </div>
            </div>
        );
    }


    return (
        <Drawer size="full" placement="right" open={open} onClose={handleClose}>
            <Drawer.Header>
                <Drawer.Title>Edit Connection</Drawer.Title>
                <Drawer.Title>{owner()}</Drawer.Title>
                
                <Drawer.Actions>
                    <Button onClick={handleClose} className="bg-gray-200">Cancel</Button>
                    {
                        isMember() && 
                        <AutoLoader
                            display={!false}
                            component={
                                <Button
                                    readOnly={!isOwner()}
                                    className="bg-blue-400"
                                    onClick={confirmUpdateConnection}
                                    appearance="primary"
                                >
                                    Save
                                </Button>
                            }
                        />
                    }
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body className="-mx-5">
                {body()}
            </Drawer.Body>
        </Drawer>
    );
};

export default DrawerEditConnection;
