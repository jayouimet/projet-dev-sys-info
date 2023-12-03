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
import ISGPGasPump from '@sgp_types/SGPGasPump/ISGPGasPump';
import { INSERT_GAS_PUMP, UPDATE_GAS_PUMP_BY_PK } from '@gql/gas_pumps';
import { GET_GAS_TANKS } from '@gql/gas_tanks';

interface GasPumpsUpsertModalProps {
  isModalOpen: boolean;
  action: UpsertModalAction;
  onClose: () => void;
  onSubmitCallback: (gas_pump: ISGPGasPump) => void;
  gas_pump: ISGPGasPump | undefined;
}

const GasPumpsUpsertModal = ({
  isModalOpen,
  action,
  onClose,
  onSubmitCallback,
  gas_pump,
}: GasPumpsUpsertModalProps) => {
  const [name, setName] = useState<string>(gas_pump?.name || '');
  const [gasTankId, setGasTankId] = useState<string | undefined>(gas_pump?.gas_tank_id || undefined);
  const { data, loading, error, refetch } = useQuery(GET_GAS_TANKS, {
    variables: {
      where: {}
    },
    onCompleted: (data) => {
      if (data?.gas_tanks?.length > 0 && gasTankId === undefined) {
        setGasTankId(data.gas_tanks[0].id);
      }
    }
  });

  const [mutationAddGasPump] = useMutation(INSERT_GAS_PUMP);
  const [mutationUpdateGasPump] = useMutation(UPDATE_GAS_PUMP_BY_PK);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: ISGPGasPump = {
      id: gas_pump?.id || undefined,
      name: name,
      gas_tank_id: gasTankId,
    };
      
    if (action === UpsertModalAction.INSERT) {
      mutationAddGasPump({
        variables: {
          data: data
        },
        onCompleted: (data) => {
          onSubmitCallback(data.insert_gas_pumps_one);
        }
      });
    } else {
      mutationUpdateGasPump({
        variables: {
          pk_columns: {
            id: data?.id
          },
          data: data,
        },
        onCompleted: (data) => {
          onSubmitCallback(data.update_gas_pumps_by_pk);
        }
      });
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onClose} isCentered size={'3xl'}>
      <ModalOverlay />
      <ModalContent maxH={'90%'} overflowY={'auto'}>
        <ModalHeader>Gas Pump Form</ModalHeader>
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
              <FormLabel>Gas Tank</FormLabel>
              <Select
                value={gasTankId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setGasTankId(e.currentTarget.value);
                }}>
                {
                  !loading && !error && data.gas_tanks.map((gas_tank: ISGPGasTank) => {
                    return (
                      <SelectOption key={gas_tank.id} value={gas_tank.id}>{gas_tank.name}</SelectOption>
                    );
                  })
                }
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

export default GasPumpsUpsertModal;
