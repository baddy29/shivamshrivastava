import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Container,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Link,
  Icon,
  Divider
} from '@chakra-ui/react';
import { ExternalLinkIcon, EmailIcon } from '@chakra-ui/icons';

// Simple LinkedIn Icon Component
const LinkedInIcon = (props) => (
  <Icon viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </Icon>
);

export async function getStaticProps() {
  try {
    const res = await axios.get(`${process.env.API_BASE}/about`);
    return { props: { data: res.data } };
  } catch (error) {
    console.error("Error fetching about data:", error);
    return { props: { data: {} } };
  }
}

export default function Home({ data }) {
  const { about, blogs, contact } = data || {};
  
  const bgSection = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Helper component for a Blog Category Column
  const BlogCategory = ({ title, items }) => (
    <Box 
      bg={cardBg} 
      p={5} 
      borderRadius="lg" 
      borderWidth="1px" 
      borderColor={borderColor}
      height="100%"
      shadow="md"
    >
      <Heading size="md" mb={4} color="blue.500">{title}</Heading>
      
      {/* Horizontal Swipe Container */}
      <Flex 
        overflowX="auto" 
        gap={4} 
        pb={4}
        css={{
          '&::-webkit-scrollbar': { height: '8px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { background: '#CBD5E0', borderRadius: '4px' },
        }}
      >
        {items && items.map((blog, idx) => (
          <Box
            key={idx}
            minW={{ base: "180px", md: "220px" }} // Ensures cards are wide enough to require scrolling, adaptable on mobile
            p={4}
            bg={useColorModeValue('gray.50', 'gray.700')}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Text fontWeight="bold" noOfLines={2} mb={2}>{blog.title}</Text>
            <Text fontSize="sm" color="gray.500" noOfLines={3}>
              {blog.excerpt}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );

  return (
    <Box>
      {/* 1. Cover Picture Section */}
      <Box 
        h={{ base: "220px", md: "300px" }} 
        w="100%" 
        bgImage="url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')" // Placeholder Tech/Space image
        bgPosition="center" 
        bgSize="cover"
        position="relative"
      >
        <Box 
          position="absolute" 
          top={0} left={0} right={0} bottom={0} 
          bg="blackAlpha.600" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
        >
          <Heading 
            color="white" 
            size={{ base: "xl", md: "2xl" }} 
            textAlign="center"
          >
            Welcome to My Portfolio
          </Heading>
        </Box>
      </Box>

      <Container maxW="container.xl" py={10}>
        
        {/* 2. About Me Section */}
        <VStack spacing={8} align="stretch" mb={12}>
          <Box>
            <Heading 
              size={{ base: "lg", md: "xl" }} 
              mb={4} 
              borderBottom="2px solid" 
              borderColor="blue.500" 
              display="inline-block"
            >
              About Me
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              lineHeight="tall" 
              textAlign="justify"
            >
              {about?.text || "Loading..."}
            </Text>
          </Box>
        </VStack>

        {/* 3. Blogs Section */}
        <Box mb={12}>
          <Heading size="xl" mb={6} borderBottom="2px solid" borderColor="purple.500" display="inline-block">
            Blogs
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }}>
            <BlogCategory title="Astronomy" items={blogs?.astronomy} />
            <BlogCategory title="Sports" items={blogs?.sports} />
            <BlogCategory title="Travel" items={blogs?.travel} />
          </SimpleGrid>
        </Box>
        
      </Container>

      {/* 4. Footer */}
      <Box bg="gray.800" color="white" py={{ base: 6, md: 8 }} mt={8}>
        <Container maxW="container.xl">
          <VStack spacing={4} align="stretch">
            <Heading size="md" color="gray.300">Contact Information</Heading>
            <Divider borderColor="gray.600" maxW="200px" />
            
            <HStack 
              spacing={{ base: 4, md: 8 }} 
              flexWrap="wrap" 
              justify="center"
            >
              {contact?.emails && contact.emails.map((email, idx) => (
                <HStack key={idx}>
                  <EmailIcon color="blue.300" />
                  <Link href={`mailto:${email}`} _hover={{ color: "blue.300" }}>
                    {email}
                  </Link>
                </HStack>
              ))}
              
              <HStack>
                <LinkedInIcon boxSize={4} color="blue.300" />
                <Link href={contact?.linkedin} isExternal _hover={{ color: "blue.300" }}>
                  LinkedIn Profile <Icon as={ExternalLinkIcon} mx="2px" />
                </Link>
              </HStack>
            </HStack>
            
            <Text fontSize="sm" color="gray.500" pt={4}>
              © {new Date().getFullYear()} Shivam Shrivastava. All rights reserved.
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}