import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useColours } from "~/lib/hooks/useColours";

type IconSize = 'small' | 'medium' | 'large';

interface IIConButtonProps {
    icon: string;
    size: IconSize;
    onPress?: () => void;
    colour?: string;
}

const SizeMap: { [key in IconSize]: number } = {
    small: 16,
    medium: 28,
    large: 40
}

/**
 *  Standard icon button component. 
 */
export const IconButton = ({ icon = 'settings', onPress, colour, size = 'small' }: IIConButtonProps) => {
    const colours = useColours();
    const colourToUse = colour || colours.Grey;
    return (
        <Pressable onPress={onPress}>
            <Icon name={icon} size={SizeMap[size]} color={colourToUse} />
        </Pressable>
    )
}