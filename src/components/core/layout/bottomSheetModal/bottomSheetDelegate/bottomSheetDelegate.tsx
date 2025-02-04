import React from 'react'
import { Word } from '~/api/types/word';
import { WordBottomSheet } from '~/components/bottomSheets/wordBottomSheet/wordBottomSheet';
import { useStores } from '~/lib/state/storeProvider'
import { BottomSheetType } from '~/lib/state/stores/bottomSheetStore';

/**
 * Because bottom sheets need to be managed at the root of the application.
 * This component looks after what bottom sheet needs to be shown at
 * any given time.
 */
export const BottomSheetDelegate = () => {
    const { bottomSheetStore } = useStores();

    return (
        <>
            <WordBottomSheet 
                isOpen={bottomSheetStore.message?.type === BottomSheetType.WordBottomSheet}
                word={bottomSheetStore.message?.data as Word | null}
                onClose={bottomSheetStore.closeMessage}
            />
            {/* ... other bottom sheets */}
        </>
    )
}
