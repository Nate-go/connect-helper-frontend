import { SelectPicker, Whisper, Tooltip } from "rsuite";
import React from 'react';

import { AiOutlineQuestionCircle } from '@/components/icons';
import { SendMailType } from "@/constants";


const MailType = ({value, onChange}) => {
    const getToolTip = () => {
        switch (value) {
            case SendMailType.CC:
                return 'The list of receiver the email is public'
            case SendMailType.BCC:
                return 'The list of receiver the email is private'
            default:
                return 'Send mail to multi people with the same template but different content\n{@name@, @note@, @title@, @content@, @username@, @enterprise@} = {connection name, connection note, contact title, contact content, your name, your enterprise}'
        }
    }

    return (
        <div className="flex flex-row gap-3 items-center">
            <SelectPicker className="w-full" label="Type" value={value} onChange={onChange} data={Object.entries(SendMailType).map(([label, value]) => ({
                label,
                value,
            }))} />
            <Whisper placement="topEnd" trigger="hover" speaker={<Tooltip>{getToolTip()}</Tooltip>}>
                <div>
                    <AiOutlineQuestionCircle style={{ fontSize: '2em' }} />
                </div>
            </Whisper>
        </div>
    );
}
export default MailType