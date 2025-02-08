import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

interface IFlexProps {
    children?: any;
    column?: boolean;
    gap?: number;
    justifyCenter?: boolean;
    justifyEnd?: boolean;
    justifyStart?: boolean;
    justifySpaceAround?: boolean;
    justifySpaceBetween?: boolean;
    justifySpaceEvenly?: boolean;
    alignCenter?: boolean;
    alignEnd?: boolean;
    alignStart?: boolean;
    alignBaseline?: boolean;
    alignStretch?: boolean;
    flex?: number;
    flexWrap?: boolean;
    testBorder?: boolean;
}

/**
 *  Component for very easy use of flexbox!
 */
export const Flex = (props: IFlexProps) => {
    const { children } = props;

    const getJustification = () => {
        if (props.justifyCenter) return 'center';
        if (props.justifyEnd) return 'flex-end';
        if (props.justifyStart) return 'flex-start';
        if (props.justifySpaceAround) return 'space-around';
        if (props.justifySpaceBetween) return 'space-between';
        if (props.justifySpaceEvenly) return 'space-evenly';
        return undefined;
    }

    const getAlignment = () => {
        if (props.alignCenter) return 'center';
        if (props.alignEnd) return 'flex-end';
        if (props.alignStart) return 'flex-start';
        if (props.alignBaseline) return 'baseline';
        if (props.alignStretch) return 'stretch';
        return undefined;
    }

    const style = useMemo(() => {
        const sheet = StyleSheet.create({
            flex: {
                display: 'flex',
                flexDirection: props.column ? 'column' : 'row',
                justifyContent: getJustification(),
                alignItems: getAlignment(),
                flex: props.flex,
                gap: props.gap,
                flexWrap: props.flexWrap ? 'wrap' : undefined,
                borderWidth: props.testBorder ? 1 : 0
            }
        });

        return sheet;
    }, [props]);

    return (
        <View style={style.flex}>
            {children}
        </View>
    )
}