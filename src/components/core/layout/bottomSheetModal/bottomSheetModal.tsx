import React, { useRef, useCallback } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import styles from './bottomSheetModal.styles';

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
export const BottomSheetModal = ({ children, onClose, isOpen }: IBottomSheetModalProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Callback when the bottom sheet is expanded or collapsed
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose();
    }
  }, []);

  const handleTapOutside = (event: any) => {
    bottomSheetRef.current?.close();
  };

  if (!isOpen) return null;

  return (
    <GestureHandlerRootView style={styles.overlay}>
      <TouchableWithoutFeedback onPress={handleTapOutside}>
        <View style={styles.overlay}>
          <BottomSheet
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            index={0}
            enableDynamicSizing
            enablePanDownToClose
            style={styles.bottomSheet}
          >
            <BottomSheetView style={styles.sheetView}>
              <TouchableWithoutFeedback>
                {children}
              </TouchableWithoutFeedback>
            </BottomSheetView>
          </BottomSheet>
        </View>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
};
