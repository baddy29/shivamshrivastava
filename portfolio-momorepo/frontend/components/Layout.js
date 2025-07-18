import { ChakraProvider, Container } from '@chakra-ui/react';
import Navbar from './Navbar';
export default function Layout({ children }) {
  return (
    <ChakraProvider>
      <Navbar />
      <Container maxW="container.lg" py={4}>{children}</Container>
    </ChakraProvider>
  );
}