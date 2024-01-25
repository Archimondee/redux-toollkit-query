import type {ReactNode} from 'react';
import React, {memo} from 'react';
import type {ViewStyle} from 'react-native';
import {View} from 'react-native';
import Modal from 'react-native-modal';

import styles from './BaseModalStyles';

interface Props {
  showModal: boolean;
  animation: 'zoom' | 'slide';
  title?: string;
  children?: ReactNode;
  onBackdropPress?: () => void;
  containerStyle?: ViewStyle | ViewStyle[];
  contentStyle?: ViewStyle | ViewStyle[];
  onModalHide?: () => void;
  onBackButtonPress?: () => void;
  backdropOpacity?: number;
}

const Component = ({
  showModal,
  title,
  children,
  animation,
  onBackdropPress,
  containerStyle,
  contentStyle,
  onModalHide,
  onBackButtonPress,
  backdropOpacity,
}: Props) => {
  return (
    <Modal
      style={[styles.container, containerStyle]}
      animationIn={animation === 'zoom' ? 'zoomIn' : 'slideInUp'}
      animationOut={animation === 'zoom' ? 'zoomOut' : 'slideOutDown'}
      isVisible={showModal}
      onBackdropPress={onBackdropPress}
      onModalHide={onModalHide}
      onBackButtonPress={onBackButtonPress}
      backdropOpacity={backdropOpacity}
      animationInTiming={2}
      animationOutTiming={2}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </Modal>
  );
};

Component.defaultProps = {
  animation: 'zoom',
  onModalHide: undefined,
};

export default memo(Component);
