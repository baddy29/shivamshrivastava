import Link from 'next/link';
import { Flex, Box, Spacer } from '@chakra-ui/react';
export default function Navbar() {
  const tabs = ['projects','education','career','skills','achievements','news','affiliations'];
  return (
    <Flex bg="blue.600" p={4} color="white">
      <Box fontWeight="bold">Shivam Shrivastava</Box>
      <Spacer />
      {tabs.map(t => (
        <Box px={2} key={t}>
          <Link href={`/${t}`}>{t.charAt(0).toUpperCase()+t.slice(1)}</Link>
        </Box>
      ))}
    </Flex>
  );
}