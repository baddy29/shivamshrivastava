import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../components/Layout';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.pathname}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          style={{ width: '100%' }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}