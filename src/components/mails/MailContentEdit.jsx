import SunEditor from 'suneditor-react';
import React from 'react';
import { useState, useEffect } from "react";


const buttonList = [
    [
        'undo',
        'redo',
    ],
    [
        'font',
        'fontSize',
        'fontColor',
        'hiliteColor',
    ],
    [
        'align',
        'bold',
        'underline',
        'italic',
        'strike',
    ],
    [
        'list',

        'subscript',
        'superscript',
        'indent',
        'outdent',
        'removeFormat',
    ],
    [
        'link',
        'image',
    ],
    [
        'fullScreen',
        'codeView',
        'preview',
    ]
];

const MailContentEdit = (defaultValue='') => {
    const [imageUploads, setImageUploads] = useState([]);
    const [content, setContent] = useState(defaultValue);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (targetImgElement, index, state, imageInfo, remainingFilesCount) => {
        setImageUploads([...imageUploads, {
            name: imageInfo.name,
            src: imageInfo.src
        }]);
    }

    const handleUpload = async (src) => {
        try {
            const data = new FormData();
            data.append('file', src);
            data.append('cloud_name', 'dsrtzowwc');
            data.append('upload_preset', 'r0en3eir')

            const response = await fetch('https://api.cloudinary.com/v1_1/dsrtzowwc/image/upload', {
                method: "POST",
                body: data
            });

            console.log(response);

            const responseData = await response.json();
            return responseData?.url.toString();
        } catch (error) {
            return false;
        }
    };

    const saveContent = async () => {
        setLoading(true);
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');

        const promises = imageUploads.map(async (imageUpload) => {
            const imgElement = doc.querySelector(`img[data-file-name="${imageUpload.name}"]`);
            if (imgElement) {
                let src = await handleUpload(imageUpload.src);
                imgElement.src = src || '';
            }
        });

        await Promise.all(promises);
        setLoading(false);
        return doc.documentElement.innerHTML;
    };

    return {
        SunEditorComponent: (
            <SunEditor
                onChange={setContent}
                height="30em"
                placeholder="Please type here..."
                setOptions={{
                    buttonList: buttonList,
                }}
                defaultValue={content}
                onImageUpload={handleImageUpload}
            />
        ),
        saveContent,
        loading,
    };
}
export default MailContentEdit