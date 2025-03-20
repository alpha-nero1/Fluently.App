import React, { useState } from 'react'
import { SetCard } from '~/api/types/setCard';
import { WordBase } from '~/api/types/wordBase';
import { BottomSheetModal } from '~/components/core/layout/bottomSheetModal/bottomSheetModal'
import { EditWordContent } from '~/components/wordContent/editWordContent/editWordContent';


import { InspectWordContent } from '~/components/wordContent/inspectWordContent/inspectWordContent';

interface IWordBottomSheetProps {
    isOpen?: boolean;
    word: WordBase | null;
    onClose: () => void;
}

export const WordBottomSheet = ({ word, onClose, isOpen }: IWordBottomSheetProps) => {
    const [isEditing, setIsEditing] = useState(false);
    
    return (
        <BottomSheetModal
            isOpen={isOpen && !!word}
            snapPoints={['60%']}
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
