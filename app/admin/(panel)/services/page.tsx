"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Modal } from "@/components/admin/Modal";
import { BilingualInput } from "@/components/admin/BilingualInput";
import type { Service } from "@/lib/data-store";

const empty = {
  title: { ar: "", de: "" },
  description: { ar: "", de: "" },
  icon: "FiStar",
  order: 1,
};

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(empty);

  async function load() {
    const res = await fetch("/api/services");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm({ ...empty, order: items.length + 1 });
    setOpen(true);
  }

  function openEdit(item: Service) {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      icon: item.icon,
      order: item.order,
    });
    setOpen(true);
  }

  async function save() {
    const url = editing ? `/api/services/${editing.id}` : "/api/services";
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
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Services</h1>
          <p className="text-zinc-500">Manage service offerings</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium hover:bg-violet-500"
        >
          <FiPlus /> Add Service
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <p className="font-medium">{item.title.ar}</p>
            <p className="mt-1 text-sm text-zinc-500">{item.title.de}</p>
            <p className="mt-2 text-xs text-zinc-600">Icon: {item.icon}</p>
            <div className="mt-4 flex gap-2">
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
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Service" : "Add Service"}
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
            <label className="mb-1 block text-sm text-zinc-400">Icon (react-icons/fi name)</label>
            <input
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
              placeholder="FiCode"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Order</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            />
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
