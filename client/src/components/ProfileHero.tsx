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
        <div className="border-4 border-black mx-8 py-6 mb-6 rounded-3xl flex flex-col items-center shadow-[9px_7px_0px_0px_rgba(0,_0,_0,_0.1)]">
            <h1 className="text-center font-bold tracking-wide text-2xl font-GoogleSansDisplay">{profile.name}</h1>
            <table className="flex flex-col gap-4 mt-4 font-GoogleSansDisplay text-xl">
                <tr className="flex items-center">
                    <td className="flex items-center">
                        <img src={require("../assets/images/Github.png")} alt="Github" className="w-10 mr-2" />
                    </td>
                    <td>
                        <a href={`${profile.github}`} target="_blank" rel="noopener noreferrer" className="group transition duration-300 hover:cursor-pointer">
                            <h2>@{profile.github ? getLastPathSegment(profile.github) : "Github"}</h2>
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
                        </a>                    
                    </td>
                </tr>
                <tr className="flex items-center">
                    <td className="flex items-center">
                        <img src={require("../assets/images/LinkedIn_logo.png")} alt="LinkedIN" className="w-10 mr-2 rounded-lg" />
                    </td>
                    <td>
                        <a href={`${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="group transition duration-300 hover:cursor-pointer">
                            <h2>@{profile.linkedin ? get2LastPathSegment(profile.linkedin) : "LinkedIN"}</h2>
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td className="flex items-center">
                        <img src={require("../assets/images/Grad.png")} alt="University" className="w-10 mr-3 rounded-lg" />
                        <h2>{profile.school ? profile.school : "University"}</h2>
                    </td>
                </tr>
            </table>
        </div>
    );
}
  