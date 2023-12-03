'use client';

import {
  Button,
  FormControl,
  FormErrorMessage,
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
import ISGPUser from '@sgp_types/SGPUser/ISGPUser';
import { useMutation, useQuery } from '@apollo/client';
import { INSERT_USER, UPDATE_USER_BY_PK } from '@gql/users';
import { GET_ROLES } from '@gql/roles';
import ISGPRole from '@sgp_types/SGPRole/ISGPRole';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface UsersUpsertModalProps {
  isModalOpen: boolean;
  action: UpsertModalAction;
  onClose: () => void;
  onSubmitCallback: (category: ISGPUser) => void;
  user: ISGPUser | undefined;
}

const UsersUpsertModal = ({
  isModalOpen,
  action,
  onClose,
  onSubmitCallback,
  user,
}: UsersUpsertModalProps) => {
  const { data: session } = useSession();

  const [name, setName] = useState<string>(user?.name || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState<string>(user?.phone_number || '');
  const [password, setPassword] = useState<string>('');
  const [balance, setBalance] = useState<number>(user?.balance || 0);
  const [roleId, setRoleId] = useState<string | undefined>(user?.role_id || undefined);
  const { data, loading, error, refetch } = useQuery(GET_ROLES, {
    variables: {
      where: {}
    },
    onCompleted: (data) => {
      if (roleId === undefined) {
        setRoleId(data.roles.find((role: ISGPRole) => { return role.name === 'user' }).id);
      }
    }
  });

  const [mutationAddUser] = useMutation(INSERT_USER);
  const [mutationUpdateUser] = useMutation(UPDATE_USER_BY_PK);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: ISGPUser = {
      id: user?.id || undefined,
      name: name,
      phone_number: phoneNumber,
      balance: balance,
    };

    if (session?.user.role === 'admin' || action === UpsertModalAction.INSERT) {
      data.role_id = roleId;
    }
      
    if (action === UpsertModalAction.INSERT) {
      data.email = email;
      mutationAddUser({
        variables: {
          data: data
        },
        onCompleted: (data) => {
          if (password?.length > 0) {
            axios.post('/api/set_password', {
              user_id: data.insert_users_one.id,
              password: password
            });
          }
          onSubmitCallback(data.insert_users_one);
        }
      });
    } else {
      mutationUpdateUser({
        variables: {
          pk_columns: {
            id: data?.id
          },
          data: data,
        },
        onCompleted: (data) => {
          if (password?.length > 0) {
            axios.post('/api/set_password', {
              user_id: data.update_users_by_pk.id,
              password: password
            });
          }
          onSubmitCallback(data.update_users_by_pk);
        }
      });
    }
  };

  const isError = password.length > 0 && password.length < 5;

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
            <FormControl isDisabled={ loading || session?.user.role !== 'admin' } isRequired mb={3}>
              <FormLabel>Role</FormLabel>
              <Select
                value={roleId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setRoleId(e.currentTarget.value);
                }}>
                {
                  !loading && !error && data.roles.map((role: ISGPRole) => {
                    return (
                      <SelectOption key={role.id} value={role.id}>{role.name}</SelectOption>
                    );
                  })
                }
              </Select>
            </FormControl>
            <FormControl isDisabled={action === UpsertModalAction.UPDATE} isRequired mb={3}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={email || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.currentTarget.value);
                }}
              />
            </FormControl>
            { session?.user.role === 'admin' && <FormControl isInvalid={isError} mb={3}>
              <FormLabel>New password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.currentTarget.value);
                }}
              />
              {isError && (
                <FormErrorMessage>Password length must be of at least 5 characters.</FormErrorMessage>
              )}
            </FormControl>}
            <FormControl mb={3}>
              <FormLabel>Phone number</FormLabel>
              <Input
                type="text"
                name="phone_number"
                value={phoneNumber || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPhoneNumber(e.currentTarget.value);
                }}
              />
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Balance</FormLabel>
              <NumberInput
                name={'balance'}
                value={balance || 0}
                onChange={(
                  valueAsString: string,
                  valueAsNumber: number,
                ) => {
                  setBalance(valueAsNumber);
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

export default UsersUpsertModal;
