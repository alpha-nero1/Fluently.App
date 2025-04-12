import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SetCard } from "~/api/types/setCard";
import { TextField } from "~/components/core/inputs/textField/textField";
import { BottomSheetModal } from "~/components/core/layout/bottomSheetModal/bottomSheetModal";
import { Flex } from "~/components/core/layout/flex/flex";
import { Txt } from "~/components/core/layout/txt/Txt";

interface IAddSetCardBottomSheetProps {
    isOpen?: boolean;
    display: (item: any) => string;
    onClose: (item?: any) => void;
}

export const AddSetCardBottomSheet = ({ isOpen, display, onClose }: IAddSetCardBottomSheetProps) => {
    const [setCard, setSetCard] = useState<SetCard>(new SetCard({}));

    const handleChange = (key: string, value: any) => {
        setSetCard(new SetCard({
            ...setCard,
            [key]: value
        }));
    }

    return (
        <BottomSheetModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Flex column flex={1}>
                <Flex alignCenter>
                    <Txt type='title'>Add card</Txt>
                    <Icon name='electric-bolt' />
                </Flex>
                <TextField 
                    value={setCard.name} 
                    placeholder="Word" 
                    valueOnChange={value => handleChange('name', value)} 
                />
                <TextField 
                    value={setCard.meaning} 
                    placeholder="Meaning" 
                    valueOnChange={value => handleChange('meaning', value)} 
                />
                <TextField 
                    value={setCard.explanation} 
                    placeholder="Meaning" 
                    valueOnChange={value => handleChange('meaning', value)} 
                />
            </Flex>
        </BottomSheetModal>
    )
}