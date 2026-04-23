"use client";

import { useMemo, useState } from "react";

type Vibe = "casual" | "formal" | "streetwear" | "party";
type ItemCategory = "pants" | "shoes" | "accessories";

type MatchItem = {
  label: string;
  hex: string;
  vibes: Vibe[];
  categories: ItemCategory[];
};

type ColorPreset = {
  id: string;
  label: string;
  hex: string;
};

type MatchDictionary = Record<string, MatchItem[]>;

const colorPresets: ColorPreset[] = [
  { id: "olive", label: "Olive Green", hex: "#556B2F" },
  { id: "navy", label: "Navy", hex: "#1D3557" },
  { id: "black", label: "Black", hex: "#111111" },
  { id: "beige", label: "Beige", hex: "#D8C3A5" },
  { id: "white", label: "White", hex: "#F8F9FA" },
  { id: "maroon", label: "Maroon", hex: "#800020" },
];

const outfitMatches: MatchDictionary = {
  olive: [
    { label: "White", hex: "#FFFFFF", vibes: ["casual", "formal"], categories: ["pants"] },
    { label: "Beige", hex: "#D8C3A5", vibes: ["casual", "formal"], categories: ["pants"] },
    { label: "Black", hex: "#1C1C1C", vibes: ["formal", "party"], categories: ["pants", "shoes"] },
    { label: "Light Blue Denim", hex: "#9FC3DF", vibes: ["casual", "streetwear"], categories: ["pants"] },
    { label: "Brown", hex: "#7A4A2A", vibes: ["casual", "formal"], categories: ["shoes", "accessories"] },
  ],
  navy: [
    { label: "White", hex: "#FFFFFF", vibes: ["casual", "formal"], categories: ["pants"] },
    { label: "Khaki", hex: "#C3B091", vibes: ["casual", "formal"], categories: ["pants"] },
    { label: "Grey", hex: "#B0B7C3", vibes: ["formal", "streetwear"], categories: ["pants", "accessories"] },
    { label: "Tan", hex: "#C19A6B", vibes: ["casual"], categories: ["shoes"] },
    { label: "Burgundy", hex: "#7D1128", vibes: ["party"], categories: ["accessories"] },
  ],
  black: [
    { label: "Charcoal", hex: "#36454F", vibes: ["formal", "party"], categories: ["pants"] },
    { label: "White", hex: "#F2F2F2", vibes: ["casual", "formal"], categories: ["pants", "shoes"] },
    { label: "Olive", hex: "#556B2F", vibes: ["streetwear", "casual"], categories: ["pants", "accessories"] },
    { label: "Silver", hex: "#BDC3C7", vibes: ["party", "formal"], categories: ["accessories"] },
    { label: "Camel", hex: "#C19A6B", vibes: ["casual"], categories: ["shoes"] },
  ],
  beige: [
    { label: "White", hex: "#FFFFFF", vibes: ["casual", "formal"], categories: ["pants", "shoes"] },
    { label: "Navy", hex: "#1D3557", vibes: ["formal", "party"], categories: ["pants", "accessories"] },
    { label: "Olive", hex: "#556B2F", vibes: ["casual", "streetwear"], categories: ["pants"] },
    { label: "Chocolate Brown", hex: "#5C3A21", vibes: ["formal", "casual"], categories: ["shoes"] },
    { label: "Gold", hex: "#D4AF37", vibes: ["party"], categories: ["accessories"] },
  ],
  white: [
    { label: "Navy", hex: "#1D3557", vibes: ["formal", "casual"], categories: ["pants"] },
    { label: "Black", hex: "#111111", vibes: ["formal", "party"], categories: ["pants", "shoes"] },
    { label: "Olive", hex: "#556B2F", vibes: ["casual", "streetwear"], categories: ["pants"] },
    { label: "Denim Blue", hex: "#5B84B1", vibes: ["casual"], categories: ["pants"] },
    { label: "Tan", hex: "#C19A6B", vibes: ["casual", "formal"], categories: ["shoes", "accessories"] },
  ],
  maroon: [
    { label: "Black", hex: "#111111", vibes: ["formal", "party"], categories: ["pants", "shoes"] },
    { label: "Charcoal Grey", hex: "#4A4A4A", vibes: ["formal"], categories: ["pants"] },
    { label: "Beige", hex: "#D8C3A5", vibes: ["casual"], categories: ["pants"] },
    { label: "White", hex: "#FFFFFF", vibes: ["party", "casual"], categories: ["accessories"] },
    { label: "Dark Brown", hex: "#4E342E", vibes: ["formal", "casual"], categories: ["shoes"] },
  ],
};

function getContrastingText(hex: string) {
  const normalized = hex.replace("#", "");
  const full = normalized.length === 3
    ? normalized
        .split("")
        .map((char) => `${char}${char}`)
        .join("")
    : normalized;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#111111" : "#FFFFFF";
}

function createCustomMatches(hex: string): MatchItem[] {
  return [
    { label: "White", hex: "#FFFFFF", vibes: ["casual", "formal"], categories: ["pants", "shoes"] },
    { label: "Black", hex: "#111111", vibes: ["formal", "party"], categories: ["pants", "shoes"] },
    { label: "Beige", hex: "#D8C3A5", vibes: ["casual", "formal"], categories: ["pants"] },
    { label: "Grey", hex: "#9DA3A8", vibes: ["formal", "streetwear"], categories: ["pants", "accessories"] },
    { label: "Brown Leather", hex: "#7A4A2A", vibes: ["casual", "formal"], categories: ["shoes", "accessories"] },
    { label: "Same-Tone Accent", hex, vibes: ["streetwear", "party"], categories: ["accessories"] },
  ];
}

export default function Home() {
  const [selectedColorId, setSelectedColorId] = useState("olive");
  const [selectedVibe, setSelectedVibe] = useState<Vibe>("casual");
  const [customHex, setCustomHex] = useState("#556B2F");
  const [useCustomColor, setUseCustomColor] = useState(false);

  const selectedPreset = colorPresets.find((preset) => preset.id === selectedColorId) ?? colorPresets[0];
  const shirtColor = useCustomColor ? customHex : selectedPreset.hex;
  const shirtLabel = useCustomColor ? "Custom color" : selectedPreset.label;

  const matches = useMemo(() => {
    const source = useCustomColor ? createCustomMatches(customHex) : outfitMatches[selectedColorId] ?? [];
    return source.filter((item) => item.vibes.includes(selectedVibe));
  }, [selectedColorId, selectedVibe, customHex, useCustomColor]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">ColorFit</p>
          <h1 className="mt-2 text-2xl font-bold text-white sm:text-4xl">Outfit Color Match Assistant</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
            Pick a shirt color, choose the vibe, and get visual color combinations for pants, shoes, and accessories.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold text-white">1) Select shirt color</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setUseCustomColor(false);
                    setSelectedColorId(preset.id);
                  }}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${
                    !useCustomColor && selectedColorId === preset.id
                      ? "border-lime-300 bg-lime-100/10 text-lime-200"
                      : "border-slate-700 bg-slate-800 text-slate-200 hover:border-slate-500"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-slate-700 bg-slate-800 p-3">
              <label className="flex items-center justify-between gap-3 text-sm text-slate-200">
                Use custom HEX
                <input
                  type="checkbox"
                  checked={useCustomColor}
                  onChange={(event) => setUseCustomColor(event.target.checked)}
                  className="h-4 w-4 accent-lime-400"
                />
              </label>
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="color"
                  value={customHex}
                  onChange={(event) => setCustomHex(event.target.value)}
                  aria-label="Pick custom shirt color"
                  className="h-10 w-14 cursor-pointer rounded border border-slate-700 bg-transparent"
                />
                <input
                  type="text"
                  value={customHex}
                  onChange={(event) => setCustomHex(event.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm uppercase"
                  placeholder="#556B2F"
                />
              </div>
            </div>

            <h2 className="mt-6 text-lg font-semibold text-white">2) Choose vibe</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(["casual", "formal", "streetwear", "party"] as Vibe[]).map((vibe) => (
                <button
                  key={vibe}
                  type="button"
                  onClick={() => setSelectedVibe(vibe)}
                  className={`rounded-lg border px-3 py-2 text-sm capitalize transition ${
                    selectedVibe === vibe
                      ? "border-cyan-300 bg-cyan-200/10 text-cyan-100"
                      : "border-slate-700 bg-slate-800 text-slate-200 hover:border-slate-500"
                  }`}
                >
                  {vibe}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold text-white">3) Recommended combinations</h2>
            <p className="mt-1 text-sm text-slate-300">
              Shirt: <span className="font-medium text-white">{shirtLabel}</span> for{" "}
              <span className="capitalize text-cyan-200">{selectedVibe}</span> style
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {matches.map((match) => (
                <article key={`${match.label}-${match.hex}`} className="rounded-xl border border-slate-700 bg-slate-800 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Outfit card</span>
                    <span className="rounded-full border border-slate-600 px-2 py-0.5 text-xs text-slate-200">
                      {match.categories.join(" + ")}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-2">
                    <div className="flex items-center gap-3 rounded-lg border border-slate-700 p-2">
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-xs font-semibold"
                        style={{ backgroundColor: shirtColor, color: getContrastingText(shirtColor) }}
                      >
                        S
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">Shirt</p>
                        <p className="text-xs text-slate-300">{shirtLabel}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-slate-700 p-2">
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-xs font-semibold"
                        style={{ backgroundColor: match.hex, color: getContrastingText(match.hex) }}
                      >
                        M
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{match.label}</p>
                        <p className="text-xs text-slate-300">Match color</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
