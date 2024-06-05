import http from "@/utils/requestUtil";

export const getLink = () =>{
  return http.post("/api/selectLink");
}
export const upload = (file:File) =>{
  console.log(file)
  return http.post("/api/upload",
    {
      file: file,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
