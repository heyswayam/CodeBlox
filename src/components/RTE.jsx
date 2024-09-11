import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from 'react-hook-form';
import conf_env from "../conf_env/conf_env";
import { useSelector } from "react-redux";

export default function RTE({ name, control }) {
	const theme = useSelector((state) => state.theme.mode);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Editor
		apiKey={conf_env.tinyMCEId}
          onEditorChange={onChange}
          value={value}
          // initialValue={value}
          init={{
            skin: theme==="dark"?"oxide-dark":"oxide",
            height: 500,
            menubar: false,
            plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount"],
            toolbar: "undo redo | blocks | " + "bold italic forecolor | alignleft aligncenter " + "alignright alignjustify | bullist numlist outdent indent | " + "removeformat | help",
            content_style: "body { font-family: Helvetica, Arial, sans-serif; font-size: 15px; }",
            // content_style: "body { font-family: Helvetica, Arial, sans-serif; font-size: 15px; background-color: #2a3439; color: #ded7f4; }",
          }}
        />
      )}
    />
  );
}
