import Link from 'next/link';
import { Flex, Box, Spacer, Text, HStack } from '@chakra-ui/react';

export default function Navbar() {
  const tabs = ['projects', 'education', 'career', 'skills', 'publications', 'affiliations'];
  
  return (
    <Flex bg="blue.600" p={4} color="white" align="center">
      {/* Brand Name - Kept fixed so it's always visible */}
      <Box fontWeight="bold" fontSize="lg" cursor="pointer" flexShrink={0}>
        <Link href="/">
          <Text _hover={{ textDecoration: 'none', opacity: 0.9 }}>
            Shivam Shrivastava
          </Text>
        </Link>
      </Box>
      
      <Spacer />
      
      {/* RESPONSIVE CHANGE: 
         1. overflowX="auto": Makes this section scrollable horizontally on small screens.
         2. maxWidth: Ensures it doesn't force the parent to expand beyond screen width.
         3. whiteSpace="nowrap": Prevents tabs from wrapping to a new line.
      */}
      <Box 
        overflowX={{ base: "auto", md: "visible" }} 
        maxWidth={{ base: "calc(100vw - 200px)", md: "auto" }} // dynamic width calculation for mobile
        ml={4}
        css={{
          '&::-webkit-scrollbar': { display: 'none' }, // Hides scrollbar for clean look
          'scrollbarWidth': 'none',
        }}
      >
        <HStack spacing={4} px={2}>
          {tabs.map(t => (
            <Box key={t}>
              <Link href={`/${t}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</Link>
            </Box>
          ))}
        </HStack>
      </Box>
    </Flex>
  );
}