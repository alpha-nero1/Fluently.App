import React from 'react'
import { BasicContent } from '~/api/types/basicContent';
import { Content } from '~/api/types/content';
import { ContentSection } from '~/api/types/contentSection';
import { Word } from '~/api/types/word';
import { DropDownBottomSheet } from '~/components/features/bottomSheets/dropdownBottomSheet/dropdownBottomSheet';
import { ManageSubscriptionBottomSheet } from '~/components/features/bottomSheets/manageSubscriptionBottomSheet/manageSubscriptionBottomSheet';
import { MenuBottomSheet } from '~/components/features/bottomSheets/menuBottomSheet/menuBottomSheet';
import { ReadNowBottomSheet } from '~/components/features/bottomSheets/readNowBottomSheet/readNowBottomSheet';
import { RevisionSettingsBottomSheet } from '~/components/features/bottomSheets/revisionSettingsBottomSheet/revisionSettingsBottomSheet';
import { WordBottomSheet } from '~/components/features/bottomSheets/wordBottomSheet/wordBottomSheet';
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
            <DropDownBottomSheet
                isOpen={bottomSheetStore.message?.type === BottomSheetType.LanguageBottomSheet}
                options={bottomSheetStore.message?.data?.options}
                display={bottomSheetStore.message?.data?.display}
                onClose={bottomSheetStore.closeMessage}
            />
            <ManageSubscriptionBottomSheet 
                isOpen={bottomSheetStore.message?.type === BottomSheetType.ManageSubscription}
                display={bottomSheetStore.message?.data?.display}
                onClose={bottomSheetStore.closeMessage}
            />
            <RevisionSettingsBottomSheet
                isOpen={bottomSheetStore.message?.type === BottomSheetType.RevisionSettings}
                onClose={bottomSheetStore.closeMessage}
            />
            <ReadNowBottomSheet 
                isOpen={bottomSheetStore.message?.type === BottomSheetType.ReadNow}
                content={bottomSheetStore.message?.data as BasicContent}
                onClose={bottomSheetStore.closeMessage}
            />
            <MenuBottomSheet 
                isOpen={bottomSheetStore.message?.type === BottomSheetType.Menu}
                sections={bottomSheetStore.message?.data as ContentSection[]}
                onClose={bottomSheetStore.closeMessage}
            />
            {/* ... other bottom sheets */}
        </>
    )
}
