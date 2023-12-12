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
  const { data: sessionData } = useSession();
  const [type, setType] = useState<string>(transaction?.type || '');

  const [mutationAddTransaction] = useMutation(INSERT_TRANSACTION);
  const [mutationUpdateTransaction] = useMutation(UPDATE_TRANSACTION_BY_PK);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj: ISGPTransaction = {
      id: transaction?.id || undefined,
      volume: parseFloat((transaction?.volume || 0).toFixed(2)),
      unit_price: transaction?.unit_price || 0,
      data: { status: 'approved' },
      type: type,
      subtotal: transaction?.subtotal || 0,
      taxes: transaction?.taxes || 0,
      total: transaction?.total || 0,
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
            <FormControl isDisabled isRequired mb={3}>
              <FormLabel>Volume</FormLabel>
              <Input
                value={(transaction?.volume.toFixed(2)) || 0}
              />
            </FormControl>
            <FormControl isDisabled isRequired mb={3}>
              <FormLabel>Unit Price</FormLabel>
              <Input
                value={transaction?.unit_price ? transaction?.unit_price / 100 : 0}
              />
            </FormControl>
            <FormControl isDisabled isRequired mb={3}>
              <FormLabel>Sous-Total</FormLabel>
              <Input value={(transaction?.subtotal ? transaction?.subtotal / 100 : 0)?.toFixed(2)}/>
            </FormControl>
            <FormControl isDisabled isRequired mb={3}>
              <FormLabel>Taxes</FormLabel>
              <Input value={(transaction?.taxes ? transaction?.taxes / 100 : 0)?.toFixed(2)}/>
            </FormControl>
            <FormControl isDisabled isRequired mb={3}>
              <FormLabel>Total</FormLabel>
              <Input value={(transaction?.total ? transaction?.total / 100 : 0)?.toFixed(2)}/>
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Type de transaction</FormLabel>
              <Select value={type || 'credit'} onChange={(e) => {
                setType(e.target.value);
              }}>
                <SelectOption value='credit'>Crédit</SelectOption>
                <SelectOption value='debit'>Débit</SelectOption>
              </Select>
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
