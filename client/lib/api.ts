// export async function uploadAndSummarize(file: File) {
//   const formData = new FormData();
//   formData.append("file", file);

//   const response = await fetch("http://127.0.0.1:8000/upload", {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) throw new Error("Upload failed");
//   return await response.json();
// }


export async function uploadAndSummarize(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:8000/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return await response.json();
}
