import { Modal, Input, List, Panel, Button, Drawer, Grid, Row, Col, InputPicker } from "rsuite";
import { TrashIcon } from '@/components/icons';
import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { AutoLoader } from '@/components';
import tagEndpoints from "@/apis/enpoints/tag";
import connectionEndpoints from "@/apis/enpoints/connection";
import ConnectionTags from "./ConnectionTags";
import { ConnectionStatus } from '@/constants';
import { updateData } from "@/helpers/dataHelpers";

const DrawerCreateConnection = ({ open, handleClose, openConfirmation, tagData, setFetchTag }) => {
    const [tags, setTags] = useState([]);
    const statusData = Object.entries(ConnectionStatus).map(([label, value]) => ({ label, value }));
    const [status, setStatus] = useState(ConnectionStatus.Private);
    const [connection, setConnection] = useState({
        name:'',
        note:'',
    })

    const handleConnection = (data) => {
        updateData(data, connection, setConnection);
    }

    return (
        <Drawer size='full' placement='right' open={open} onClose={handleClose}>
            <Drawer.Header>
                <Drawer.Title>Create Connection</Drawer.Title>
                <Drawer.Actions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button className="bg-blue-400"  onClick={() => setOpen(false)} appearance="primary">
                        Create
                    </Button>
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={24} sm={24} md={7} className='sm:mb-4'>
                            <Panel header='Actions' shaded className='w-full h-full'>
                                <div className='flex flex-col w-full h-full gap-4'>
                                    <InputPicker value={status} data={statusData} onChange={setStatus}/>
                                    <hr />
                                    <AutoLoader
                                        display={tagData}
                                        component={
                                            <ConnectionTags tagData={tagData} setTags={setTags} openConfirmation={openConfirmation} setFetchTag={setFetchTag} />
                                        }
                                    />
                                </div>
                            </Panel>
                        </Col>

                        <Col xs={24} sm={24} md={17}>
                            <div className='w-full h-full'>
                                <Panel header='Connection' shaded className='w-full h-full'>
                                    
                                </Panel>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </Drawer.Body>
        </Drawer>
    );
}

export default DrawerCreateConnection