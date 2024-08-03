


# CodeBlox

CodeBlox is a web application designed to inspire and connect writers. It allows users to write, share, and explore posts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/codeblox.git
    cd codeblox
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file based on `.env.sample` and configure your environment variables.

## Usage

To start the development server, run:
```
npm run dev
```

To build the project for production, run:
```sh
npm run build
```

To preview the production build, run:
```sh
npm run preview
```

## Project Structure

```
.
├── .vscode/
│   └── settings.json
├── public/
├── src/
│   ├── appwrite/
│   │   ├── authService.js
│   │   └── postService.js
│   ├── assets/
│   ├── components/
│   │   ├── AuthLayout.jsx
│   │   ├── Card.jsx
│   │   ├── Container.jsx
│   │   ├── Dropdown.jsx
│   │   ├── Error.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Input.jsx
│   │   ├── PostForm.jsx
│   │   ├── RTE.jsx
│   │   ├── ThemeBtn.jsx
│   │   └── index.js
│   ├── conf_env/
│   │   └── conf_env.js
│   ├── context/
│   ├── pages/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .env
├── .env.sample
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```


## Dependencies

- [`@reduxjs/toolkit`](command:_github.copilot.openSymbolFromReferences?%5B%22%40reduxjs%2Ftoolkit%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A12%2C%22character%22%3A5%7D%7D%5D%5D "Go to definition")
- [`@splinetool/react-spline`](command:_github.copilot.openSymbolFromReferences?%5B%22%40splinetool%2Freact-spline%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A13%2C%22character%22%3A5%7D%7D%5D%5D "Go to definition")
- [`@tinymce/tinymce-react`](command:_github.copilot.openSymbolFromReferences?%5B%22%40tinymce%2Ftinymce-react%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A14%2C%22character%22%3A5%7D%7D%5D%5D "Go to definition")
- [`alpinejs`](command:_github.copilot.openSymbolFromReferences?%5B%22alpinejs%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A15%2C%22character%22%3A5%7D%7D%5D%5D "Go to definition")
- [`appwrite`](command:_github.copilot.openSymbolFromReferences?%5B%22appwrite%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A16%2C%22character%22%3A5%7D%7D%2C%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fsrc%2Fcomponents%2FCard.jsx%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fsrc%2Fcomponents%2FCard.jsx%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fsrc%2Fcomponents%2FCard.jsx%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A2%2C%22character%22%3A28%7D%7D%5D%5D "Go to definition")
- [`fs-extra`](command:_github.copilot.openSymbolFromReferences?%5B%22fs-extra%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A17%2C%22character%22%3A5%7D%7D%5D%5D "Go to definition")
- [`html-react-parser`](command:_github.copilot.openSymbolFromReferences?%5B%22html-react-parser%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A18%2C%22character%22%3A5%7D%7D%5D%5D "Go to definition")
- [`lucide-react`](command:_github.copilot.openSymbolFromReferences?%5B%22lucide-react%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A19%2C%22character%22%3A5%7D%7D%5D%5D "Go to definition")
- [`react`](command:_github.copilot.openSymbolFromReferences?%5B%22react%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A13%2C%22character%22%3A17%7D%7D%2C%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fsrc%2Fcomponents%2FCard.jsx%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fsrc%2Fcomponents%2FCard.jsx%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fsrc%2Fcomponents%2FCard.jsx%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A0%2C%22character%22%3A44%7D%7D%2C%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fsrc%2Fpages%2FHome.jsx%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fsrc%2Fpages%2FHome.jsx%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fsrc%2Fpages%2FHome.jsx%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A0%2C%22character%22%3A32%7D%7D%5D%5D "Go to definition")
- [`react-dom`](command:_github.copilot.openSymbolFromReferences?%5B%22react-dom%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A21%2C%22character%22%3A5%7D%7D%5D%5D "Go to definition")
- [`react-hook-form`](command:_github.copilot.openSymbolFromReferences?%5B%22react-hook-form%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A22%2C%22character%22%3A5%7D%7D%5D%5D "Go to definition")
- [`react-redux`](command:_github.copilot.openSymbolFromReferences?%5B%22react-redux%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A23%2C%22character%22%3A5%7D%7D%5D%5D "Go to definition")
- [`react-router-dom`](command:_github.copilot.openSymbolFromReferences?%5B%22react-router-dom%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A24%2C%22character%22%3A5%7D%7D%2C%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fsrc%2Fcomponents%2FCard.jsx%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fsrc%2Fcomponents%2FCard.jsx%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fsrc%2Fcomponents%2FCard.jsx%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A1%2C%22character%22%3A22%7D%7D%5D%5D "Go to definition")
- [`react-spinners`](command:_github.copilot.openSymbolFromReferences?%5B%22react-spinners%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A25%2C%22character%22%3A5%7D%7D%5D%5D "Go to definition")
- [`tinymce`](command:_github.copilot.openSymbolFromReferences?%5B%22tinymce%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%2520Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22path%22%3A%22%2FUsers%2Fswayam%2FDocuments%2FProgramming%2FWeb%20Dev%2FReact%2FCodeBlox%2Fpackage.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A14%2C%22character%22%3A6%7D%7D%5D%5D "Go to definition")

## License

This project is licensed under the MIT License.
