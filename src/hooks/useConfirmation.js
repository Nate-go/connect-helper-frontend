import { useState } from 'react';
import ConfirmType from '@/constants/ConfirmType';
import { fillNullValues } from '@/helpers/dataHelpers';

const useConfirmation = () => {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [confirmationData, setConfirmationData] = useState(null);
    const [confirmValue, setConfirmValue] = useState(null);

    const openConfirmation = (onConfirm, additionalParams, message=null, confirmData=null, confirmType=null) => {
        setIsConfirmationOpen(true);
        setConfirmationData({
            onConfirm,
            additionalParams,
            confirmData,
            message,
            confirmType,
        });
    };

    const handleConfirm = () => {
        const { onConfirm, additionalParams } = confirmationData;
        onConfirm(...fillNullValues(additionalParams, confirmValue));
        setConfirmValue(null);
        setIsConfirmationOpen(false);
    };

    const handleCancel = () => {
        setIsConfirmationOpen(false);
    };

    const confirmType = () => {
        return confirmationData?.confirmType ?? ConfirmType.NORMAL;
    }

    const message = () => {
        return confirmationData?.message ?? 'Are you sure to continute';
    }

    const confirmData = () => {
        return confirmationData?.confirmData ?? [];
    }

    return {
        isConfirmationOpen,
        openConfirmation,
        handleConfirm,
        handleCancel,
        confirmType,
        message,
        confirmData,
        confirmValue,
        setConfirmValue,
    };
};

export default useConfirmation;
