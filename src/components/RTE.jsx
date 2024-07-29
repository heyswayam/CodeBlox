import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from 'react-hook-form';
import conf_env from "../conf_env/conf_env";
export default function RTE({ name, control }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Editor
		apiKey={conf_env.tinyMCEId}
          onEditorChange={onChange}
          value={value}
          initialValue='
This is the initial content of the editor.
'
          init={{
            skin: "oxide-dark",
            height: 500,
            menubar: false,
            plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount"],
            toolbar: "undo redo | blocks | " + "bold italic forecolor | alignleft aligncenter " + "alignright alignjustify | bullist numlist outdent indent | " + "removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      )}
    />
  );
}
