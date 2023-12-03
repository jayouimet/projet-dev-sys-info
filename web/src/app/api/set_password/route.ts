import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { getServerSession } from "next-auth/next";
import axios from 'axios';
import { config } from '@utils/config';
import bcrypt from 'bcrypt';

const userQuery = `
  query userQuery ($id: uuid!) {
    users_by_pk (id: $id) {
      id
      role {
        id
        name
      }
    }
  }
`

const pwdMutation = `
  mutation pwdMutation ($id: uuid!, $password_hash: String!) {
    update_users_by_pk(pk_columns: {id: $id}, _set: {password_hash: $password_hash}) {
      id
    }
  }
`

export async function POST(req: NextRequest) {
  let pwd, id;
  try {
    const body = await req.json()
    const { user_id, password } = body;
    pwd = password;
    id = user_id;
  } catch (error) {
    return NextResponse.json({
      message: "Malformed request body.",
    }, {
      status: 400
    });
  }

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({
      message: "You must be logged in.",
    }, {
      status: 403
    });
  }

  const graphqlQuery = {
    operationName: 'userQuery',
    query: userQuery,
    variables: {
      id: session.user.id,
    }
  }

  const result = await axios.request({
    ...config.gqlConfig.options,
    data: graphqlQuery,
  })

  if (result.data.errors) {
    return NextResponse.json({
      message: "Internal server error.",
    }, {
      status: 500,
    });
  }

  if (result.data?.data?.users_by_pk?.role?.name === 'admin') {
    const password_hash = await bcrypt.hash(pwd, 10);

    const graphqlMutation = {
      operationName: 'pwdMutation',
      query: pwdMutation,
      variables: {
        id: id,
        password_hash: password_hash,
      }
    }

    await axios.request({
      ...config.gqlConfig.options,
      data: graphqlMutation,
    });

    return NextResponse.json({
      message: 'Success',
    }, {
      status: 200,
    })
  } else {
    return NextResponse.json({
      message: "Missing permissions for this action.",
    }, {
      status: 403
    });
  }
}

