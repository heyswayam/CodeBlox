const conf_env = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    projectId: String(import.meta.env.VITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_DATABASE_ID),
    colectionId: String(import.meta.env.VITE_COLLECTION_ID),
    bucketId: String(import.meta.env.VITE_BUCKET_ID),
    tinyMCEId: String(import.meta.env.VITE_TINYMCE_ID),
    geminiApi: String(import.meta.env.VITE_GENAI_ID)
}
console.log('Environment variables:', import.meta.env);
console.log('conf_env:', conf_env);
export default conf_env;