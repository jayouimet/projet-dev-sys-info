'use client';

import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { UpsertModalAction } from '@sgp_types/enums/UpsertModalAction';
import ISGPGasTank from '@sgp_types/SGPGasTank/ISGPGasTank';

interface TanksShowModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  gas_tank: ISGPGasTank | undefined;
}

const GasTanksShowModal = ({
  isModalOpen,
  onClose,
  gas_tank,
}: TanksShowModalProps) => {
  return (
    <Modal isOpen={isModalOpen} onClose={onClose} isCentered size={'3xl'}>
      <ModalOverlay />

      <ModalContent maxH={'90%'} overflowY={'auto'}>
        <ModalHeader>{gas_tank?.name}</ModalHeader>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default GasTanksShowModal;
