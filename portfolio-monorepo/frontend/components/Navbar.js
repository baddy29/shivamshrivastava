import Link from 'next/link';
import { Flex, Box, Spacer, Text } from '@chakra-ui/react';

export default function Navbar() {
  const tabs = ['projects', 'education', 'career', 'skills', 'publications', 'affiliations'];
  
  return (
    <Flex bg="blue.600" p={4} color="white" align="center">
      {/* Name is now a clickable Link to Home */}
      <Box fontWeight="bold" fontSize="lg" cursor="pointer">
        <Link href="/">
          <Text _hover={{ textDecoration: 'none', opacity: 0.9 }}>
            Shivam Shrivastava
          </Text>
        </Link>
      </Box>
      
      <Spacer />
      
      {tabs.map(t => (
        <Box px={2} key={t}>
          <Link href={`/${t}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</Link>
        </Box>
      ))}
    </Flex>
  );
}