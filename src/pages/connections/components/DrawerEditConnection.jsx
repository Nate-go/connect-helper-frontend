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
    Divider
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
    const statusData = Object.entries(ConnectionStatus).map(([label, value]) => ({
        label,
        value,
    }));
    const [connection, setConnection] = useState({});
    const [tab, setTab] = useState(tabConstant.CONTACTS);

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
                status: connection.status
            },
        });

        handleGetConnection(connectionEndpoints.show + connectionId, {});
    };

    const confirmUpdateConnection = () => {
        openConfirmation(
            updateConnection,
            [],
            'Are you sure to update this connection ?',
        );
    }

    useEffect(() => {
        if (connectionId == null) return;
        handleGetConnection(connectionEndpoints.show + connectionId, {});
        handleGetContact(connectionEndpoints.getContacts + connectionId + '/contacts')
    }, []);

    useEffect(() => {
        if (!connectionData) return;
        setConnection({...connectionData});
        setTags(getIds(connectionData.tags))
    }, [connectionData]);

    const tabs = () => {
        if(tab == tabConstant.CONTACTS) return (
            <Contacts contacts={contactData.contacts}/>
        );
    }

    const body = () => {
        if (checkObjectEmpty(connection) || connectionLoading || connectionEditLoading || contactLoading) return (<BaseLoader/>);
        return (
            <Grid fluid>
                <Row className="show-grid">
                    <Col xs={24} sm={24} md={6} className="sm:mb-4">
                        <div className="flex flex-col gap-5 w-full h-full">
                            <Panel header="Connection" shaded className="w-full h-full">
                                <div className="flex flex-col w-full h-full gap-4">
                                    <div>
                                        <label>Name</label>
                                        <Input
                                            value={connection.name}
                                            onChange={(value) => handleConnection({ name: value })}
                                        />
                                    </div>
                                    <div>
                                        <label>Note</label>
                                        <Input
                                            value={connection.note}
                                            onChange={(value) => handleConnection({ note: value })}
                                        />
                                    </div>
                                </div>
                            </Panel>
                            <Panel header="Status" shaded className="w-full h-full">
                                <div className="flex flex-col w-full h-full gap-4">
                                    <InputPicker
                                        value={connection.status}
                                        data={statusData}
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
                                {tabs()}
                            </Panel>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }


    return (
        <Drawer size="full" placement="right" open={open} onClose={handleClose}>
            <Drawer.Header>
                <Drawer.Title>Edit Connection</Drawer.Title>
                <Drawer.Actions>
                    <Button onClick={handleClose} className="bg-gray-200">Cancel</Button>
                    <AutoLoader
                        display={!false}
                        component={
                            <Button
                                className="bg-blue-400"
                                onClick={confirmUpdateConnection}
                                appearance="primary"
                            >
                                Save
                            </Button>
                        }
                    />
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body className="-mx-5">
                {body()}
            </Drawer.Body>
        </Drawer>
    );
};

export default DrawerEditConnection;
