import axios from 'axios';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Link,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export async function getStaticProps() {
  const res = await axios.get(`${process.env.API_BASE}/projects`);
  // Ensure we access the 'projects' array from your JSON structure
  return { props: { projects: res.data.projects || res.data } };
}

export default function Projects({ projects }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box>
      <Heading 
        mb={8} 
        size="xl" 
        bgGradient="linear(to-r, blue.400, purple.500)"
        bgClip="text"
        fontWeight="bold"
      >
        Projects
      </Heading>
      
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <VStack spacing={6} align="stretch">
          {projects && projects.map((project, idx) => (
            <MotionBox
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -2, transition: { duration: 0.2 } }}
            >
              <Box
                bg={cardBg}
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderLeftWidth="4px"
                borderLeftColor={accentColor}
                borderColor={borderColor}
                boxShadow="md"
                _hover={{
                  boxShadow: 'xl',
                  bg: cardHoverBg,
                  borderColor: accentColor,
                  transition: 'all 0.3s ease'
                }}
                transition="all 0.3s ease"
              >
                <VStack align="flex-start" spacing={3}>
                  <HStack justify="space-between" width="100%">
                    <HStack spacing={2} align="center">
                       <Text fontSize="2xl">📂</Text>
                       <Link 
                         href={project.url} 
                         isExternal 
                         _hover={{ textDecoration: 'none' }}
                       >
                        <Heading size="md" color={useColorModeValue('gray.800', 'white')} _hover={{ color: accentColor }}>
                          {project.title}
                        </Heading>
                       </Link>
                    </HStack>
                  </HStack>

                  <Text color={textColor} fontSize="md">
                    {project.description}
                  </Text>

                  <Box pt={2}>
                    <Button 
                      as="a" 
                      href={project.url} 
                      target="_blank"
                      size="sm" 
                      variant="outline" 
                      colorScheme="blue" 
                      rightIcon={<ExternalLinkIcon />}
                    >
                      View Repository
                    </Button>
                  </Box>
                </VStack>
              </Box>
            </MotionBox>
          ))}
        </VStack>
      </MotionBox>
    </Box>
  );
}