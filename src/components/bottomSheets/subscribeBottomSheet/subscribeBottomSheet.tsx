import React from 'react'
import { BottomSheetModal } from '~/components/core/layout/bottomSheetModal/bottomSheetModal'
import { Txt } from '~/components/core/layout/txt/Txt';

interface ISubscribeBottomSheetProps {
    isOpen?: boolean;
    display: (item: any) => string;
    onClose: (item?: any) => void;
}

export const SubscribeBottomSheet = ({ isOpen, display, onClose }: ISubscribeBottomSheetProps) => {
    return (
        <BottomSheetModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Txt type='h1'>Subscribe</Txt>
        </BottomSheetModal>
    )
}
