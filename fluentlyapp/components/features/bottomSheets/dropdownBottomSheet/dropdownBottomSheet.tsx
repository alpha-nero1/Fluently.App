import React from 'react'
import { FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { BottomSheetModal } from '~/components/core/layout/bottomSheetModal/bottomSheetModal'
import { useColouredStyles } from '~/lib/hooks/useColouredStyles';
import { IColours } from '~/lib/themes/colours';

interface IDropDownBottomSheetProps {
    isOpen?: boolean;
    options: any[];
    display: (item: any) => string;
    onClose: (item?: any) => void;
}

export const DropDownBottomSheet = ({ isOpen, options, display, onClose }: IDropDownBottomSheetProps) => {
    const styles = useColouredStyles(styleFunc);
    
    return (
        <BottomSheetModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <FlatList
                style={{
                    width: '100%'
                }}
                data={options}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => onClose(item)}>
                        {display(item)}
                    </TouchableOpacity>
                )}
            />
        </BottomSheetModal>
    )
}

const styleFunc = (colours: IColours) => StyleSheet.create({
    item: {
        width: '100%',
        flex: 1,
        display: 'flex',
        borderBottomWidth: 1,
        borderBottomColor: colours.GreyLight
    }
})
