import axios from 'axios';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  Link,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export async function getStaticProps() {
  const res = await axios.get(`${process.env.API_BASE}/affiliations`);
  return { props: { affiliations: res.data } };
}

export default function Affiliations({ affiliations }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const roleColor = useColorModeValue('blue.600', 'teal.300');
  const accentColor = useColorModeValue('blue.500', 'blue.300');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const getTypeColor = (type) => {
    if (type === 'Research') return 'blue';
    if (type === 'Academic') return 'green';
    if (type === 'Entrepreneurship') return 'blue';
    return 'gray';
  };

  const getTypeIcon = (type) => {
    if (type === 'Research') return '🔬';
    if (type === 'Academic') return '🎓';
    if (type === 'Entrepreneurship') return '🚀';
    return '🏢';
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
        Affiliations
      </Heading>
      
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <VStack spacing={6} align="stretch">
          {affiliations.map((affiliation, idx) => (
            <MotionBox
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.01, x: 5, transition: { duration: 0.2 } }}
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
                  transition: 'all 0.3s ease'
                }}
                transition="all 0.3s ease"
              >
                <HStack spacing={4} align="flex-start">
                  <Box fontSize="3xl">
                    {getTypeIcon(affiliation.type)}
                  </Box>
                  
                  <VStack align="flex-start" spacing={2} flex={1}>
                    <Badge
                      colorScheme={getTypeColor(affiliation.type)}
                      fontSize="xs"
                      px={2}
                      py={1}
                      borderRadius="md"
                    >
                      {affiliation.type}
                    </Badge>
                    
                    <Text fontSize="lg" fontWeight="bold" color={roleColor}>
                      {affiliation.role}
                    </Text>
                    
                    <HStack spacing={2}>
                      {affiliation.url ? (
                        <Link 
                          href={affiliation.url} 
                          isExternal 
                          color="blue.500" 
                          fontWeight="semibold"
                          _hover={{ textDecoration: 'underline', color: 'blue.600' }}
                        >
                          {affiliation.organization} <Icon as={ExternalLinkIcon} mx="2px" boxSize={3} />
                        </Link>
                      ) : (
                        <Text fontWeight="semibold" color="gray.700" _dark={{ color: "gray.200" }}>
                          {affiliation.organization}
                        </Text>
                      )}
                    </HStack>

                    {affiliation.department && (
                       <Text fontSize="sm" color="gray.500">
                         {affiliation.department}
                       </Text>
                    )}
                    
                    <HStack spacing={1} fontSize="sm" color="gray.500" pt={1}>
                      <Text>📍</Text>
                      <Text>{affiliation.location}</Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Box>
            </MotionBox>
          ))}
        </VStack>
      </MotionBox>
    </Box>
  );
}