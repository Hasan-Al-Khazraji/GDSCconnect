import HackerForm from '../components/HackerForm';
import ResponsiveWrapper from '../components/ResponsiveWrapper';

export default function Landing() {
  const handleRedirect = (url: string) => {
    window.location.href = url;
  };

  return (
    <ResponsiveWrapper>
      <div className="flex flex-col items-center justify-center h-screen font-GoogleSansDisplay">
        <img src={require("../assets/images/GDSC_Hacks_Logo.png")} alt="Hello" className="max-w-full" />
        <h1 className="text-2xl font-bold mb-4">Scan QR Code or Enter A Hacker ID</h1>
        <HackerForm onRedirect={handleRedirect} />
      </div>
    </ResponsiveWrapper>
  );
}
