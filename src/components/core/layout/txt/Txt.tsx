import { Text } from 'react-native';
import { useMemo } from 'react';
import { Colours } from '~/lib/themes/colours';

export type TextType = 
    'h1' 
    | 'h2' 
    | 'title'
    | 'emphasised'
    | 'normal' 
    | 'subtitle'

interface ITxtProps {
    type?: TextType;
    children: string | any;
    bold?: boolean;
    italic?: boolean;
    disableStandardSpacing?: boolean;
}

const standardSpacing = 6;

/**
 *  A text component to greatly standrdise the display of text in the app. 
 */
export function Txt(props: ITxtProps) {
    const { type, children, bold, italic } = props;

    const style = useMemo(() => {
        const stl: any = {
            marginBottom: props.disableStandardSpacing ? 0 : standardSpacing,
            fontWeight: bold ? 'bold' : '',
            fontSize: 16,
            color: Colours.Dark,
            fontFamily: 'Athelas-Regular',
            wordWrap: 'break-word'
        }

        if (italic) stl.fontStyle = 'italic';

        if (type === 'h1') stl.fontSize = 40;
    
        if (type === 'h2') stl.fontSize = 32;
    
        if (type === 'title') {
            stl.fontSize = 24;
            stl.fontWeight = 'bold';
        }
    
        if (type === 'subtitle') {
            stl.fontSize = 18;
            stl.color = Colours.Grey;
        }
    
        if (type === 'emphasised') {
            stl.fontSize = 18;
        }

        return stl;
    }, [type]);

    return <Text style={style}>{children}</Text>;
}
