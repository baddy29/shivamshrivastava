import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Container,
  useColorModeValue,
  Link,
  Icon,
  Divider,
  IconButton
} from '@chakra-ui/react';
import { ExternalLinkIcon, EmailIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';

// Cover images for swipeable carousel
const COVER_IMAGES = [
  '/images/nheri.jpeg',
  '/images/informs-1.jpeg',
  '/images/deterministic-split.png',
  '/images/Stochastic-Q-value.png',
  '/images/reward-event.png',
  '/images/informs-2.jpeg',
  '/images/yolo-pred.png',
];

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
  const { about, contact } = data || {};
  const [slideIndex, setSlideIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const goNext = useCallback(() => {
    setSlideIndex((i) => (i + 1) % COVER_IMAGES.length);
  }, []);
  const goPrev = useCallback(() => {
    setSlideIndex((i) => (i - 1 + COVER_IMAGES.length) % COVER_IMAGES.length);
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const t = setInterval(goNext, 5000);
    return () => clearInterval(t);
  }, [goNext]);

  const minSwipeDistance = 50;
  const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (touchStart == null || touchEnd == null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) goNext();
    else if (distance < -minSwipeDistance) goPrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <Box>
      {/* Swipeable Cover Carousel */}
      <Box
        position="relative"
        h={{ base: "220px", md: "300px" }}
        w="100%"
        overflow="hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url('${COVER_IMAGES[slideIndex]}')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
        </AnimatePresence>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          pointerEvents="none"
        >
          <Heading
            color="white"
            size={{ base: "xl", md: "2xl" }}
            textAlign="center"
          >
            Computer Vision and Reinforcement Learning Researcher
          </Heading>
        </Box>
        {/* Prev/Next buttons */}
        <IconButton
          aria-label="Previous slide"
          icon={<ChevronLeftIcon />}
          position="absolute"
          left={2}
          top="50%"
          transform="translateY(-50%)"
          variant="ghost"
          color="white"
          _hover={{ bg: 'whiteAlpha.300' }}
          onClick={goPrev}
          size="lg"
        />
        <IconButton
          aria-label="Next slide"
          icon={<ChevronRightIcon />}
          position="absolute"
          right={2}
          top="50%"
          transform="translateY(-50%)"
          variant="ghost"
          color="white"
          _hover={{ bg: 'whiteAlpha.300' }}
          onClick={goNext}
          size="lg"
        />
        {/* Dots */}
        <HStack
          position="absolute"
          bottom={3}
          left="50%"
          transform="translateX(-50%)"
          spacing={2}
        >
          {COVER_IMAGES.map((_, i) => (
            <Box
              key={i}
              w={2}
              h={2}
              borderRadius="full"
              bg={i === slideIndex ? 'white' : 'whiteAlpha.500'}
              cursor="pointer"
              onClick={() => setSlideIndex(i)}
            />
          ))}
        </HStack>
      </Box>

      <Container maxW="container.xl" py={10}>
        {/* About Me Section */}
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