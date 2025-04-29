import ProfileHero from "./ProfileHero";

export default function ProfileContainer() {

    function colorLetters(str: string) {
        const colors = ['text-[#4285F4]', 'text-[#EA4335]', 'text-[#FBBC05]', 'text-[#34A853]'];
        let coloredStr = '';
        for (let i = 0; i < str.length; i++) {
            coloredStr += `<span class="${colors[i % colors.length]}">${str[i]}</span>`;
        }
        return coloredStr;
    }

    return (
        <div className="border-4 border-black rounded-3xl mt-8">
            <div className="bg-black rounded-t-2xl">
                <img src={require("../assets/images/GDSC_Hacks_Logo.png")} alt="Hello" className="scale-90" />
            </div>
            <div className="bg-white rounded-b-2xl pt-8">
                <ProfileHero />
                <img src={require("../assets/images/GDG_Watermark.png")} alt="Hello" className="w-24 p-3" />
            </div>
        </div>
    );
}