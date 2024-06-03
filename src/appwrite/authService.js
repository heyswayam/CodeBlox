import { Client, Account, ID } from "appwrite";
import conf_env from "../conf_env/conf_env";

class AuthService {
	// client = new Client();
	// account;

	constructor() {
		this.client = new Client()
			.setEndpoint(conf_env.appwriteUrl)
			.setProject(conf_env.projectId);
		this.account = new Account(this.client);
	}

	async signUp({ email, password, name }) {
		try {
			const newAccount = await account.create(ID.unique(), email, password, name);
			return newAccount;
		} catch (error) {
			console.log("auth.js :: signUp :: error " + error);
			throw error;
		}
	}

	async signIn({ email, password }) {
		try {
			const newAccount = await account.createEmailPasswordSession(email, password);
			return newAccount;
		} catch (error) {
			console.log("auth.js :: signIn :: error " + error);
			throw error;
		}
	}
	async logout() {
		try {
			await this.account.deleteSessions();
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
}

const authService = new AuthService();
export default authService;
