import { Client, Id, Storage } from "appwrite";
import conf_env from "../conf_env/conf_env";

class postService {
	// client = new Client()
	// databases
	constructor() {
		this.client = new Client().setEndpoint(conf_env.appwriteUrl).setProject(conf_env.projectId);

		this.databases = new Databases(client);

        this.storage = new Storage(client);
	}

	async createPost({ title, content, postImage, userId, status, slug }) {
		try {
			return await this.databases.listDocuments(
				conf_env.databaseId, // databaseId
				conf_env.colectionId, // collectionId
				slug, //slug is used as documentId
				{
					title,
					content,
					postImage,
					userId,
					status,
				} // queries 
			);
		} catch (error) {
			console.log("appwrite :: postConfig :: createPost :: error ::", error);
		}
	}
	async updatePost({ title, content, postImage, status, slug }) {   
        //userId was not taken in lecture since, the OP can only edit it
		try {
			return await this.databases.updateDocument(
				conf_env.databaseId, // databaseId
				conf_env.colectionId, // collectionId
				slug, //slug is used as documentId
				{
					title,
					content,
					postImage,
					status,
				} // queries 
			);
		} catch (error) {
			console.log("appwrite :: postConfig :: updatePost :: error ::", error);
		}
	}
	async deletePost({ slug }) {   
        //userId was not taken in lecture since, the OP can only edit it
		try {
			return await this.databases.updateDocument(
				conf_env.databaseId, // databaseId
				conf_env.colectionId, // collectionId
				slug, //slug is used as documentId
			);
		} catch (error) {
			console.log("appwrite :: postConfig :: deletePost :: error ::", error);
		}
	}
    async getPost({slug }) {   
        //userId was not taken in lecture since, the OP can only edit it
		try {
			return await this.databases.getDocument(
				conf_env.databaseId, // databaseId
				conf_env.colectionId, // collectionId
				slug, //slug is used as documentId
			);
		} catch (error) {
			console.log("appwrite :: postConfig :: getPost :: error ::", error);
		}
	}
    async listPosts() {   
        //userId was not taken in lecture since, the OP can only edit it
		try {
			return await this.databases.listDocuments(
				conf_env.databaseId, // databaseId
				conf_env.colectionId, // collectionId
                [Query.equal("status", ["Active"])]
			);
		} catch (error) {
			console.log("appwrite :: postConfig :: listPosts :: error ::", error);
		}
	}
    //file upload services
    async uploadFile({file}){
        try {
            return await this.storage.createFile(
                conf_env.bucketId, // bucketId
                Id.unique(), // fileId
                file
            )
		} catch (error) {
			console.log("appwrite :: postConfig :: uploadFile :: error ::", error);
		}
    }
    async deleteFile({fileId}){
        try {
            return await this.storage.createFile(
                conf_env.bucketId, // bucketId
                Id.unique(), // fileId
                file
            )
		} catch (error) {
			console.log("appwrite :: postConfig :: uploadFile :: error ::", error);
		}
    }
    async getFilePreview(fileId){
        try {
            return await this.storage.getFilePreview(
                conf_env.bucketId, // bucketId
                fileId
            )
		} catch (error) {
			console.log("appwrite :: postConfig :: uploadFile :: error ::", error);
		}
    }


}
const postService = new postService();
export default postService;