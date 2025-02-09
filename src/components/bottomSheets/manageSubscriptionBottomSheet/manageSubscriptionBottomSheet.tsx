import React from 'react'
import { StyleSheet } from 'react-native';
import { BottomSheetModal } from '~/components/core/layout/bottomSheetModal/bottomSheetModal'
import { Txt } from '~/components/core/layout/txt/Txt';
import { useColouredStyles } from '~/lib/hooks/useColours';
import { IColours } from '~/lib/themes/colours';

interface IManageSubscriptionBottomSheetProps {
    isOpen?: boolean;
    display: (item: any) => string;
    onClose: (item?: any) => void;
}

export const ManageSubscriptionBottomSheet = ({ isOpen, display, onClose }: IManageSubscriptionBottomSheetProps) => {
    return (
        <BottomSheetModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Txt type='h1'>Subscription</Txt>
        </BottomSheetModal>
    )
}
