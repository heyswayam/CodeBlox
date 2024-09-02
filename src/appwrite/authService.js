import { Client, Account, ID } from "appwrite";
import conf_env from "../conf_env/conf_env";

class AuthService {
	constructor() {
		this.client = new Client().setEndpoint(conf_env.appwriteUrl).setProject(conf_env.projectId);
		this.account = new Account(this.client);
	}
	async signUp({ email, password, name }) {
		try {
			const newAccount = await this.account.create(ID.unique(), email, password, name);
			return newAccount;
		} catch (error) {
			console.log("auth.js :: signUp :: error " + error);
			throw error;
		}
	}

	async signIn({ email, password }) {
		try {
			const newAccount = await this.account.createEmailPasswordSession(email, password);
			return newAccount;
		} catch (error) {
			console.log("auth.js :: signIn :: error " + error);
			throw error;
		}
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
			const url = window.location.hostname === 'localhost' ? "http://localhost:5173/redirecting" : "https://codebloxapp.vercel.app/redirecting";
			const result = await this.account.createMagicURLToken(
				ID.unique(), // userId
				email, // email
				url // url sets to localhost or vercel.app one
				// false // phrase (optional) // commenting this only works
			);
			// console.log("Magic URL session created:", result);
		} catch (error) {
			console.log("auth.js :: passwordLessSignin :: error " + error);
			throw error;
		}
	}

	async getPasswordlesstoken() {
		try {
			const urlParams = new URLSearchParams(window.location.search);
			// console.log("urlParams: " + urlParams);

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

	async updateName(name){
		try {
			await this.account.updateName(name);
		} catch (error) {
			console.log("auth.js :: updateName :: error " + error);
			throw error;
		}
	}
}

const authService = new AuthService();
export default authService;