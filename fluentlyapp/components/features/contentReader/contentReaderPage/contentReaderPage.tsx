import { View, Text, Dimensions, TouchableWithoutFeedback } from "react-native";
import { VerticalSpacer } from "~/components/core/layout/verticalSpacer/verticalSpacer";
import { Word } from "~/api/types/word";
import { useStores } from "~/lib/state/storeProvider";
import { useColouredStyles } from '~/lib/hooks/useColouredStyles';
import { LoadingText } from "~/components/core/layout/loadingText/loadingText";
import { Flex } from "~/components/core/layout/flex/flex";
import { Txt } from "~/components/core/layout/txt/Txt";

import styleFunc from './contentReaderPage.styles';

interface Props {
    spans: string[][];
    dictionary: { [key in string]: Word };
    selectedSpan: string;
    setSelectedSpan: (span: string) => void;
    isLoading?: boolean;
}

// Show either 2 pages before or ahead.
const { width } = Dimensions.get("window");
const viewWidth = width - 32;

/**
 * Render an actual content page.
 */
export function ContentReaderPage(props: Props) {
    const { spans, isLoading, dictionary, selectedSpan, setSelectedSpan } = props;
    const { setStore } = useStores();
    const styles = useColouredStyles(styleFunc);

    const spanOnSelected = (newSpan: string) => {
        const word = newSpan.split('|')[0];
        if (!dictionary[word]) return;

        const keyToSet = newSpan === selectedSpan
            ? ''
            : newSpan;
        
        setSelectedSpan(keyToSet);
    }

    /**
     *  Handle all the complicated use cases of text styling. 
     */
    const getSpanStyle = (span: string, spanKey: string) => {
        let spanStyle: any[] = [styles.spansegment];
        if (dictionary[span]) {
            spanStyle.push(styles.spansegmentAvailable);
        }
        if (spanKey === selectedSpan) {
            spanStyle.push(styles.spansegmentSelected);
        }
        if (setStore?.hasCard(span)) {
            spanStyle.push(styles.spansegmentSaved);
        }
        return spanStyle;
    }

    return (
        <TouchableWithoutFeedback>
            <View>
                <View style={{ ...styles.page, width: viewWidth }}>
                    <View>
                        {spans.map((lineSpan: string[], i: number) => {
                            if (!lineSpan.length) {
                                return <VerticalSpacer key={`line-${i}`} spacing={16} />
                            }
                            return (
                                <View key={`${lineSpan.join('-')}-${i}`} style={styles.line}>
                                    {lineSpan.map((span, j) => {
                                        const spanKey = `${span}|${i}|${j}`;
                                        return (
                                            <Text
                                                key={spanKey} 
                                                style={getSpanStyle(span, spanKey)} 
                                                onPress={() => spanOnSelected(spanKey)}
                                            >
                                                {span}
                                            </Text>
                                        );
                                    })}
                                </View>
                            )
                        })}
                    </View>
                </View>
                <Flex justifyCenter>
                    {isLoading ? <LoadingText text='Enriching' /> : <Txt> </Txt>}
                </Flex>
            </View>
        </TouchableWithoutFeedback>
    );
}

