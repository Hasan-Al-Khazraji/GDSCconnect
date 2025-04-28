import { useParams } from 'react-router-dom';

export default function Home() {

    const {id} = useParams<{ id: string }>();
    console.log(id);

    return (
        <div>
        <h1>{id}</h1>
        <p>Welcome to the home page!</p>
        </div>
    );
    }