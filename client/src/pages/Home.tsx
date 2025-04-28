import { useParams } from 'react-router-dom';
import ResponsiveWrapper from '../components/ResponsiveWrapper';

export default function Home() {

    const {id} = useParams<{ id: string }>();
    console.log(id);

    return (
        <ResponsiveWrapper>
            <h1 className="text-3xl font-bold underline text-center">Hello world!</h1>
            <p className="text-center">This is a simple example of a responsive wrapper component.</p>
            <p className="text-center">The id from the URL is: {id}</p>
        </ResponsiveWrapper>
    );
    }