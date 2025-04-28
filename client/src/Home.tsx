import { useParams } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {

    const { id } = useParams<{ id: string }>();
    const idString: string = id || "";
    console.log(id);
    const email = "";
    const strings = ["", "", "", ""];
    
    const updateUser = async () => {
      const userRef = doc(db, "users", idString);
    
      await updateDoc(userRef, {
        email: email,
        strings: strings,
      });
    
      console.log("Updated user", id);
    };
    
    return (
        <div>
        <h1>{id}</h1>
        <p>Welcome to the home page!</p>
        </div>
    );
    }