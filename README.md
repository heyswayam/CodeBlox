
# Codeblox

CodeBlox is a feature-rich, responsive AI- powered blog platform designed to inspire and connect writers. It allows users to write, share, and explore posts.

## Features

- **Generative AI Integration**: Leveraged the Gemini API for AI-powered content generation.
- **Secure Authentication**: Supports both traditional and passwordless (magic URL) sign-in methods.
- **Responsive UI**: Fully responsive design with dark mode support.
- **Toast Notifications**: Integrated Sonner for user-friendly notifications.
- **Exceptional Performance**: Achieved a real experience score of 98 on Vercel Speed & Analytics.


## Tech Stack

**Frontend:** React, React Router, React Hook Form, Tailwind-CSS, TinyMCE, Sonner, React Spinners, Spline

**Backend:** Appwrite

**AI Integration:** Google Gemini API

## Demo
![demo_final](https://github.com/user-attachments/assets/9a34e7d1-017c-41f1-bf92-d0aadc48d59b)

## Run Locally
To run the CodeBlox project locally, follow these steps:

1. Clone the project

```bash
    git clone https://github.com/heyswayam/codeblox.git
    cd codeblox
```
2. Install dependencies

```bash
    npm install
```
3. Set Up Environment Variables
- Create a `.env` file in the root directory based on the provided `.env.sample` file.
 - Fill in the required environment variables in the `.env` file:
```bash
    VITE_APPWRITE_URL
    VITE_PROJECT_ID
    VITE_DATABASE_ID
    VITE_COLLECTION_ID
    VITE_BUCKET_ID
    VITE_TINYMCE_ID
    VITE_GENAI_ID
```
4. Start the server

```bash
  npm run dev
```
> **Note**: You need to create free accounts in [Appwrite](https://appwrite.io/), [Google Cloud Console](https://console.cloud.google.com/), and [TinyMCE](https://www.tiny.cloud/) to obtain the API keys.

