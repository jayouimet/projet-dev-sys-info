'use client';

import { Box, Card, CardBody, CardHeader, Center, Heading } from "@chakra-ui/react";
import DataTable from "@components/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Fragment } from "react";

type UnitConversion = {
  fromUnit: string;
  toUnit: string;
  factor: number;
};

const data: UnitConversion[] = [
  {
    fromUnit: "inches",
    toUnit: "millimetres (mm)",
    factor: 25.4
  },
  {
    fromUnit: "feet",
    toUnit: "centimetres (cm)",
    factor: 30.48
  },
  {
    fromUnit: "yards",
    toUnit: "metres (m)",
    factor: 0.91444
  }
];

const columnHelper = createColumnHelper<UnitConversion>();

const columns = [
  columnHelper.accessor("fromUnit", {
    cell: (info) => info.getValue(),
    header: "To convert"
  }),
  columnHelper.accessor("toUnit", {
    cell: (info) => info.getValue(),
    header: "Into"
  }),
  columnHelper.accessor("factor", {
    cell: (info) => info.getValue(),
    header: "Multiply by",
    meta: {
      isNumeric: true
    }
  })
];

const UsersPage = () => {
  return (
    <Fragment>
      <Center m={'auto'}>
        <Card>
          <CardHeader>
            <Heading>
              Utilisateurs
            </Heading>
          </CardHeader>
          <CardBody>
            <DataTable columns={columns} data={data} />
          </CardBody>
        </Card>
      </Center>
    </Fragment>
  );
}

export default UsersPage;