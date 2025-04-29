import { useState } from "react";

export default function Home() {
  const [deviceName, setDeviceName] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!deviceName.trim()) {
      setResult("장치명을 입력해주세요.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("https://ks-device-api.onrender.com/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceName }),
      });
      const data = await response.json();
      setResult(data.result || "결과가 없습니다.");
    } catch {
      setResult("서버와 통신할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-2">KS 장치 시험조건 검색</h1>
      <p className="text-gray-600 mb-6">KS 장치 시험 조건 안내</p>
      <div className="w-full max-w-md border p-6 rounded-xl shadow-md">
        <input
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="장치명을 입력하세요 (예: 에어컨)"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "검색 중..." : "시험 조건 검색"}
        </button>
        <div className="mt-6 text-gray-800 min-h-[60px]">{result}</div>
      </div>
    </div>
  );
}
