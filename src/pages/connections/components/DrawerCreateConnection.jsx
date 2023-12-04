import { Modal, Input, List, Panel, Button, Drawer, Grid, Row, Col, InputPicker, InputGroup } from "rsuite";
import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { AutoLoader } from '@/components';
import connectionEndpoints from "@/apis/enpoints/connection";
import ConnectionTags from "./ConnectionTags";
import { ConnectionStatus } from '@/constants';
import { StatusSingleSelect } from "@/components/selects";

const DrawerCreateConnection = ({ open, handleClose, openConfirmation, tagData, setFetchTag }) => {
    const [tags, setTags] = useState([]);
    const [connection, setConnection] = useState({
        name:'',
        note:'',
        status: ConnectionStatus.Private
    })

    const {data, loading, callApi:handleCreateConnection} = useApi();

    const handleConnection = (data) => {
        setConnection({
            ...connection,
            ...data
        });
    }

    const createConnection = () => {
        handleCreateConnection(
            connectionEndpoints.create,
            {
                method:"POST",
                data: {
                    tagIds: tags,
                    data: connection
                }
            }
        )
    }
    
    useEffect(() => {
        if(!data) return;

        setTags([]);
        setConnection({
            name: '',
            note: '',
            status: ConnectionStatus.Private
        })
    }, [data])

    return (
        <Drawer size='full' placement='right' open={open} onClose={handleClose}>
            <Drawer.Header>
                <Drawer.Title>Create Connection</Drawer.Title>
                <Drawer.Actions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <AutoLoader
                        display={!loading}
                        component={
                            <Button className="bg-blue-400" onClick={createConnection} appearance="primary">
                                Create
                            </Button>
                        }
                    />
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={24} sm={24} md={7} className='sm:mb-4'>
                            <Panel header='Actions' shaded className='w-full h-full'>
                                <div className='flex flex-col w-full h-full gap-4'>
                                    <StatusSingleSelect value={connection.status} onChange={(value) => handleConnection({ status: value })} />
                                    <hr />
                                    <AutoLoader
                                        display={tagData}
                                        component={
                                            <ConnectionTags tagData={tagData} setTags={setTags} openConfirmation={openConfirmation} setFetchTag={setFetchTag} defaultValue={tags}/>
                                        }
                                    />
                                </div>
                            </Panel>
                        </Col>

                        <Col xs={24} sm={24} md={17}>
                            <div className='flex flex-col gap-3 w-full h-full'>
                                <Panel header='Connection' shaded className='w-full h-full'>
                                    <div className='flex flex-col w-full h-full gap-4'>
                                        <InputGroup>
                                            <InputGroup.Addon>Name</InputGroup.Addon>
                                            <Input value={connection.name} onChange={(value) => handleConnection({ name: value })} />
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroup.Addon>Note</InputGroup.Addon>
                                            <Input value={connection.note} onChange={(value) => handleConnection({ note: value })} />
                                        </InputGroup>
                                    </div>
                                </Panel>
                                {/* <Panel header='Create via csv file' shaded className='w-full h-full'>
                                    <div className='flex flex-col w-full h-full gap-4'>
                                        
                                    </div>
                                </Panel> */}
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </Drawer.Body>
        </Drawer>
    );
}

export default DrawerCreateConnection