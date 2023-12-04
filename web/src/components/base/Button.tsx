import { defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'semibold',
    textTransform: 'uppercase',
    borderRadius: '4px',
    transition: '300ms',
    gap: 2,
    // _hover: {
    //   boxShadow: "lightGreen",
    // },
  },
  // Two sizes: sm and md
  sizes: {
    // sm: {
    //   fontSize: "sm",
    //   px: 4,
    //   py: 3,
    // },
    // md: {
    //   fontSize: "md",
    //   px: 6,
    //   py: 4,
    // },
  },
  // The default size and variant values
  defaultProps: {
    variant: 'outline',
    colorScheme: 'brand.primary.green',
  },
  // Two variants: outline and solid
  variants: {
    outline: ({ colorScheme }) => ({
      _hover: {
        bg: `${colorScheme}.900`,
      },
    }),
    solid: ({ colorScheme }) => ({
      _hover: {
        bg: `${colorScheme}.500`,
      },
    }),
    red: ({ colorScheme }) => ({
      border: '5px solid white',
      color: 'white',
      bgColor: 'red.500',
      _hover: {
        bg: `red.700`,
      },
      _disabled: {
        _hover: {
          bgColor: `red.500 !important`,
        }
      }
    }),
    green: ({ colorScheme }) => ({
      border: '5px solid white',
      color: 'white',
      bgColor: 'green.500',
      _hover: {
        bg: `green.700`,
      },
      _disabled: {
        _hover: {
          bgColor: `green.500 !important`,
        }
      }
    }),
    blue: ({ colorScheme }) => ({
      border: '5px solid white',
      color: 'white',
      bgColor: 'blue.500',
      _hover: {
        bg: `blue.700`,
      },
      _disabled: {
        _hover: {
          bgColor: `blue.500 !important`,
        }
      }
    }),
    // outline: {
    //   border: "2px solid",
    //   //   borderColor: "brand.primary.green.500",
    //   _hover: {
    //     // bg: "brand.primary.green.500",
    //   },
    // },
    // solid: {
    //   border: "2px solid",
    //   //   bg: "brand.primary.green.500",
    //   //   borderColor: "brand.primary.green.500",
    //   _hover: {
    //     // bg: "transparent",
    //   },
    // },
  },
});

export default Button;
