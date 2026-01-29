import axios from 'axios';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  Divider,
  useColorModeValue,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export async function getStaticProps() {
  const res = await axios.get(`${process.env.API_BASE}/experience`);
  return { props: { experience: res.data } };
}

export default function Career({ experience }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  const bulletColor = useColorModeValue('blue.500', 'blue.300');

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getCompanyIcon = (company) => {
    if (company.includes('Missouri')) return '🎓';
    if (company.includes('Deutsche')) return '📡';
    if (company.includes('ACS')) return '💼';
    if (company.includes('Nucleus')) return '🏢';
    return '💼';
  };

  const getRoleColor = (title) => {
    if (title.includes('Research')) return 'purple';
    if (title.includes('Teaching')) return 'blue';
    return 'green';
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
        Career
      </Heading>
      
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <VStack spacing={6} align="stretch">
          {experience.map((exp, idx) => {
            const isCurrent = exp.isCurrent;
            
            return (
              <MotionBox
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.01, x: 5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.99 }}
              >
                <Box
                  bg={cardBg}
                  p={6}
                  borderRadius="lg"
                  borderWidth="2px"
                  borderLeftWidth="4px"
                  borderLeftColor={isCurrent ? 'blue.400' : borderColor}
                  borderColor={isCurrent ? 'blue.400' : borderColor}
                  boxShadow="md"
                  _hover={{
                    boxShadow: 'xl',
                    bg: cardHoverBg,
                    borderColor: 'blue.400',
                    borderLeftColor: 'blue.400',
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
                      animation="pulse 2s infinite"
                    >
                      Current
                    </Badge>
                  )}
                  
                  <HStack spacing={4} align="flex-start" mb={4}>
                    <Box
                      fontSize="4xl"
                      lineHeight="1"
                    >
                      {getCompanyIcon(exp.company)}
                    </Box>
                    <VStack align="flex-start" spacing={2} flex={1}>
                      <HStack spacing={3} flexWrap="wrap">
                        <Badge
                          colorScheme={getRoleColor(exp.title)}
                          fontSize="md"
                          px={3}
                          py={1}
                          borderRadius="md"
                        >
                          {exp.title}
                        </Badge>
                        <Text fontSize="lg" fontWeight="bold" color={iconColor}>
                          {exp.company}
                        </Text>
                      </HStack>
                      
                      <HStack spacing={4} flexWrap="wrap" fontSize="sm" color="gray.600">
                        <HStack spacing={1}>
                          <Text>📍</Text>
                          <Text>{exp.location}</Text>
                        </HStack>
                        <HStack spacing={1}>
                          <Text>📅</Text>
                          <Text fontWeight="medium">
                            {exp.startDate} - {exp.endDate}
                          </Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </HStack>
                  
                  <Divider my={3} />
                  
                  <Box mt={4}>
                    <Text fontSize="sm" fontWeight="semibold" mb={2} color="gray.600">
                      Key Responsibilities:
                    </Text>
                    <List spacing={2}>
                      {exp.responsibilities.map((responsibility, rIdx) => (
                        <ListItem key={rIdx} fontSize="sm" pl={2}>
                          <HStack align="flex-start" spacing={2}>
                            <Text color={bulletColor} fontSize="xs" mt={1}>▸</Text>
                            <Text flex={1}>{responsibility}</Text>
                          </HStack>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  
                  {exp.technologies && exp.technologies.length > 0 && (
                    <>
                      <Divider my={4} />
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" mb={2} color="gray.600">
                          Technologies:
                        </Text>
                        <HStack spacing={2} flexWrap="wrap">
                          {exp.technologies.map((tech, tIdx) => (
                            <Badge
                              key={tIdx}
                              colorScheme="gray"
                              fontSize="xs"
                              px={2}
                              py={1}
                              borderRadius="md"
                              variant="subtle"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </HStack>
                      </Box>
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
