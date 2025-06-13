import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Steps from '@/components/Steps';
import AudioExamples from '@/components/AudioExamples';
import TestimonialsSlider from '@/components/TestimonialsSlider';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Steps />
      <AudioExamples />
      <TestimonialsSlider />
    </>
  );
}
