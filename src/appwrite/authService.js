import { Client, Account, ID } from "appwrite";
import conf_env from "../conf_env/conf_env";


class AuthService {
    constructor() {
        this.client = new Client().setEndpoint(conf_env.appwriteUrl).setProject(conf_env.projectId);
        this.account = new Account(this.client);
    }

    async logout() {
        try {
            return await this.account.deleteSessions("current");
        } catch (error) {
            console.log("auth.js :: logout :: error " + error);
            throw error;
        }
    }

    async getCurrUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("auth.js :: getCurrUser :: error " + error);
            throw error;
        }
    }

    async passwordLessSignin(email) {
        try {
            const result = await this.account.createMagicURLToken(
				ID.unique(), // userId
				email, // email
                // "http://localhost:5173/redirecting" // url (optional)
                "https://codebloxapp.vercel.app/redirecting" // url (optional)
				// false // phrase (optional) // commenting this only works
			);
            // console.log("Magic URL session created:", result);
        } catch (error) {
            console.log("auth.js :: passwordLessSignin :: error " + error);
            throw error;
        }
    }

	async getPasswordlesstoken(){
		try {
			const urlParams = new URLSearchParams(window.location.search);
			console.log("urlParams: " + urlParams);
			
			const userId = urlParams.get("userId");
			const secret = urlParams.get("secret");
            
			// if (userId && secret) {
				const session = await this.account.createSession(userId, secret);
				// console.log("Session updated:", session);
				return session;
			// } else {
			// 	throw new Error("userId or secret not found in URL parameters");
			// }
		} catch (error) {
			console.log("auth.js :: getPasswordlesstoken :: error " + error);
            throw error;
		}

	}
}

const authService = new AuthService();
export default authService;