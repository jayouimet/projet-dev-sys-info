export const config = {
  gqlConfig: {
    url: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
    token: process.env.HASURA_ADMIN_SECRET,
    options: {
      method: 'POST',
      url: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
      },
    },
  },
  nextAuth: {
    url: process.env.NEXTAUTH_URL,
    secret: process.env.NEXTAUTH_SECRET,
    algorithm: process.env.NEXTAUTH_ALGORITHM,
  },
};
