import React from 'react';
import {Modal as RNModal, TouchableWithoutFeedback} from 'react-native';
import {Backdrop} from './atoms';

export type ModalProps = {
    children: React.ReactNode,
    onClose: () => void,
};

export const Modal: React.FC<ModalProps> = ({children, onClose}) =>
    <RNModal
        transparent
        animationType="fade"
        onRequestClose={onClose}
        onDismiss={onClose}
    >
        <TouchableWithoutFeedback onPress={onClose}>
            <Backdrop>
                {children}
            </Backdrop>
        </TouchableWithoutFeedback>
    </RNModal>
