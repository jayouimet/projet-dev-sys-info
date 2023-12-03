'use client';

import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Spacer } from "@chakra-ui/react";
import DataTable from "@components/DataTable";
import UsersUpsertModal from "@components/forms/users/UsersUpsertModal";
import { DELETE_USER, GET_USERS } from "@gql/users";
import ISGPUser from "@sgp_types/SGPUser/ISGPUser";
import { UpsertModalAction } from "@sgp_types/enums/UpsertModalAction";
import { createColumnHelper } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useState } from "react";

const columnHelper = createColumnHelper<ISGPUser>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name"
  }),
  columnHelper.accessor("role.name", {
    cell: (info) => info.getValue(),
    header: "Role"
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    header: "Email"
  }),
  columnHelper.accessor("phone_number", {
    cell: (info) => info.getValue(),
    header: "Phone number",
    /*meta: {
      isNumeric: true
    }*/
  })
];

const UsersPage = () => {
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [upsertAction, setUpsertAction] = useState<UpsertModalAction>(UpsertModalAction.INSERT);
  const [selectedUser, setSelectedUser] = useState<ISGPUser | undefined>(undefined);

  const { data, loading, error, refetch } = useQuery(GET_USERS, {
    variables: {
      where: {}
    },
  })

  const [deleteUser, { data: delete_data, loading: delete_loading, error: delete_error }] = useMutation(DELETE_USER);

  const handleDelete = (user: ISGPUser) => {
    deleteUser({
      variables: {
        id: user.id
      },
      onCompleted: refetch
    });
  }

  const onSubmitCallback = (user: ISGPUser) => {
    refetch();
    handleClose();
  }

  const handleEdit = (user: ISGPUser) => {
    setUpsertAction(UpsertModalAction.UPDATE);
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  const handleAdd = () => {
    setUpsertAction(UpsertModalAction.INSERT);
    setSelectedUser(undefined);
    setIsModalOpen(true);
  }

  const handleClose = () => {
    setUpsertAction(UpsertModalAction.INSERT);
    setSelectedUser(undefined);
    setIsModalOpen(false);
  }

  return (
    <Card 
      w={'100%'}
      h={'100vh'}
    >
      <CardHeader>
        <Heading>
          Utilisateurs
        </Heading>
      </CardHeader>
      <CardBody>
        <Flex>
          <Spacer flex={3}></Spacer>
          <Box flex={1}>
            <Button onClick={handleAdd}>Add</Button>
          </Box>
        </Flex>
        <DataTable 
          isDisabledEdit={(user: ISGPUser) => {
            return (
              session?.user.role !== 'admin' &&
              user.role?.name !== 'user'
            );
          }}
          isDisabledDelete={(user: ISGPUser) => {
            return (
              session?.user.role !== 'admin' &&
              user.role?.name !== 'user'
            );
          }}
          handleEdit={data => handleEdit(data)} 
          handleDelete={data => handleDelete(data)} 
          columns={columns} 
          data={loading ? [] : data.users} 
        />
      </CardBody>
      {isModalOpen && (
        <UsersUpsertModal
          action={upsertAction}
          isModalOpen={isModalOpen}
          user={selectedUser}
          onClose={handleClose}
          onSubmitCallback={onSubmitCallback}
        />
      )}
    </Card>
  );
}

export default UsersPage;