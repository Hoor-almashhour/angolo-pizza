"use client";

import { useEffect, useState } from "react";
import { BilingualInput } from "@/components/admin/BilingualInput";
import type { SiteSettings } from "@/lib/data-store";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings);
  }, []);

  async function save() {
    if (!settings) return;
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!settings) {
    return <p className="text-zinc-500">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="text-zinc-500">Site-wide configuration</p>

      <div className="mt-8 max-w-lg space-y-6">
        <BilingualInput
          label="Site Name"
          valueAr={settings.siteName.ar}
          valueDe={settings.siteName.de}
          onChangeAr={(v) =>
            setSettings({ ...settings, siteName: { ...settings.siteName, ar: v } })
          }
          onChangeDe={(v) =>
            setSettings({ ...settings, siteName: { ...settings.siteName, de: v } })
          }
        />
        <BilingualInput
          label="Tagline"
          valueAr={settings.tagline.ar}
          valueDe={settings.tagline.de}
          onChangeAr={(v) =>
            setSettings({ ...settings, tagline: { ...settings.tagline, ar: v } })
          }
          onChangeDe={(v) =>
            setSettings({ ...settings, tagline: { ...settings.tagline, de: v } })
          }
        />
        <div>
          <label className="mb-1 block text-sm text-zinc-400">Email</label>
          <input
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-400">Phone</label>
          <input
            value={settings.phone}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
          />
        </div>
        <BilingualInput
          label="Address"
          valueAr={settings.address.ar}
          valueDe={settings.address.de}
          onChangeAr={(v) =>
            setSettings({ ...settings, address: { ...settings.address, ar: v } })
          }
          onChangeDe={(v) =>
            setSettings({ ...settings, address: { ...settings.address, de: v } })
          }
        />
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-violet-600 px-6 py-3 font-medium hover:bg-violet-500 disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
