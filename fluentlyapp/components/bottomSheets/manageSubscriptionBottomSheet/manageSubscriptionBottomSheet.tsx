import React from 'react'
import { PurchasesPackage } from 'react-native-purchases';
import { Button } from '~/components/core/inputs/button/button';
import { BottomSheetModal } from '~/components/core/layout/bottomSheetModal/bottomSheetModal'
import { Flex } from '~/components/core/layout/flex/flex';
import { Txt } from '~/components/core/layout/txt/Txt';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import { useProducts } from '~/lib/hooks/usePurchases';

interface IManageSubscriptionBottomSheetProps {
    isOpen?: boolean;
    display: (item: any) => string;
    onClose: (item?: any) => void;
}

export const ManageSubscriptionBottomSheet = ({ isOpen, display, onClose }: IManageSubscriptionBottomSheetProps) => {
    const packages = useProducts();

    const handlePurchase = (pack: PurchasesPackage) => {
            
    }
    
    return (
        <BottomSheetModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Flex column alignStart>
                <Txt type='h1'>Upgrade to Fluently Pro</Txt>
                <VerticalSpacer spacing={32} />
                <Txt type='title'>Get access to unlimited reading</Txt>
                <Txt type='normal'><Txt bold>Fluently Pro</Txt> users are not limited to the first five pages of a book</Txt>
                <VerticalSpacer spacing={32} />
                <Txt type='title'>Revise away!</Txt>
                <Txt type='normal'>Unlimited daily word revisions</Txt>
                <VerticalSpacer spacing={32} />
                <Txt type='title'>Unlimited enrichments</Txt>
                <Txt type='normal'>Really want to get the context of a word not already recognised? Get access to unlimited daily word enrichments</Txt>
                <VerticalSpacer spacing={64} />
                {packages.map((pack) => (
                    <Flex key={pack.identifier}>
                        <Txt type='title'>{pack.product.title} - {pack.product.priceString}</Txt>
                        <Button onPress={() => handlePurchase(pack)}>Upgrade</Button>
                    </Flex>
                ))}
            </Flex>
        </BottomSheetModal>
    )
}
