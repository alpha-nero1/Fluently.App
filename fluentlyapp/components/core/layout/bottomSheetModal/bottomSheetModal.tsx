import React, { useRef, useCallback, useMemo } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColouredStyles } from '~/lib/hooks/useColouredStyles';

import styleFunc from './bottomSheetModal.styles';

export interface IBottomSheetModalProps {
  isOpen?: boolean;
  snapPoints?: string[];
  children?: any;
  onClose: () => void
}

/**
 * Custom core implementation of the bottom sheet including core behaviours
 * that are replicated across the app.
 */
export const BottomSheetModal = ({ children, onClose, isOpen, snapPoints }: IBottomSheetModalProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const styles = useColouredStyles(styleFunc);

  // Callback when the bottom sheet is expanded or collapsed
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose();
    }
  }, []);

  const closeSheet = () => {
    bottomSheetRef.current?.close();
  }

  const dynamicSizing = useMemo(() => {
    return !snapPoints;
  }, [snapPoints]);

  if (!isOpen) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity
        onPress={closeSheet}
        style={StyleSheet.absoluteFillObject}
      />
      <GestureHandlerRootView>
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          index={0}
          enableDynamicSizing={dynamicSizing}
          snapPoints={snapPoints}
          enablePanDownToClose
          style={styles.bottomSheet}
          backgroundStyle={styles.sheetBackground}
          handleStyle={styles.handle}
          handleIndicatorStyle={styles.indicator}
        >
          <BottomSheetView style={styles.sheetView}>
            <TouchableWithoutFeedback>
              {children}
            </TouchableWithoutFeedback>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
};
