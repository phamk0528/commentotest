import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import FormSubscribe from './FormSubscribe';
type Props = {
    open: any;
};

const ModalSubscribe = ({ open }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        open ? onOpen() : onClose();
    }, [open]);

    const finalRef = useRef(null);

    return (
        <>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} size="4xl" onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody mt="0px">
                        <FormSubscribe />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalSubscribe;
