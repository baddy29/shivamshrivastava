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
  Link,
  Icon
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export async function getStaticProps() {
  const res = await axios.get(`${process.env.API_BASE}/publications`);
  return { props: { publications: res.data } };
}

export default function Publications({ publications }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  const accentColor = useColorModeValue('blue.500', 'blue.300');

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

  const getTypeColor = (type) => {
    if (type === 'Conference Presentation') return 'blue';
    if (type === 'Publication') return 'green';
    if (type === 'Award') return 'yellow';
    return 'blue';
  };

  const getTypeIcon = (type) => {
    if (type === 'Conference Presentation') return '🎤';
    if (type === 'Publication') return '📄';
    if (type === 'Award') return '🏆';
    return '⭐';
  };

  return (
    <Box>
      <Heading 
        mb={8} 
        size="xl" 
        bgGradient="linear(to-r, blue.400, blue.500)"
        bgClip="text"
        fontWeight="bold"
      >
        News
      </Heading>
      
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <VStack spacing={6} align="stretch">
          {publications.map((publication, idx) => (
            <MotionBox
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.99 }}
            >
              <Box
                bg={cardBg}
                p={6}
                borderRadius="lg"
                borderWidth="2px"
                borderLeftWidth="4px"
                borderLeftColor={accentColor}
                borderColor={borderColor}
                boxShadow="md"
                _hover={{
                  boxShadow: 'xl',
                  bg: cardHoverBg,
                  borderColor: accentColor,
                  borderLeftColor: accentColor,
                  transition: 'all 0.3s ease'
                }}
                transition="all 0.3s ease"
                position="relative"
                overflow="hidden"
              >
                <HStack spacing={4} align="flex-start" mb={4}>
                  <Box
                    fontSize="4xl"
                    lineHeight="1"
                  >
                    {getTypeIcon(publication.type)}
                  </Box>
                    <VStack align="flex-start" spacing={3} flex={1}>
                    <HStack spacing={3} flexWrap="wrap" align="flex-start">
                      <Badge
                        colorScheme={getTypeColor(publication.type)}
                        fontSize="sm"
                        px={3}
                        py={1}
                        borderRadius="md"
                        fontWeight="bold"
                      >
                        {publication.type}
                      </Badge>
                    </HStack>
                    
                    <Text fontSize="lg" fontWeight="bold" color={iconColor} lineHeight="1.4">
                      {publication.title}
                    </Text>
                    
                    <Text fontSize="md" color="gray.600" fontStyle="italic">
                      {publication.authors}
                    </Text>
                    
                    <VStack align="flex-start" spacing={2} fontSize="sm" color="gray.600" width="100%">
                      <HStack spacing={2} flexWrap="wrap">
                        <HStack spacing={1}>
                          <Text fontSize="md">🏛️</Text>
                          <Text fontWeight="medium">{publication.venue}</Text>
                        </HStack>
                      </HStack>
                      
                      <HStack spacing={4} flexWrap="wrap">
                        <HStack spacing={1}>
                          <Text>📍</Text>
                          <Text>{publication.location}</Text>
                        </HStack>
                        <HStack spacing={1}>
                          <Text>📅</Text>
                          <Text fontWeight="medium">{publication.dates}</Text>
                        </HStack>
                      </HStack>

                      {publication.url && (
                        <Link 
                          href={publication.url} 
                          isExternal 
                          color="blue.500" 
                          fontSize="sm"
                          fontWeight="semibold"
                          _hover={{ color: "blue.600", textDecoration: "underline" }}
                        >
                          View details{" "}
                          <Icon as={ExternalLinkIcon} boxSize={3} ml={1} />
                        </Link>
                      )}
                    </VStack>
                  </VStack>
                </HStack>
                
                {publication.notes && (
                  <>
                    <Divider my={3} />
                    <HStack spacing={2}>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                        Note:
                      </Text>
                      <Badge
                        colorScheme="green"
                        fontSize="xs"
                        px={2}
                        py={1}
                        borderRadius="full"
                      >
                        {publication.notes}
                      </Badge>
                    </HStack>
                  </>
                )}
              </Box>
            </MotionBox>
          ))}
        </VStack>
      </MotionBox>
    </Box>
  );
}
