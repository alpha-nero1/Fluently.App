import { useState } from "react";
import { Dimensions, View } from "react-native";
import { useSetApi } from "~/api/setApi";
import { SetCard } from "~/api/types/setCard";
import { Button } from "~/components/core/inputs/button/button";
import { TextField } from "~/components/core/inputs/textField/textField";
import { Flex } from "~/components/core/layout/flex/flex";
import { useI18 } from "~/lib/hooks/useI18";
import { useAppLogger } from "~/lib/logging/AppLogger";
import { useStores } from "~/lib/state/storeProvider";
import { showToast } from "~/lib/utils/toastUtils";

interface IEditWordContentProps {
    setCard: SetCard;
    onCancel: () => void;
    // Close the sheet.
    onClose: () => void;
}

/**
 * The bottom sheet that is shown when editing the set card.
 */
export const EditWordContent = (props: IEditWordContentProps) => {
    const { setStore, settingStore } = useStores();
    const [setCard, setSetCard] = useState(props.setCard);
    const [isLoading, setIsLoading] = useState(false);
    const setApi = useSetApi(settingStore.accessToken);
    const i18 = useI18();
    const logger = useAppLogger();

    const saveSetCard = async () => {
        setIsLoading(true);
        try {
            const newValues = setCard;
            await setApi.updateSetCard(newValues?.setId, newValues?.setCardId, newValues);
            setStore.addCards([newValues]);
            // After all success, close the sheet.
            props.onClose();
        } catch (e: any) {
            logger.error(e, 'Failed to save set card');
            showToast('error', [i18.Something_went_wrong]);
        } finally {
            setIsLoading(false);
        }
    }
    
    const handleChange = (key: string, value: string = '') => {
        const sc: any = { ...setCard };
        sc[key] = value;
        setSetCard(sc);
    }

    return (
        <Flex column>
            <View>
                <TextField 
                    placeholder="Word" 
                    value={setCard.name}
                    valueOnChange={(txt) => handleChange('name', txt)}
                />
                <TextField 
                    placeholder="Meaning" 
                    value={setCard.meaning} 
                    valueOnChange={(txt) => handleChange('meaning', txt)}
                />
                <TextField 
                    placeholder="Explanation" 
                    value={setCard.explanation} 
                    valueOnChange={(txt) => handleChange('explanation', txt)}
                />
                <TextField 
                    placeholder="Pronunciation" 
                    value={setCard.pronunciation} 
                    valueOnChange={(txt) => handleChange('pronunciation', txt)}
                />
                <TextField 
                    placeholder="Examples" 
                    value={setCard.example} 
                    valueOnChange={(txt) => handleChange('example', txt)}
                />
                <TextField 
                    placeholder="Infinitive" 
                    value={setCard.infinitive} 
                    valueOnChange={(txt) => handleChange('infinitive', txt)}
                />
                <TextField 
                    placeholder="Versions" 
                    value={setCard.versions} 
                    valueOnChange={(txt) => handleChange('versions', txt)}
                />            
            </View>
            <Flex alignCenter flex={1} style={{ height: 50 }}>
                <Button 
                    onPress={props.onCancel}
                    height={50}
                    flex={1}
                    type='unknown'
                >   
                    {i18.Cancel}
                </Button>
                <View style={{ width: 16 }}/>
                <Button 
                    onPress={saveSetCard}
                    height={50}
                    flex={1}
                    isLoading={isLoading}
                >   
                    {i18.Save}
                </Button>
            </Flex>
        </Flex>
    );
}

