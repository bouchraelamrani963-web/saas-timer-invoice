"use client";

import { useState } from "react";

interface LineItem {
  description: string;
  quantity: number;
  unitCents: number;
}

interface Invoice {
  id: string;
  clientName: string;
  items: LineItem[];
  issuedAt: string;
}

function totalCents(items: LineItem[]) {
  return items.reduce((sum, i) => sum + i.quantity * i.unitCents, 0);
}

function formatEuro(cents: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents / 100);
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [clientName, setClientName] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    { description: "", quantity: 1, unitCents: 0 },
  ]);

  function addItem() {
    setItems((prev) => [...prev, { description: "", quantity: 1, unitCents: 0 }]);
  }

  function updateItem(index: number, field: keyof LineItem, value: string) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]:
                field === "quantity" || field === "unitCents"
                  ? Number(value)
                  : value,
            }
          : item
      )
    );
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function handleCreate() {
    if (!clientName.trim() || items.length === 0) return;
    setInvoices((prev) => [
      {
        id: crypto.randomUUID(),
        clientName,
        items,
        issuedAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setClientName("");
    setItems([{ description: "", quantity: 1, unitCents: 0 }]);
    setShowForm(false);
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mt-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Facturen</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-blue-600 text-white text-sm rounded-xl px-4 py-2 font-semibold hover:bg-blue-700 transition-colors"
        >
          {showForm ? "Annuleer" : "+ Nieuwe factuur"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
              Klant
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Naam klant"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
              Regels
            </label>
            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Omschrijving"
                    value={item.description}
                    onChange={(e) => updateItem(i, "description", e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(i, "quantity", e.target.value)}
                    className="w-14 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="€"
                    value={item.unitCents / 100 || ""}
                    onChange={(e) =>
                      updateItem(i, "unitCents", String(Math.round(parseFloat(e.target.value || "0") * 100)))
                    }
                    className="w-20 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {items.length > 1 && (
                    <button onClick={() => removeItem(i)} className="text-gray-400 hover:text-red-500">
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addItem}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              + Regel toevoegen
            </button>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-sm font-semibold text-gray-700">
              Totaal: {formatEuro(totalCents(items))}
            </span>
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Aanmaken
            </button>
          </div>
        </div>
      )}

      {invoices.length === 0 && !showForm && (
        <p className="text-gray-400 text-sm text-center mt-12">Nog geen facturen.</p>
      )}

      <ul className="space-y-3">
        {invoices.map((inv) => (
          <li key={inv.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">{inv.clientName}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(inv.issuedAt).toLocaleDateString("nl-NL")}
                </p>
              </div>
              <p className="text-blue-600 font-bold">{formatEuro(totalCents(inv.items))}</p>
            </div>
            <ul className="mt-3 space-y-1">
              {inv.items.map((item, i) => (
                <li key={i} className="flex justify-between text-sm text-gray-600">
                  <span>{item.description} × {item.quantity}</span>
                  <span>{formatEuro(item.quantity * item.unitCents)}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
