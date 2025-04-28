export default function ProfileHero() {
    return (
        <div className="border-4 border-black mx-8 py-6 rounded-3xl flex flex-col items-center">
            <h1 className="text-center font-bold text-2xl font-google">First Last-Name</h1>
            <table className="flex flex-col gap-4 mt-4 font-medium text-xl">
                <tr className="flex items-center">
                    <td className="flex items-center">
                        <img src={require("../assets/images/Github.png")} alt="" className="w-10 mr-2"/>
                    </td>
                    <td>
                        <h2>@githubUsername</h2>
                    </td>
                </tr>
                <tr className="flex items-center">
                    <td className="flex items-center">
                        <img src={require("../assets/images/LinkedIn_logo.png")} alt="" className="w-10 mr-2 rounded-lg" />
                    </td>
                    <td>
                        <h2>@LinkedinURL</h2>
                    </td>
                </tr>
                <tr>
                    <td className="flex items-center">
                        <img src={require("../assets/images/Grad.png")} alt="" className="w-10 mr-3 rounded-lg"/>
                        <h2>Name of School</h2>
                    </td>
                </tr>
            </table>
        </div>
    )
}