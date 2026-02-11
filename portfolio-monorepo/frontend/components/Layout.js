import { ChakraProvider, Container, Box } from '@chakra-ui/react';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <ChakraProvider>
      <Navbar />
      
      {/* RESPONSIVE CHANGE: 
         Outer Box prevents unwanted horizontal window scrolling caused by 
         full-width animations or off-screen elements.
      */}
      <Box w="100%" overflowX="hidden">
        {/* RESPONSIVE CHANGE: 
           1. px={{ base: 4, md: 8 }}: Adds dynamic padding for different screen sizes.
           2. overflowX={{ base: "auto" }}: Allows the container content to scroll 
              horizontally on small screens if it overflows (e.g. wide tables/code).
        */}
        <Container 
          maxW="container.lg" 
          py={4} 
          px={{ base: 4, md: 8 }}
          overflowX={{ base: "auto", md: "visible" }}
        >
          {children}
        </Container>
      </Box>
    </ChakraProvider>
  );
}