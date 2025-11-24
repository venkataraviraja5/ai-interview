import pdf from "pdf-parse";

export const uploadService = async(req) => {
  
    const formData = await req.formData();
    const file = formData.get("resume");


    console.log(file,'.fileeeeeeeeeeeee')

    const buffer = Buffer.from(await file.arrayBuffer());

  // Extract text
  const pdfData = await pdf(buffer);

  console.log(pdfData.text, "PDF TEXT");

    return 'hllo'
}