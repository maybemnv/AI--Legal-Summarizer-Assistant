// import React, { useState } from "react";

// export default function UploadCourtCase() {
//   const [file, setFile] = useState<File | null>(null);
//   const [summary, setSummary] = useState<string | null>(null);
//   const [sources, setSources] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     setLoading(true);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/summarize", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       setSummary(data.summary);
//       setSources(data.sources);
//     } catch (error) {
//       console.error("Upload failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Upload Court Case PDF</h1>
//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={handleFileChange}
//         className="mb-4"
//       />
//       <button
//         onClick={handleUpload}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         disabled={loading}
//       >
//         {loading ? "Summarizing..." : "Upload and Summarize"}
//       </button>

//       {summary && (
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold">Summary</h2>
//           <p className="mt-2">{summary}</p>
//         </div>
//       )}

//       {sources.length > 0 && (
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold">Sources</h2>
//           <ul className="list-disc ml-5">
//             {sources.map((src, idx) => (
//               <li key={idx}>
//                 <strong>Page {src.page}:</strong> {src.text}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UploadCourtCase() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/summarize", {
        method: "POST",
        body: formData,
      });


      const data = await response.json();
      setSummary(data.summary);
      setSources(data.sources);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Court Case PDF</h1>

      <Input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />

      <Button onClick={handleUpload} disabled={loading}>
        {loading ? "Summarizing..." : "Upload and Summarize"}
      </Button>

      {summary && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p className="mt-2">{summary}</p>
        </div>
      )}

      {sources.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Sources</h2>
          <ul className="list-disc ml-5">
            {sources.map((src, idx) => (
              <li key={idx}>
                <strong>Page {src.page}:</strong> {src.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
