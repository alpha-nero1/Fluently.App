import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useStores } from "~/lib/state/storeProvider";
import { BottomSheetType } from "~/lib/state/stores/bottomSheetStore";
import { Txt } from "../../layout/txt/Txt";
import { useColouredStyles } from "~/lib/hooks/useColours";
import { useI18 } from "~/lib/hooks/useI18";

import styleFunc from './dropdown.styles';

interface IDropdownProps<TOption> {
    label?: string;
    selected?: TOption;
    width?: number;
    placeholder?: string;
    options: TOption[];
    onSelect: (opt: TOption) => void;
    display: (opt: TOption) => any;
}

export function Dropdown<TOption>(props: IDropdownProps<TOption>) {
    const { options, placeholder, onSelect, display, width, selected, label } = props;
    const { bottomSheetStore } = useStores();
    const styles = useColouredStyles(styleFunc);
    const i18 = useI18();

    const openOnPress = () => {
        bottomSheetStore.setMessage({
            type: BottomSheetType.LanguageBottomSheet,
            data: {
                options,
                display
            },
            onClose: (item: any) => {
                onSelect(item);
            }
        })
    };

    const style = useMemo(() => ({ width: width ? width * 16 : "100%" }), [width]);

    return (
        <View style={[styles.dropdown, style]}>
            {label ? <Txt type='subtitle'>{label}</Txt> : null}
            <TouchableOpacity style={styles.dropdownToggle} onPress={openOnPress}>
                {
                    selected 
                    ? display(selected) 
                    : (
                        <View style={styles.placeholderView}>
                            <Txt type='subtitle' disableStandardSpacing>{placeholder || i18.Select_an_option}</Txt>
                        </View>
                    )
                }
            </TouchableOpacity>
        </View>
    );
}
