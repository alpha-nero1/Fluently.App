import React, { useRef } from "react";
import { View, Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface IBookProps<T> {
    verticalPadding?: number;
    horizontalPadding?: number;
    data: T[];
    renderItem: ({ item, index }: { item: T; index: number }) => React.ReactNode;
    onPageChange?: (index: number) => void;
}

/**
 * Book component, allows you to render a list of data in book like
 * fashion (Apple books is the reference here).
 * 
 * Highly optimised and useful.
 */
export const Book = <T,>({ data, renderItem, onPageChange, horizontalPadding, verticalPadding }: IBookProps<T>) => {
    const totalHzPadding = (horizontalPadding || 0);
    const totalVtPadding = (verticalPadding || 0);
    const totalWidth = width - totalHzPadding
    const totalheight = height - totalVtPadding

    const flatListRef = useRef<Animated.FlatList<T>>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleMomentumScrollEnd = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const pageIndex = Math.round(contentOffsetX / totalWidth);
        onPageChange?.(pageIndex);
    };

    return (
        <View style={{ width: totalWidth }}>
            <Animated.FlatList
                ref={flatListRef}
                data={data as any[]}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled // Enables snapping to pages
                showsHorizontalScrollIndicator={false}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                windowSize={5}
                getItemLayout={(_, index) => ({
                    length: totalWidth,
                    offset: totalWidth * index,
                    index,
                })}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                renderItem={({ item, index }) => {
                    const scale = scrollX.interpolate({
                        inputRange: [
                          (index - 1) * totalWidth,
                          index * totalWidth,
                          (index + 1) * totalWidth,
                        ],
                        outputRange: [0.9, 1, 0.9],
                        extrapolate: "clamp"
                    });

                  return (
                    <Animated.View
                        style={{
                            width: totalWidth,
                            height: totalheight,
                            justifyContent: "center",
                            alignItems: "center",
                            transform: [{ scale }],
                        }}
                    >
                        {renderItem({ item, index })}
                    </Animated.View>
                  );
                }}
            />
        </View>
    );
}