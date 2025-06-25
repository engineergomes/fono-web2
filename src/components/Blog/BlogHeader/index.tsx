'use client';
import { useWindow } from '@/hooks/useWindow';
import { Desktop } from './Desktop';
import { Mobile } from './Mobile';
import Container from '@/components/Container';

const BlogHeader = () => {
  const window = useWindow();
  return (
    <div className="fixed top-0 left-0 bg-paper bg-[#d9ecda] w-full z-40 shadow-md">
      <Container>{window.isMobile ? <Mobile /> : <Desktop />}</Container>
    </div>
  );
};

export default BlogHeader;
