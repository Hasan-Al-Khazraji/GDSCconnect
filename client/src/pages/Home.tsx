import ResponsiveWrapper from '../components/ResponsiveWrapper';
import ProfileContainer from '../components/ProfileContainer';
import Header from '../components/Header';

export default function Home() {
    return (
        <ResponsiveWrapper>
            <Header />
            <ProfileContainer />
        </ResponsiveWrapper>
    );
    }