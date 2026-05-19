"use client";

import { useState } from "react";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) onChange(data.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      {value && (
        <div className="relative h-32 w-full overflow-hidden rounded-lg">
          <Image src={value} alt="Preview" fill className="object-cover" />
        </div>
      )}
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/5 px-4 py-6 text-sm text-zinc-400 transition-colors hover:border-violet-500/50 hover:text-white">
        <FiUpload />
        {uploading ? "Uploading..." : "Upload image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-600"
      />
    </div>
  );
}
