import { useState } from "react";
import { axiosInstance } from "../apis/axios";

export const useImageForm = ({ watch }: { watch: any }) => {
  // 💡 업로드된 진짜 이미지 URL을 담아둘 string 상태 생성
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const thumbnailFile = watch("thumbnail");
  
  const previewUrl =
    thumbnailFile && thumbnailFile[0]
      ? URL.createObjectURL(thumbnailFile[0])
      : "/src/assets/lp.jpg";

  // 💡 이 함수는 내부적으로 비동기 처리를 하지만, 외부에 값을 return하지 않고 상태만 바꿉니다.
  const uploadImage = async () => {
    if (!thumbnailFile || !thumbnailFile[0]) return;

    const imageFormData = new FormData();
    imageFormData.append("file", thumbnailFile[0]);

    try {
      setIsUploading(true);
      const response = await axiosInstance.post("/v1/uploads", imageFormData);
      
      const serverUrl = response.data.data.imageUrl;
      setImageUrl(serverUrl); // 💡 받아온 string 주소를 상태에 저장!
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    previewUrl,
    imageUrl, // 👈 컴포넌트에서는 이 'string | null' 값을 그냥 가져다 씁니다.
    uploadImage,
    isUploading
  };
};