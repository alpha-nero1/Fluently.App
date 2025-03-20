import { Pressable, ScrollView } from "react-native-gesture-handler";
import { Flex } from "../../layout/flex/flex";
import { View } from "react-native";
import { useColours } from "~/lib/hooks/useColours";

interface ISelectorProps<TOption> {
    selected?: TOption;
    options: TOption[];
    horizontal?: boolean;
    render: (option: TOption, isSelected?: boolean) => any;
    onSelected: (option: TOption) => void;
}

/**
 * Component to select from a list of options.
 */
export const Selector = <TOption,> (props: ISelectorProps<TOption>) => {
    const colours = useColours();
    const { selected, options, render, onSelected, horizontal } = props;

    const getViewStyle = (option: TOption) => {
        if (option === selected) {
            return {
                padding: 16,
                paddingTop: 12,
                marginRight: horizontal ? 16 : 0,
                marginBottom: horizontal ? 0 : 8,
                borderRadius: 8,
                backgroundColor: colours.Blue,
            }
        }
        return {
            padding: 16,
            paddingTop: 12,
            marginRight: horizontal ? 16 : 0,
            marginBottom: horizontal ? 0 : 8,
            borderRadius: 8
        }
    }

    const getKey = (opt: any) => {
        if (typeof opt === 'object') return JSON.stringify(opt);
        return `${opt}`
    }

    return (
        <ScrollView 
            horizontal={horizontal} 
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <Flex column={!horizontal}>
                {options.map(option => (
                    <Pressable key={getKey(option)} onPress={() => onSelected(option)}>
                        <View style={getViewStyle(option)}>
                            {render(option, option === selected)}
                        </View>
                    </Pressable>
                ))}
            </Flex>
        </ScrollView>
    )
}