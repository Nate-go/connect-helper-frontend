import { useState, useEffect } from "react";
import { Panel, SelectPicker, InputGroup, Input, Button } from "rsuite";
import SunEditor from 'suneditor-react';

import { useApi } from '@/hooks';
import { templateEndpoints } from "@/apis";
import { ConnectionStatus, SendMailType } from "@/constants";
import { getConstantTitle } from "@/helpers/constantHelpers";


const MailTemplateSelect = ({handleSelect}) => {
    const [value, setValue] = useState(null);
    const [description, setDescription] = useState('');
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

    const generateTemplate = async () => {
        try {
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + import.meta.env.VITE_OPEN_AI_API_KEY,
                },
                body: JSON.stringify({
                    "model": "text-davinci-003",
                    "prompt": "Craft an json of email template that includes three params: subject, type is between 'cc' or 'bcc', and content. The content html data but dont need the element <html> or <header>, it include paragraphs, images url from network, or other relevant elements typically found within an email body. Ensure the content is robust, consisting of at least 200 words. This guidance will be based on the following description: " + description,
                    "temperature": 0,
                    "max_tokens": 500,
                    "top_p": 1.0,
                    "frequency_penalty": 0.0,
                    "presence_penalty": 0.0
                })
            });

            const data = await response.json();
            console.log(parseValue(data.choices[0].text));
        } catch (error) {
            console.error('Error generating email:', error);
        }
    }

    const parseValue = (emailString) => {
        try {
            console.log(emailString.replace("\'s name\n\n", ''));
            const emailData = JSON.parse(emailString.replace("\'s name\n\n", ''));

            const { subject, type, content } = emailData;

            return { subject, type, content };
        } catch (error) {
            console.error('Error parsing email string:', error);
            return null;
        }
    }

    const getData = (data) => {
        if(!data) return [];
        let items = [];
        data.forEach(group => {
            group.templates.forEach(template => {
                items.push({
                    label: template.name,
                    value: template.id,
                    groupName: group.name
                })
            });
        });

        return items;
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
                <Button color="green" className='bg-green-600' appearance="primary" onClick={generateTemplate}>
                    Generate
                </Button>
                <Button color="blue" className='bg-blue-600' appearance="primary" onClick={() => handleSelect(templateReview)}>
                    Apply
                </Button>
            </div>
            <Input value={description} onChange={setDescription} as="textarea" rows={3} placeholder="Enter your descriptions" />

        </div>
    );
}
export default MailTemplateSelect