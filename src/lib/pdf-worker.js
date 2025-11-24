import * as pdfjsLib from "pdfjs-dist/build/pdf.js";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js";

export default pdfjsLib;
