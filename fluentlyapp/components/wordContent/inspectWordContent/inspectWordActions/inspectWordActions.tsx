import { Alert, Dimensions, View } from "react-native";
import { Button } from "~/components/core/inputs/button/button";
import { IconButton } from "~/components/core/inputs/iconButton/iconButton";
import { Flex } from "~/components/core/layout/flex/flex";
import { useColours } from "~/lib/hooks/useColours";
import { useI18 } from "~/lib/hooks/useI18";
import { IInspectWordActionsProps } from "./inspectWordActionsProps";

const { width } = Dimensions.get("window");

/**
 * The actions for viewing/inspecting a word.
 */
export const InspectWordActions = ({ name, word, saved, ...props }: IInspectWordActionsProps) => {
    const i18 = useI18();
    const colours = useColours();

    const deleteOnPress = () => {
        Alert.prompt(
            i18.Are_you_sure_q,
            i18.render(i18.Delete_0_q, name),
            [
                {
                    text: i18.Cancel,
                    style: 'default'
                },
                {
                    text: i18.Confirm,
                    onPress: props.onRemove,
                    style: 'destructive'
                }
            ],
            'default'
        );
    }

    // Display the pre-saved options.
    if (!saved) {
        return (
            <Button 
                width={width - 32}
                onPress={props.onAdd}
                height={50}
                isLoading={props.isLoading}
            >   
                {i18.Add_to_set}
            </Button>
        )
    }

    // Display the saved options.
    return (
        <Flex alignCenter flex={1} style={{ height: 50 }}>
            <IconButton icon='delete' onPress={deleteOnPress} size='medium' colour={colours.Red} />
            <View style={{ width: 32 }}/>
            <IconButton icon='edit' onPress={props.onEdit} size='medium' colour={colours.Blue} />
        </Flex>
    );
}