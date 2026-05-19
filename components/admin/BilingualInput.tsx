"use client";

interface BilingualInputProps {
  label: string;
  valueAr: string;
  valueDe: string;
  onChangeAr: (v: string) => void;
  onChangeDe: (v: string) => void;
  multiline?: boolean;
}

const baseClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-600";

export function BilingualInput({
  label,
  valueAr,
  valueDe,
  onChangeAr,
  onChangeDe,
  multiline = false,
}: BilingualInputProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-zinc-300">{label}</p>
      <div>
        <label className="mb-1 block text-xs text-zinc-500">Arabic</label>
        {multiline ? (
          <textarea
            value={valueAr}
            onChange={(e) => onChangeAr(e.target.value)}
            className={baseClass}
            rows={3}
            dir="rtl"
          />
        ) : (
          <input
            value={valueAr}
            onChange={(e) => onChangeAr(e.target.value)}
            className={baseClass}
            dir="rtl"
          />
        )}
      </div>
      <div>
        <label className="mb-1 block text-xs text-zinc-500">German</label>
        {multiline ? (
          <textarea
            value={valueDe}
            onChange={(e) => onChangeDe(e.target.value)}
            className={baseClass}
            rows={3}
          />
        ) : (
          <input
            value={valueDe}
            onChange={(e) => onChangeDe(e.target.value)}
            className={baseClass}
          />
        )}
      </div>
    </div>
  );
}
