import HackerForm from '../components/HackerForm';

export default function Landing() {
  const handleRedirect = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Scan QR Code or Enter A Hacker ID</h1>
      <HackerForm onRedirect={handleRedirect} />
    </div>
  );
}
