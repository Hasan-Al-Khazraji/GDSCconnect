import ResponsiveWrapper from '../components/ResponsiveWrapper';
import ProfileContainer from '../components/ProfileContainer';
import Header from '../components/Header';
import { AuthProvider } from '../Contexts/AuthContext';

export default function Home() {
    return (
        <>
        <AuthProvider  >
            <Header/>
            <ResponsiveWrapper>
                <ProfileContainer />
            </ResponsiveWrapper>
        </AuthProvider>
        </>
    );
    }