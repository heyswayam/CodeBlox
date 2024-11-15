import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import Prism from 'prismjs';
import conf_env from "../conf_env/conf_env";

// Import both themes
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/themes/prism-solarizedlight.css';

// Import core languages first
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';

// Import markup-templating (required for PHP)
import 'prismjs/components/prism-markup-templating';

// Import other languages
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-ruby';

// Import plugins
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/toolbar/prism-toolbar.css';

export default function RTE({ name, control, theme = "light" }) {
  useEffect(() => {
    // Re-highlight when theme changes
    Prism.highlightAll();
    
    // Toggle theme classes
    const preElements = document.querySelectorAll('pre[class*="language-"]');
    preElements.forEach(pre => {
      pre.classList.toggle('dark-theme', theme === 'dark');
      pre.classList.toggle('light-theme', theme === 'light');
    });
  }, [theme]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Editor
          apiKey={conf_env.tinyMCEId}
          onEditorChange={(content) => {
            onChange(content);
            // Rerun Prism highlighting after content change
            setTimeout(() => Prism.highlightAll(), 0);
          }}
          value={value}
          init={{
            skin: theme === "dark" ? "oxide-dark" : "oxide",
            height: 500,
            codesample_global_prismjs: true,
            menubar: true, // Enable menubar for more options
            plugins: [
              "advlist", "autolink", "lists", "link", "image", "charmap", 
              "preview", "anchor", "searchreplace", "visualblocks", 
              "code", "fullscreen", "insertdatetime", "media", "table", 
              "help", "wordcount", "codesample"
            ],
            toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | codesample | help',
            codesample_languages: [
              { text: "HTML/XML", value: "markup" },
              { text: "JavaScript", value: "javascript" },
              { text: "CSS", value: "css" },
              { text: "PHP", value: "php" },
              { text: "Ruby", value: "ruby" },
              { text: "Python", value: "python" },
              { text: "Java", value: "java" },
              { text: "C", value: "c" },
              { text: "C#", value: "csharp" },
              { text: "C++", value: "cpp" }
            ],
            content_style: `
              pre[class*="language-"] {
                margin: 1.5em 0;
                padding: 1em;
                border-radius: 0.3em;
              }
              
              pre[class*="language-"].dark-theme {
                background: #2d2d2d !important;
              }
              
              pre[class*="language-"].light-theme {
                background: #fdf6e3 !important;
              }
              
              .code-toolbar .toolbar {
                opacity: 0;
                transition: opacity 0.3s;
              }
              
              .code-toolbar:hover .toolbar {
                opacity: 1;
              }
            `,
            menu: {
              file: { title: 'File', items: 'newdocument restoredraft | preview | print' },
              edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
              insert: { title: 'Insert', items: 'link image codesample' }
            }
          }}
        />
      )}
    />
  );
}
