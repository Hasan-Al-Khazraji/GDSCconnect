import ProfileHero from "./ProfileHero";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom"; 

export default function ProfileContainer() {
    const { authUser } = useAuth();
    const { id } = useParams();
    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        const checkEmailMatch = async () => {
            if (authUser?.email && id) { 
                try {
                    const docRef = doc(db, "hackers", id); 
                    const snapshot = await getDoc(docRef);

                    if (snapshot.exists()) {
                        const data = snapshot.data();
                        if (data.email === authUser.email) {
                            setCanEdit(true);
                        } else {
                            setCanEdit(false);
                            console.log("Email does not match the one in the database.");
                        }
                    }
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                }
            }
        };

        checkEmailMatch();
    }, [authUser, id]); 

    return (
        <div className="border-4 border-black rounded-3xl mt-8">
            <div className="bg-black rounded-t-2xl">
                <img src={require("../assets/images/GDSC_Hacks_Logo.png")} alt="Hello" className="scale-90" />
            </div>
            <div className="bg-white rounded-b-2xl pt-8">
                <ProfileHero />
                <div className="flex items-center justify-between">
                    <img src={require("../assets/images/GDG_Watermark.png")} alt="Hello" className="w-24 p-3" />
                    {canEdit && (
                        <button className="bg-black text-white font-bold py-2 px-4 rounded-full ml-auto mr-4 hover:bg-gray-800 transition duration-300 ease-in-out">
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}