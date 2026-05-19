"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Modal } from "@/components/admin/Modal";
import { BilingualInput } from "@/components/admin/BilingualInput";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Project } from "@/lib/data-store";

const empty = {
  title: { ar: "", de: "" },
  description: { ar: "", de: "" },
  category: "branding",
  image: "",
  featured: false,
};

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(empty);

  async function load() {
    const res = await fetch("/api/projects");
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

  function openEdit(item: Project) {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
      featured: item.featured,
    });
    setOpen(true);
  }

  async function save() {
    const url = editing ? `/api/projects/${editing.id}` : "/api/projects";
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
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-zinc-500">Manage portfolio projects</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium hover:bg-violet-500"
        >
          <FiPlus /> Add Project
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-zinc-400">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title (AR)</th>
              <th className="p-4">Category</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-white/5">
                <td className="p-4">
                  <div className="relative h-12 w-16 overflow-hidden rounded">
                    <Image src={item.image} alt="" fill className="object-cover" />
                  </div>
                </td>
                <td className="p-4">{item.title.ar}</td>
                <td className="p-4 text-zinc-500">{item.category}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(item)}
                      className="rounded p-2 hover:bg-white/10"
                      aria-label="Edit"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      className="rounded p-2 text-red-400 hover:bg-red-500/10"
                      aria-label="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Project" : "Add Project"}
      >
        <div className="space-y-4">
          <BilingualInput
            label="Title"
            valueAr={form.title.ar}
            valueDe={form.title.de}
            onChangeAr={(v) => setForm({ ...form, title: { ...form.title, ar: v } })}
            onChangeDe={(v) => setForm({ ...form, title: { ...form.title, de: v } })}
          />
          <BilingualInput
            label="Description"
            valueAr={form.description.ar}
            valueDe={form.description.de}
            onChangeAr={(v) =>
              setForm({ ...form, description: { ...form.description, ar: v } })
            }
            onChangeDe={(v) =>
              setForm({ ...form, description: { ...form.description, de: v } })
            }
            multiline
          />
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              <option value="branding">Branding</option>
              <option value="web">Web</option>
              <option value="campaign">Campaign</option>
            </select>
          </div>
          <ImageUpload
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured
          </label>
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
