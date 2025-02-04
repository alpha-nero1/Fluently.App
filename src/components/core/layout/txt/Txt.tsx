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

interface Props {
    type?: TextType;
    className?: string;
    children: string | any;
    bold?: boolean;
    italic?: boolean;
}

const standardSpacing = 6;

/**
 *  A text component to greatly standrdise the display of text in the app. 
 */
export function Txt(props: Props) {
    const { type, children, bold, italic } = props;

    const style = useMemo(() => {
        const stl: any = {
            marginBottom: standardSpacing,
            fontWeight: bold ? 'bold' : '',
            fontSize: 12,
            color: Colours.Dark,
            fontFamily: 'Athelas-Regular'
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
