import React from 'react'
import { Word } from '~/api/types/word';
import { BottomSheetModal } from '~/components/core/layout/bottomSheetModal/bottomSheetModal'


import { InspectWordContent } from '~/components/wordContent/inspectWordContent/inspectWordContent';

interface IWordBottomSheetProps {
    isOpen?: boolean;
    word: Word | null;
    onClose: () => void;
}

export const WordBottomSheet = ({ word, onClose, isOpen }: IWordBottomSheetProps) => {
    return (
        <BottomSheetModal
            isOpen={isOpen && !!word}
            onClose={onClose}
        >
            <InspectWordContent word={word} onClose={onClose} />
        </BottomSheetModal>
    )
}
