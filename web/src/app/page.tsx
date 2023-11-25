'use client';

import { Flex, Stack, Center } from '@chakra-ui/layout';
import { Formik, FormikProps, useFormik } from 'formik';
import { Button, Input } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type LoginInputs = {
  email: string;
  password: string;
};

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();


  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values, {setSubmitting}) => {
      const res = await signIn('credentials', {
        redirect: true,
        email: values.email,
        password: values.password,
        callbackUrl: `/dashboard`,
      });
      if (res?.error) {
        setError(res.error);
      } else {
        setError(undefined);
      }
      if (res?.url) router.push(res.url);
      setSubmitting(false);
    },
  });

  return (
    <Flex 
      h={'100vh'}
      m={'auto'}
      w={'fit-content'}
    >
      <Center>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            spacing={4} 
            w={320}
          >
            <Input 
              name="email" 
              placeholder='Email' 
              onChange={formik.handleChange}
              value={formik.values.email
            }/>
            <Input 
              name="password"
              type="password"
              placeholder='Password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Center>
    </Flex>
  )
}
