"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Modal } from "@/components/admin/Modal";
import { BilingualInput } from "@/components/admin/BilingualInput";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { GalleryItem } from "@/lib/data-store";

const empty = {
  title: { ar: "", de: "" },
  image: "",
  category: "studio",
};

export default function AdminMediaPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState(empty);

  async function load() {
    const res = await fetch("/api/gallery");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  }

  function openEdit(item: GalleryItem) {
    setEditing(item);
    setForm({
      title: item.title,
      image: item.image,
      category: item.category,
    });
    setOpen(true);
  }

  async function save() {
    const url = editing ? `/api/gallery/${editing.id}` : "/api/gallery";
    const method = editing ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setOpen(false);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Media Gallery</h1>
          <p className="text-zinc-500">Manage gallery images</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium hover:bg-violet-500"
        >
          <FiPlus /> Add Image
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
          >
            <div className="relative aspect-video">
              <Image src={item.image} alt={item.title.ar} fill className="object-cover" />
            </div>
            <div className="p-4">
              <p className="font-medium">{item.title.ar}</p>
              <p className="text-xs text-zinc-500">{item.category}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="rounded p-2 hover:bg-white/10"
                >
                  <FiEdit2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="rounded p-2 text-red-400 hover:bg-red-500/10"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Image" : "Add Image"}
      >
        <div className="space-y-4">
          <BilingualInput
            label="Title"
            valueAr={form.title.ar}
            valueDe={form.title.de}
            onChangeAr={(v) => setForm({ ...form, title: { ...form.title, ar: v } })}
            onChangeDe={(v) => setForm({ ...form, title: { ...form.title, de: v } })}
          />
          <ImageUpload
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
          />
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              <option value="studio">Studio</option>
              <option value="events">Events</option>
            </select>
          </div>
          <button
            type="button"
            onClick={save}
            className="w-full rounded-lg bg-violet-600 py-3 font-medium hover:bg-violet-500"
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}
