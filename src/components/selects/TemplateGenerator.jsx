import { useState} from "react";
import { SendMailType } from "@/constants";

const TemplateGenerator = () => {
    const [loadingGenerate, setLoadingGenerate] = useState(false);
    const defaultTemplate = {
        type: SendMailType.PERSONAL,
        content: '',
        subject: '',
    }

    const generateTemplate = async (description) => {
        let template = false;
        let count = 1;
        setLoadingGenerate(true);
        do {
            try {
                const response = await fetch('https://api.openai.com/v1/completions', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + import.meta.env.VITE_OPEN_AI_API_KEY,
                    },
                    body: JSON.stringify({
                        "model": "text-davinci-003",
                        "prompt": "Craft an json of email template that includes three params (not include any character to modify the string like enter...): subject, type is between 'cc' or 'bcc', and content. The content html data but dont need the element <html> or <header>, it include paragraphs or other relevant elements typically found within an email body. Ensure the content is robust, consisting of at least 200 words. This guidance will be based on the following description: " + description,
                        "temperature": 0,
                        "max_tokens": 500,
                        "top_p": 1.0,
                        "frequency_penalty": 0.0,
                        "presence_penalty": 0.0
                    })
                });

                const data = await response.json();
                template = parseValue(data?.choices[0]?.text);
            } catch (error) {
                console.error('Error generating email:', error);
            }

            count++;
        } while (!template && count < 4);
        setLoadingGenerate(false);
        return template ? template : { ...defaultTemplate, content: 'Generate fail, try again!!' };
    }

    const parseValue = (emailString) => {
        if (!emailString) return false;
        try {
            const emailData = JSON.parse(emailString);

            const { subject, type, content } = emailData;

            return { subject, type: type === "cc" ? SendMailType.CC : SendMailType.BCC, content };
        } catch (error) {
            console.error('Error parsing email string:', error);
            return false;
        }
    }

    return {
        generateTemplate,
        loadingGenerate
    };
}
export default TemplateGenerator