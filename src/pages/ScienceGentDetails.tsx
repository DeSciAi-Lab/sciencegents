
import { useParams } from 'react-router-dom';
import { useScienceGentDetails } from '@/hooks/useScienceGentDetails';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScienceGentDetailsDashboard from '@/components/sciencegent/ScienceGentDetailsDashboard';

const ScienceGentDetails = () => {
  const { address } = useParams<{ address: string }>();
  
  if (!address) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Invalid ScienceGent Address</h1>
            <p className="text-muted-foreground">
              Please provide a valid ScienceGent address in the URL.
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-6 md:py-12">
        <ScienceGentDetailsDashboard address={address} />
      </main>
      <Footer />
    </>
  );
};

export default ScienceGentDetails;
