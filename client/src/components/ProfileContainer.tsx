import ProfileHero from "./ProfileHero";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

export default function ProfileContainer() {
    const { authUser } = useAuth();
    const { id } = useParams();
    const [canEdit, setCanEdit] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [school, setSchool] = useState("");

    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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

        const fetchProfile = async () => {
            if (id) {
                try {
                    const docRef = doc(db, "hackers", id);
                    const snapshot = await getDoc(docRef);
        
                    if (snapshot.exists()) {
                        const data = snapshot.data();
                        if (data.profile && Array.isArray(data.profile)) {
                            setName(data.profile[0] || "");
                            setGithub(data.profile[1] || "");
                            setLinkedin(data.profile[2] || "");
                            setSchool(data.profile[3] || "");
                            setProfile({
                                name: data.profile[0] || "",
                                github: data.profile[1] || "",
                                linkedin: data.profile[2] || "",
                                school: data.profile[3] || "",
                            });
                        } else {
                            console.log("Profile data is not in the expected array format.");
                        }
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        checkEmailMatch();
        fetchProfile();
    }, [authUser, id]);

    const handleSaveChanges = async () => {
        if (id) {
            try {
                const docRef = doc(db, "hackers", id);
                await updateDoc(docRef, {
                    profile: [name, github, linkedin, school],
                });
                console.log("Profile updated successfully!");
                setIsEditing(false);
                window.location.href = `/${id}`; 
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;

    return (
        <div className="border-4 border-black rounded-3xl mt-8 font-GoogleSansDisplay shadow-[9px_7px_0px_2px_rgba(0,_0,_0,_0.1)]">
            <div className="bg-[#323234] rounded-t-2xl">
                <img src={require("../assets/images/GDSC_Hacks_Logo.png")} alt="Hello" className="scale-90" />
            </div>
            <div className="bg-white rounded-b-2xl pt-8 pb-2">
                <ProfileHero profile={profile} />
                <div className="flex items-center justify-between">
                    <img src={require("../assets/images/GDG_Watermark.png")} alt="Hello" className="w-24 p-3" />
                    {canEdit && (
                        <button
                            className={`text-white font-bold py-2 px-4 rounded-full ml-auto mr-4 transition duration-300 ease-in-out font-GoogleSansDisplay tracking-wide ${isEditing ? "bg-red-600 hover:bg-red-800" : "bg-[#323234] hover:bg-emerald-500"}`}
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </button>
                    )}
                </div>
                {isEditing && (
                    <div className="mt-4 px-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Link to GitHub"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                        />
                        <input
                            type="email"
                            placeholder="Link to LinkedIn"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                        />
                        <input
                            type="text"
                            placeholder="School Name"
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                        />
                        <button
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out mb-4 font-GoogleSansDisplay tracking-wide"
                            onClick={handleSaveChanges}
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}