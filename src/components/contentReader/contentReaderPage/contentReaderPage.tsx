import { View, Text, Dimensions } from "react-native";
import { VerticalSpacer } from "~/components/core/layout/verticalSpacer/verticalSpacer";
import { Word } from "~/api/types/word";
import { useEffect, useState } from "react";
import { useStores } from "~/lib/state/storeProvider";

import styles from './contentReaderPage.styles';

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
    const [spansLoading, setSpansLoading] = useState<Set<string>>(new Set<string>())
    const { setStore, settingStore } = useStores();
    
    const alternateSpansLoading = () => {
        if (!isLoading) return;
        setTimeout(() => {
            const allSpansLoading = new Set<string>();
            spans.forEach(line => {
                line.forEach(span => {
                    const rand = Math.random();
                    if (rand < 0.2) {
                        allSpansLoading.add(span);
                    }
                })
            })
            setSpansLoading(allSpansLoading);
            alternateSpansLoading();
        }, 500);
    }

    useEffect(() => {
        if (isLoading) {
            alternateSpansLoading();
        } else {
            setSpansLoading(new Set<string>())
        }
    }, [isLoading]);

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
        if (span && spansLoading.has(span)) {
            spanStyle.push(styles.spansegmentLoading);
        }
        if (dictionary[span]) {
            spanStyle.push(styles.spansegmentAvailable);
        }
        if (spanKey === selectedSpan) {
            spanStyle.push(styles.spansegmentSelected);
        }
        if (setStore?.cards?.has(span)) {
            spanStyle.push(styles.spansegmentSaved);
        }
        return spanStyle;
    }

    return (
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
    );
}