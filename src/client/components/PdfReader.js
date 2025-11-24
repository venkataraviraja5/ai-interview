// "use client";

// import { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// // WORKER FIX for Next.js Turbopack
// import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs";

// pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

// export default function PdfReader() {
//   const [text, setText] = useState("");

//   const handleFile = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const buffer = await file.arrayBuffer();
//     const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

//     let finalText = "";

//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const content = await page.getTextContent();
//       const strings = content.items.map((it) => it.str).join(" ");
//       finalText += strings + "\n";
//     }

//     setText(finalText);
//   };

//   return (
//     <div>
//       <input type="file" accept="application/pdf" onChange={handleFile} />
//       <pre style={{ whiteSpace: "pre-wrap", marginTop: 20 }}>{text}</pre>
//     </div>
//   );
// }
