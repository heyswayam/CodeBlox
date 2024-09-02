const conf_env = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    projectId: String(import.meta.env.VITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_DATABASE_ID),
    colectionId: String(import.meta.env.VITE_COLLECTION_ID),
    bucketId: String(import.meta.env.VITE_BUCKET_ID),
    tinyMCEId: String(import.meta.env.VITE_TINYMCE_ID),
    geminiApi: import.meta.env.VITE_GENAI_ID
}

export default conf_env;