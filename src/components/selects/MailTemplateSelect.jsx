import { useState, useEffect } from "react";
import { Panel, SelectPicker, InputGroup, Input, Button } from "rsuite";
import SunEditor from 'suneditor-react';

import { useApi } from '@/hooks';
import { templateEndpoints } from "@/apis";
import { SendMailType } from "@/constants";
import { getConstantTitle } from "@/helpers/constantHelpers";
import { AutoLoader } from '@/components';
import TemplateGenerator from "./TemplateGenerator";

const MailTemplateSelect = ({handleSelect}) => {
    const [value, setValue] = useState(null);
    const [description, setDescription] = useState('');
    const {generateTemplate, loadingGenerate } = TemplateGenerator();
    const {data, loading, callApi} = useApi();
    const defaultTemplate = {
        type: SendMailType.PERSONAL,
        content: '',
        subject: '',
    }
    const [templateReview, setTemplateReview] = useState(defaultTemplate);

    useEffect(() => {
        callApi(templateEndpoints.get, {});
    }, [])

    const handldeChange = (value) => {
        setValue(value);
        if(!value) {
            setTemplateReview(defaultTemplate)
            return;
        }
        data.forEach(group => {
            group.templates.forEach(template => {
                if(template.id === value) {
                    setTemplateReview(template);
                    return;
                }
            });
        }); 
    }

    const getData = (data) => {
        if(!data) return [];
        let items = [];
        data.forEach(group => {
            group.templates.forEach(template => {
                items.push({
                    label: template.name,
                    value: template.id,
                    groupName: group.name + " (" + group.templates.length + ")"
                })
            });
        });

        return items;
    }

    const handleGenerate = async () => {
        const template = await generateTemplate(description);
        setTemplateReview(template);
    }

    return (
        <div className="flex flex-col gap-3">
            <SelectPicker
                label="Mail template"
                placement="bottomEnd"
                data={getData(data)}
                loading={loading}
                groupBy="groupName"
                value={value}
                onChange={handldeChange}
            />
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
                <Button color="blue" className='bg-blue-600' appearance="primary" onClick={() => handleSelect(templateReview)}>
                    Apply
                </Button>
            </div>
            <Input value={description} onChange={setDescription} as="textarea" rows={3} placeholder="Enter your descriptions" />

        </div>
    );
}
export default MailTemplateSelect