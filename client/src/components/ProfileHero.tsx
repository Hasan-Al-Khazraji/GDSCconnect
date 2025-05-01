interface ProfileData {
    name: string;
    github: string;
    linkedin: string;
    school: string;
  }
  
  export default function ProfileHero({ profile }: { profile: ProfileData | null }) {
    if (!profile) {
        return <p>Profile data is not available.</p>;
    }

    const getLastPathSegment = (url: string) => url.substring(url.lastIndexOf('/') + 1);
    const get2LastPathSegment = (url: string) => {
        const trimmedUrl = url.endsWith('/') ? url.slice(0, -1) : url; 
        const parts = trimmedUrl.split('/');
        return parts.length > 1 ? parts[parts.length - 1] : '';
    };

    return (
        <div className="border-4 border-black mx-8 py-6 rounded-3xl flex flex-col items-center">
            <h1 className="text-center font-bold text-2xl font-google">{profile.name}</h1>
            <table className="flex flex-col gap-4 mt-4 font-medium text-xl">
                <tr className="flex items-center">
                    <td className="flex items-center">
                        <img src={require("../assets/images/Github.png")} alt="" className="w-10 mr-2" />
                    </td>
                    <td>
                        <a href={`${profile.github}`} target="_blank" rel="noopener noreferrer">
                            <h2>@{getLastPathSegment(profile.github)}</h2>
                        </a>                    
                    </td>
                </tr>
                <tr className="flex items-center">
                    <td className="flex items-center">
                        <img src={require("../assets/images/LinkedIn_logo.png")} alt="" className="w-10 mr-2 rounded-lg" />
                    </td>
                    <td>
                        <a href={`${profile.linkedin}`} target="_blank" rel="noopener noreferrer">
                            <h2>@{get2LastPathSegment(profile.linkedin)}</h2>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td className="flex items-center">
                        <img src={require("../assets/images/Grad.png")} alt="" className="w-10 mr-3 rounded-lg" />
                        <h2>{profile.school}</h2>
                    </td>
                </tr>
            </table>
        </div>
    );
}
  