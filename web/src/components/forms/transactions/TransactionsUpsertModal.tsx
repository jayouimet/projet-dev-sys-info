'use client';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from '@chakra-ui/react';
import SelectOption from '@components/base/SelectOption';
import {
  ChangeEvent,
  FormEvent,
  useState,
} from 'react';
import { UpsertModalAction } from '@sgp_types/enums/UpsertModalAction';
import { useMutation, useQuery } from '@apollo/client';
import ISGPGasTank from '@sgp_types/SGPGasTank/ISGPGasTank';
import { GET_GAS_TYPES } from '@gql/gas_types';
import ISGPGasType from '@sgp_types/SGPGasType/ISGPGasType';
import ISGPTransaction from '@sgp_types/SGPTransaction/ISGPTransaction';
import { INSERT_TRANSACTION, UPDATE_TRANSACTION_BY_PK } from '@gql/transactions';
import { useSession } from 'next-auth/react';

interface TransactionsUpsertModalProps {
  isModalOpen: boolean;
  action: UpsertModalAction;
  onClose: () => void;
  onSubmitCallback: (transaction: ISGPTransaction) => void;
  transaction: ISGPTransaction | undefined;
}

const TransactionsUpsertModal = ({
  isModalOpen,
  action,
  onClose,
  onSubmitCallback,
  transaction,
}: TransactionsUpsertModalProps) => {
  const {data: sessionData} = useSession();
  const [unitPrice, setUnitPrice] = useState<number>(transaction?.unit_price || 0);
  const [volume, setVolume] = useState<number>(transaction?.volume || 0);
  const [type, setType] = useState<string>(transaction?.type || '');

  const [mutationAddTransaction] = useMutation(INSERT_TRANSACTION);
  const [mutationUpdateTransaction] = useMutation(UPDATE_TRANSACTION_BY_PK);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subtotal = Math.round(unitPrice * volume / 100);
    const taxes = Math.round(subtotal * 0.14975);
    
    const obj: ISGPTransaction = {
      id: transaction?.id || undefined,
      volume: volume,
      unit_price: unitPrice,
      data: {status: 'approved'},
      type: type,
      subtotal: subtotal,
      taxes: taxes,
      total: subtotal + taxes,
      user_id: sessionData?.user.id
    };
      
    if (action === UpsertModalAction.INSERT) {
      mutationAddTransaction({
        variables: {
          data: obj
        },
        onCompleted: (data) => {
          onSubmitCallback(data.insert_transactions_one);
        }
      });
    } else {
      mutationUpdateTransaction({
        variables: {
          pk_columns: {
            id: obj?.id
          },
          data: obj,
        },
        onCompleted: (data) => {
          onSubmitCallback(data.update_transactions_by_pk);
        }
      });
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onClose} isCentered size={'3xl'}>
      <ModalOverlay />

      <ModalContent maxH={'90%'} overflowY={'auto'}>
        <ModalHeader>Transaction Form</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={(e) => handleSubmit(e)}>
          <ModalBody>
            <FormControl isRequired mb={3}>
              <FormLabel>Volume</FormLabel>
              <NumberInput
                name={'volume'}
                value={volume / 100 || 0}
                onChange={(
                  valueAsString: string,
                  valueAsNumber: number,
                ) => {
                  setVolume(Math.round(valueAsNumber * 100));
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Unit Price</FormLabel>
              <NumberInput
                name={'unit_price'}
                value={unitPrice / 100 || 0}
                onChange={(
                  valueAsString: string,
                  valueAsNumber: number,
                ) => {
                  setUnitPrice(Math.round(valueAsNumber * 100));
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Type</FormLabel>
              <Input
                type="text"
                name="type"
                value={type || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setType(e.currentTarget.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} type="submit">
              Submit
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TransactionsUpsertModal;
