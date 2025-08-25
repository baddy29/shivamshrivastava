import axios from 'axios';
import { Box, Heading, Text, Link } from '@chakra-ui/react';

export async function getStaticProps() {
  const res = await axios.get(`${process.env.API_BASE}/projects`);
  return { props: { projects: res.data } };
}

export default function Projects({ projects }) {
  return (
    <Box>
      <Heading mb={4}>Projects</Heading>
      {projects.map(p => (
        <Box key={p.url} mb={4} p={4} borderWidth="1px" borderRadius="md">
          <Link href={p.url} isExternal fontSize="xl" color="blue.500">{p.title}</Link>
          <Text mt={2}>{p.description}</Text>
        </Box>
      ))}
    </Box>
  );
}