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
  SimpleGrid
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export async function getStaticProps() {
  const res = await axios.get(`${process.env.API_BASE}/skills`);
  return { props: { skills: res.data } };
}

export default function Skills({ skills }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const categoryColor = useColorModeValue('blue.500', 'blue.300');
  const techBg = useColorModeValue('blue.50', 'blue.900');
  const techHoverBg = useColorModeValue('blue.100', 'blue.800');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Programming Languages': 'purple',
      'Database & ORM': 'blue',
      'Development Tools': 'green',
      'Methodologies': 'orange',
      'Deep Learning': 'pink'
    };
    return colors[category] || 'gray';
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
        Tools & Skills
      </Heading>
      
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {skills.map((category, idx) => (
            <MotionBox
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <Box
                bg={cardBg}
                p={6}
                borderRadius="lg"
                borderWidth="2px"
                borderColor={borderColor}
                boxShadow="md"
                _hover={{
                  boxShadow: 'xl',
                  bg: cardHoverBg,
                  borderColor: categoryColor,
                  transition: 'all 0.3s ease'
                }}
                transition="all 0.3s ease"
                height="100%"
              >
                <HStack spacing={3} mb={4}>
                  <Text fontSize="3xl" lineHeight="1">
                    {category.icon}
                  </Text>
                  <Badge
                    colorScheme={getCategoryColor(category.category)}
                    fontSize="md"
                    px={3}
                    py={1}
                    borderRadius="md"
                    fontWeight="bold"
                  >
                    {category.category}
                  </Badge>
                </HStack>
                
                <Divider my={3} />
                
                <VStack align="stretch" spacing={4}>
                  {category.items.map((item, itemIdx) => (
                    <Box key={itemIdx}>
                      <Text 
                        fontSize="md" 
                        fontWeight="semibold" 
                        mb={2}
                        color={categoryColor}
                      >
                        {item.name}
                      </Text>
                      <HStack spacing={2} flexWrap="wrap">
                        {item.technologies.map((tech, techIdx) => (
                          <MotionBox
                            key={techIdx}
                            variants={badgeVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Badge
                              bg={techBg}
                              color={categoryColor}
                              fontSize="xs"
                              px={3}
                              py={1}
                              borderRadius="full"
                              fontWeight="medium"
                              _hover={{
                                bg: techHoverBg,
                                transform: 'translateY(-2px)',
                                transition: 'all 0.2s ease'
                              }}
                              transition="all 0.2s ease"
                              cursor="default"
                            >
                              {tech}
                            </Badge>
                          </MotionBox>
                        ))}
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>
      </MotionBox>
    </Box>
  );
}
