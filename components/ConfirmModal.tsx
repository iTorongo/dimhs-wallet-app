import { Modal, Center, Button } from "native-base";
import { useEffect, useState } from "react";

import { StyleSheet } from "react-native";

export const ConfirmModal = ({ openModal, onCloseConfirmModal, onConfirm, text }: Props) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(!!openModal);
  }, [openModal]);

  const onCloseModal = () => {
    setShowModal(false);
    onCloseConfirmModal();
  };

  const onfConfirmModal = () => {
    setShowModal(false);
    onConfirm();
  }
  return (
    <Center>
      <Modal isOpen={showModal} onClose={onCloseModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Connection Request</Modal.Header>
          <Modal.Body>Would you like to connect with {text} ?</Modal.Body>
          <Modal.Footer  style={styles.buttonGroup}>
            <Button.Group space={2}>
              <Button
                onPress={onfConfirmModal}
                colorScheme='green'
              >
                Accept
              </Button>
              <Button
                variant="ghost"
                colorScheme="secondary"
                onPress={onCloseModal}
              >
                Decline
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};


const styles = StyleSheet.create({
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center'
    }
})

interface Props {
  openModal?: boolean;
  onCloseConfirmModal: () => void;
  onConfirm: () => void
  text?: string
}
