import axios from 'axios';
import { Box, Heading, Text } from '@chakra-ui/react';

export async function getStaticProps() {
  const res = await axios.get(`${process.env.API_BASE}/education`);
  return { props: { education: res.data } };
}

export default function Education({ education }) {
  return (
    <Box>
      <Heading mb={4}>Education</Heading>
      {education.map((e, idx) => (
        <Box key={idx} mb={4} p={4} borderWidth="1px" borderRadius="md">
          <Text fontSize="xl" fontWeight="bold">
            {e.degree} — {e.institution} ({e.years})
          </Text>
          <Text mt={2}>{e.description}</Text>
        </Box>
      ))}
    </Box>
  );
}
