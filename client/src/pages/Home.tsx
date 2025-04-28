import { useParams } from 'react-router-dom';
import ResponsiveWrapper from '../components/ResponsiveWrapper';
import ProfileContainer from '../components/ProfileContainer';

export default function Home() {

    const {id} = useParams<{ id: string }>();
    console.log(id);

    return (
        <ResponsiveWrapper>
            <ProfileContainer />
        </ResponsiveWrapper>
    );
    }