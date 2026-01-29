import axios from 'axios';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export async function getStaticProps() {
  const res = await axios.get(`${process.env.API_BASE}/education`);
  return { props: { education: res.data } };
}

function getDegreeType(entry) {
  if (entry['Ph.D.']) return { type: 'Ph.D.', field: entry['Ph.D.'] };
  if (entry['MS']) return { type: 'MS', field: entry['MS'] };
  if (entry['B.Tech']) return { type: 'B.Tech', field: entry['B.Tech'] };
  return { type: 'Degree', field: entry.degree || 'N/A' };
}

export default function Education({ education }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const iconColor = useColorModeValue('blue.500', 'blue.300');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        Education
      </Heading>
      
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <VStack spacing={6} align="stretch">
          {education.map((entry, idx) => {
            const { type, field } = getDegreeType(entry);
            const isCurrent = entry.years?.includes('Present');
            
            return (
              <MotionBox
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <Box
                  bg={cardBg}
                  p={6}
                  borderRadius="lg"
                  borderWidth="2px"
                  borderColor={isCurrent ? 'blue.400' : borderColor}
                  boxShadow="md"
                  _hover={{
                    boxShadow: 'xl',
                    bg: cardHoverBg,
                    borderColor: 'blue.400',
                    transition: 'all 0.3s ease'
                  }}
                  transition="all 0.3s ease"
                  position="relative"
                  overflow="hidden"
                >
                  {isCurrent && (
                    <Badge
                      position="absolute"
                      top={4}
                      right={4}
                      colorScheme="blue"
                      fontSize="xs"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      Current
                    </Badge>
                  )}
                  
                  <HStack spacing={4} align="flex-start" mb={4}>
                    <Box
                      fontSize="3xl"
                      color={iconColor}
                      lineHeight="1"
                    >
                      🎓
                    </Box>
                    <VStack align="flex-start" spacing={2} flex={1}>
                      <HStack>
                        <Badge
                          colorScheme={type === 'Ph.D.' ? 'purple' : type === 'MS' ? 'blue' : 'green'}
                          fontSize="md"
                          px={3}
                          py={1}
                          borderRadius="md"
                        >
                          {type}
                        </Badge>
                        <Text fontSize="lg" fontWeight="bold" color={iconColor}>
                          {field}
                        </Text>
                      </HStack>
                      
                      <HStack spacing={4} flexWrap="wrap">
                        <HStack spacing={2}>
                          <Text fontSize="lg">🏛️</Text>
                          <Text fontSize="md" color="gray.600">
                            {entry.institution}
                          </Text>
                        </HStack>
                        
                        <HStack spacing={2}>
                          <Text fontSize="lg">📅</Text>
                          <Text fontSize="md" fontWeight="medium">
                            {entry.years}
                          </Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </HStack>
                  
                  {(entry.GPA || entry.Division) && (
                    <>
                      <Divider my={3} />
                      <HStack spacing={4}>
                        {entry.GPA && (
                          <HStack spacing={2}>
                            <Text fontSize="lg">🏆</Text>
                            <Text fontSize="sm" fontWeight="medium">
                              GPA: <Text as="span" fontWeight="bold" color="yellow.600">{entry.GPA}</Text>
                            </Text>
                          </HStack>
                        )}
                        {entry.Division && (
                          <HStack spacing={2}>
                            <Text fontSize="lg">⭐</Text>
                            <Text fontSize="sm" fontWeight="medium">
                              {entry.Division}
                            </Text>
                          </HStack>
                        )}
                      </HStack>
                    </>
                  )}
                </Box>
              </MotionBox>
            );
          })}
        </VStack>
      </MotionBox>
    </Box>
  );
}
