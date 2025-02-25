import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

const AboutPage = async () =>{
    const session = await getServerSession(authOptions);
      console.log(session); // Dapatkan session user
    return (
        <h1>About Page</h1>
    )
}

export default AboutPage