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
import { INSERT_GAS_TANK, UPDATE_GAS_TANK_BY_PK } from '@gql/gas_tanks';
import ISGPGasType from '@sgp_types/SGPGasType/ISGPGasType';

interface TanksUpsertModalProps {
  isModalOpen: boolean;
  action: UpsertModalAction;
  onClose: () => void;
  onSubmitCallback: (category: ISGPGasTank) => void;
  tank: ISGPGasTank | undefined;
}

const TanksUpsertModal = ({
  isModalOpen,
  action,
  onClose,
  onSubmitCallback,
  tank,
}: TanksUpsertModalProps) => {
  const [name, setName] = useState<string>(tank?.name || '');
  const [volume, setVolume] = useState<number>(tank?.volume || 0);
  const [gasTypeId, setGasTypeId] = useState<string | undefined>(tank?.gas_type_id || undefined);
  const { data, loading, error, refetch } = useQuery(GET_GAS_TYPES, {
    variables: {
      where: {}
    },
    onCompleted: (data) => {
      if (data?.gas_types?.length > 0 && gasTypeId === undefined) {
        setGasTypeId(data.gas_types[0].id);
      }
    }
  });

  const [mutationAddGasTank] = useMutation(INSERT_GAS_TANK);
  const [mutationUpdateGasTank] = useMutation(UPDATE_GAS_TANK_BY_PK);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: ISGPGasTank = {
      id: tank?.id || undefined,
      name: name,
      volume: volume,
      gas_type_id: gasTypeId,
    };
      
    if (action === UpsertModalAction.INSERT) {
      mutationAddGasTank({
        variables: {
          data: data
        },
        onCompleted: (data) => {
          onSubmitCallback(data.insert_gas_tanks_one);
        }
      });
    } else {
      mutationUpdateGasTank({
        variables: {
          pk_columns: {
            id: data?.id
          },
          data: data,
        },
        onCompleted: (data) => {
          onSubmitCallback(data.update_gas_tanks_by_pk);
        }
      });
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onClose} isCentered size={'3xl'}>
      <ModalOverlay />

      <ModalContent maxH={'90%'} overflowY={'auto'}>
        <ModalHeader>User Form</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={(e) => handleSubmit(e)}>
          <ModalBody>
            <FormControl isRequired mb={3}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={name || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.currentTarget.value);
                }}
              />
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Gas Type</FormLabel>
              <Select
                value={gasTypeId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setGasTypeId(e.currentTarget.value);
                }}>
                {
                  !loading && !error && data.gas_types.map((gas_type: ISGPGasType) => {
                    return (
                      <SelectOption key={gas_type.id} value={gas_type.id}>{gas_type.name}</SelectOption>
                    );
                  })
                }
              </Select>
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Volume</FormLabel>
              <NumberInput
                name={'volume'}
                value={volume || 0}
                onChange={(
                  valueAsString: string,
                  valueAsNumber: number,
                ) => {
                  setVolume(valueAsNumber);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
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

export default TanksUpsertModal;
