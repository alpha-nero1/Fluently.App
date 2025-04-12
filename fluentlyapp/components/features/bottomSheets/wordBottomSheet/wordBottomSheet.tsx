import React, { useState } from 'react'
import { SetCard } from '~/api/types/setCard';
import { WordBase } from '~/api/types/wordBase';
import { BottomSheetModal } from '~/components/core/layout/bottomSheetModal/bottomSheetModal'
import { EditWordContent } from '~/components/features/wordContent/editWordContent/editWordContent';
import { InspectWordContent } from '~/components/features/wordContent/inspectWordContent/inspectWordContent';
import { useStores } from '~/lib/state/storeProvider';

interface IWordBottomSheetProps {
    isOpen?: boolean;
    word: WordBase | null;
    onClose: () => void;
}

export const WordBottomSheet = ({ word, onClose, isOpen }: IWordBottomSheetProps) => {
    const { bottomSheetStore } = useStores();
    const [isEditing, _setIsEditing] = useState(false);
    
    const setIsEditing = (editing: boolean) => {
        const msg = bottomSheetStore.message!;
        bottomSheetStore.closeMessage(msg);
        
        if (!editing) {
            _setIsEditing(false);
            return;
        }
        setTimeout(() => {
            _setIsEditing(editing);
            bottomSheetStore.setMessage(msg);
        }, 100);
    }

    return (
        <BottomSheetModal
            isOpen={isOpen && !!word}
            onClose={onClose}
        > 
            {isEditing ? (
                <EditWordContent 
                    setCard={word as SetCard}
                    onCancel={() => setIsEditing(false)}
                    onClose={onClose}
                />
            ) : (
                <InspectWordContent 
                    word={word} 
                    onClose={onClose}
                    onEdit={() => setIsEditing(true)}
                />
            )}
        </BottomSheetModal>
    )
}
