import { Form, useSearchParams } from "react-router";
export default function DateFilter({ onChange }) {
  return (
    <div className="flex flex-1 items-center justify-end gap-2">
      <label htmlFor="dateFilter">
        By date:
        <input
          className="ml-2 rounded-sm border border-gray-400 bg-white px-1 py-0.5"
          type="date"
          id="dateFilter"
          name="dateFilter"
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      <button
        className="tranisition-all text-2xs cursor-pointer rounded-sm bg-pink-600 px-2 py-1 text-white hover:opacity-60"
        type="button"
        onClick={() => onChange("")}
      >
        All dates
      </button>
    </div>
  );
}
