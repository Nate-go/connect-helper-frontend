import { Input, Panel, Button, Drawer, Grid, Row, Col, InputPicker, Avatar, SelectPicker, InputGroup } from "rsuite";
import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { AutoLoader } from '@/components';
import { ConnectionStatus } from '@/constants';
import { SendMailType } from "@/constants";
import { templateGroupEndpoints, templateEndpoints } from "@/apis";
import { MailType } from "@/components/mails";
import { PlusIcon,  } from '@/components/icons';
import { MailContentEdit } from "@/components/mails";
import { getAuthentication } from '@/helpers/authenHelpers';
import { StatusSingleSelect, TemplateGenerator } from "@/components/selects";
import SunEditor from 'suneditor-react';
import { getConstantTitle } from "@/helpers/constantHelpers";

const DrawerEditEmailSchedule = ({open, handleClose, openConfirmation, templateGroupItem}) => {
    const { SunEditorComponent, saveContent, loading: saveContentLoading, setContent } = MailContentEdit();
    const { generateTemplate, loadingGenerate } = TemplateGenerator();

    const [item, setItem] = useState({
        ...templateGroupItem
    });
    const [description, setDescription] = useState('');


    const [currentTemplate, setCurrentTemplate] = useState(null);

    const defaultTemplate = {
        id: null,
        subject: '',
        content: '',
        type: SendMailType.PERSONAL,
        status: ConnectionStatus.Private,
        name: ''
    }

    const defaultTemplateReview = {
        type: SendMailType.PERSONAL,
        content: '',
        subject: '',
    }

    const [template, setTemplate] = useState(defaultTemplate);
    const [templateReview, setTemplateReview] = useState(defaultTemplateReview);

    const { data: getTemplatesData, loading: getTemplatesLoading, callApi: handleGetTemplates } = useApi();
    const { loading: updateGroupLoading, callApi: handleUpdateGroup } = useApi();
    const { data: createTemplateData, loading: createTemplateLoading, callApi: handleCreateTemplate } = useApi();
    const { data: updateTemplateData, loading: updateTemplateLoading, callApi: handleUpdateTemplate } = useApi();
    const { data: deleteTemplateData, loading: deleteTemplateLoading, callApi: handleDeleteTemplate } = useApi();

    const getTemplates = () => {
        handleGetTemplates(templateGroupEndpoints.getTemplates + templateGroupItem.id, {})
    }

    const updateGroupTemplate = () => {
        handleUpdateGroup(
            templateGroupEndpoints.update, 
            {
                method:"PUT",
                data: {
                    ids: [templateGroupItem.id],
                    data: {
                        name: item.name,
                        status: item.status
                    }
                    
                }
            }
        )
    }

    const confirmUpdateGroup = () => {
        openConfirmation(updateGroupTemplate, [], 'Are you sure to update this mail template group ?');
    }

    const createTemplate = async () => {
        const content = await saveContent();
        handleCreateTemplate(
            templateEndpoints.create,
            {
                method:"POST",
                data: {
                    template_group_id: templateGroupItem.id,
                    subject: template.subject,
                    content: content,
                    type: template.type,
                    status: template.status,
                    name: template.name
                }
            }
        )
    }

    const confirmCreateTemplate = () => {
        openConfirmation(createTemplate, [], 'Confirm to create a new template in this group ?');
    }

    const updateTemplate = async () => {
        const content = await saveContent();
        handleUpdateTemplate(
            templateEndpoints.edit + template.id,
            {
                method: "PUT",
                data: {
                    subject: template.subject,
                    content: content,
                    type: template.type,
                    status: template.status,
                    name: template.name
                }
            }
        )
    }

    const confirmUpdateTemplate = () => {
        openConfirmation(updateTemplate, [], 'Are you sure to update this template ?');
    }

    const deleteTemplate = async () => {
        handleDeleteTemplate(templateEndpoints.delete + template.id, {method: "DELETE"});
    }

    const confirmDeleteTemplate = () => {
        openConfirmation(deleteTemplate, [], 'Are you sure to delete this template ?');
    }

    const handleSelectTemplate = (value) => {
        setCurrentTemplate(value);
        const item = getTemplatesData?.find(item => item.id === value);
        if(!item) {
            setContent('');
            setTemplate(defaultTemplate);
            return;
        }
        setContent(item.content);
        setTemplate(item);
    }

    useEffect(() => {
        getTemplates();
    }, [])

    useEffect(() => {
        if (!updateTemplateData && !createTemplateData && !deleteTemplateData) return;

        getTemplates();
    }, [updateTemplateData, createTemplateData, deleteTemplateData])

    const isOwner = getAuthentication().user.id === templateGroupItem.user.id;

    const handleGenerate = async () => {
        const newTemplate = await generateTemplate(description);
        setTemplateReview(newTemplate);
    }

    return (
        <Drawer size='full' placement='right' open={open} onClose={handleClose}>
            <Drawer.Header>
                <Drawer.Title>Create template group</Drawer.Title>
                <Drawer.Title>
                    <div className="flex flex-row items-center gap-3">
                        <Avatar
                            size="md"
                            circle
                            src={templateGroupItem.user.image_url}
                        />
                        <div className="flex flex-col items-start">
                            <div className="text-lg font-sans">{templateGroupItem.user.name}</div>
                            <div className="text-xs text-slate-400">{templateGroupItem.user.email}</div>
                        </div>
                    </div>
                </Drawer.Title>

            </Drawer.Header>
            <Drawer.Body>
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={24} sm={24} md={7} className='sm:mb-4'>
                            <div className="flex flex-col gap-3 w-full h-full">
                                <Panel header="Template group" shaded className="w-full h-full">
                                    <div className='flex flex-col w-full h-full gap-4'>
                                        <div>
                                            <label>Group name</label>
                                            <Input value={item.name} onChange={(value) => setItem({...item, name: value })} />
                                        </div>
                                        <StatusSingleSelect value={item.status} onChange={(value) => setItem({ ...item, status: value })} />
                                        <div className="flex flex-row w-full h-full gap-3 justify-end">
                                            <Button onClick={() => setItem({...templateGroupItem})}>Cancel</Button>
                                            {
                                                isOwner && <AutoLoader
                                                    display={!updateGroupLoading}
                                                    component={
                                                        <Button className="bg-blue-400" onClick={confirmUpdateGroup} appearance="primary">
                                                            Update
                                                        </Button>
                                                    }
                                                />
                                            }
                                            
                                        </div>
                                    </div>
                                </Panel>
                                <Panel header="Template generator" shaded className="w-full h-full">
                                    <div className="flex flex-col gap-3">
                                        <InputGroup>
                                            <InputGroup.Addon>Subject: </InputGroup.Addon>
                                            <Input value={templateReview.subject} readOnly />
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroup.Addon>Type: </InputGroup.Addon>
                                            <Input value={getConstantTitle(SendMailType, templateReview.type)} readOnly />
                                        </InputGroup>
                                        <SunEditor
                                            height="22em"
                                            placeholder="Please type here..."
                                            setOptions={{
                                                buttonList: [],
                                            }}
                                            readOnly
                                            setContents={templateReview.content}
                                        />
                                        <div className="flex-row flex gap-2 justify-between">
                                            <AutoLoader
                                                display={!loadingGenerate}
                                                component={
                                                    <Button color="green" className='bg-green-600' appearance="primary" onClick={handleGenerate}>
                                                        Generate
                                                    </Button>
                                                }
                                            />
                                            <Button color="blue" className='bg-blue-600' appearance="primary" onClick={() => { setTemplate({ ...defaultTemplate, ...templateReview }); setContent(templateReview.content) }}>
                                                Apply
                                            </Button>
                                        </div>
                                        <Input value={description} onChange={setDescription} as="textarea" rows={3} placeholder="Enter your descriptions" />

                                    </div>
                                    
                                </Panel>
                            </div>
                        </Col>

                        <Col xs={24} sm={24} md={17}>
                            <div className='w-full h-full flex flex-col gap-3'>
                                <Panel header="Templates" shaded className="w-full h-full">
                                    <SelectPicker
                                        data={getTemplatesData ? getTemplatesData.map(template => ({
                                            label: template.name,
                                            value: template.id
                                        })) : []}
                                        className="w-full"
                                        loading={getTemplatesLoading}
                                        onChange={handleSelectTemplate}
                                        value={currentTemplate}
                                    />
                                </Panel>
                                <Panel header='Template' shaded className='w-full h-full'>
                                    <div className="w-full h-full flex flex-col gap-4">
                                        <div className="grid grid-cols-7 gap-2">
                                            <InputGroup className="col-span-5">
                                                <InputGroup.Addon>Name: </InputGroup.Addon>
                                                <Input value={template.name} onChange={(value) => setTemplate({ ...template, name: value })} />
                                            </InputGroup>
                                            <div className="col-span-2 w-full flex flex-col">
                                                <StatusSingleSelect className="col-span-2" value={template.status} onChange={(value) => setTemplate({ ...template, status: value })} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-7 gap-2">
                                            <InputGroup className="col-span-5">
                                                <InputGroup.Addon>Subject: </InputGroup.Addon>
                                                <Input value={template.subject} onChange={(value) => setTemplate({ ...template, subject: value })} />
                                            </InputGroup>
                                            <div className="col-span-2">
                                                <MailType value={template.type} onChange={(value) => setTemplate({ ...template, type: value })} />
                                            </div>
                                        </div>

                                        {SunEditorComponent}

                                        <div className="flex flex-row gap-4 justify-end pb-5">
                                            <Button onClick={() => {setTemplate(defaultTemplate); setContent(''); setCurrentTemplate(null)}} className="bg-gray-200">Cancel</Button>
                                            {isOwner && 
                                                (template.id ?
                                                    <AutoLoader
                                                        display={!(saveContentLoading || updateTemplateLoading || deleteTemplateLoading)}
                                                        component={
                                                            <div className="flex flex-row gap-3">
                                                                <Button color="red" className='bg-red-600' appearance="primary" onClick={confirmDeleteTemplate}>
                                                                    Delete
                                                                </Button>
                                                                <Button color="blue" className='bg-blue-600' appearance="primary" onClick={confirmUpdateTemplate}>
                                                                    Save
                                                                </Button>
                                                            </div>
                                                        }
                                                    /> :
                                                    <AutoLoader
                                                        display={!(saveContentLoading || createTemplateLoading)}
                                                        component={
                                                            <Button color="blue" className='bg-blue-600' appearance="primary" startIcon={<PlusIcon />} onClick={confirmCreateTemplate}>
                                                                Create
                                                            </Button>
                                                        }
                                                    />
                                                )
                                            }
                                            
                                            
                                        </div>
                                    </div>
                                </Panel>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </Drawer.Body>
        </Drawer>
    );
}
export default DrawerEditEmailSchedule