"use client"
import React, { useEffect, useState } from "react";
import EditorToolbar, { modules, formats } from "@/components/editor/Toolbar";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type EditorProps = {
    id: string
    value: string | undefined | null,
    onValueChange(value: string): void
}

export const Editor = ({ id, value, onValueChange }: EditorProps) => {
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    if (!editorLoaded) {
        return <p>Loading...</p>;
    }

    return (
        id && (
            <div>
                <EditorToolbar id={id} />
                <ReactQuill
                    id={id}
                    theme="snow"
                    value={value || ""}
                    onChange={onValueChange}
                    placeholder="Write your question..."
                    modules={modules(id)}
                    formats={formats}
                />
            </div>
        )
    );
};

export default Editor;
