import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useImageForm } from "../hooks/useImageForm";
import { useUpdateProfile } from "../hooks/queries/useUpdateProfile";

interface EditProfileFormInput {
  name: string;
  bio?: string;
  avatar?: FileList; // 파일 인풋은 FileList 타입으로 처리됩니다.
}

export const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // 💡 이미지를 완전히 삭제했는지 추적하는 상태값
  const [isAvatarDeleted, setIsAvatarDeleted] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // 1. 필요한 함수들(handleSubmit, setValue, reset) 추가 추출
  const { register, watch, handleSubmit, setValue, reset } = useForm<EditProfileFormInput>();

  // 2. 작성하신 useImageForm 훅 사용
  const { previewUrl, uploadImage, imageUrl } = useImageForm({ watch });
  const { mutate: postEditProfile } = useUpdateProfile();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
      }
    };
    getData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleEditProfile = () => {
    // 3. 수정 모드 진입 시 기존 폼 값을 react-hook-form에 동기화
    if (data) {
      reset({
        name: data.data.name,
        bio: data.data.bio || "",
      });
    }
    setIsAvatarDeleted(false); // 삭제 플래그 초기화
    setIsEditing(true);
  };

  // 💡 [프로필 이미지 없애기] 버튼 클릭 핸들러
  const handleRemoveAvatar = () => {
    setIsAvatarDeleted(true);
    setValue("avatar", undefined); // 훅 폼 안의 파일 데이터도 청소해 줍니다.
  };

  // 4. [저장하기] 클릭 시 실행될 최종 제출 로직
  const handleSaveProfile: SubmitHandler<EditProfileFormInput> = async (formData) => {
    await uploadImage(); // 먼저 이미지를 업로드하여 imageUrl 상태가 최신이 되도록 합니다.
    const finalPayload = {
      name: formData.name,
      bio: formData.bio,
      // 💡 없애기를 눌렀으면 null, 새 이미지가 있다면 파일 객체, 없다면 기존 아바타 주소 유지
      avatar: isAvatarDeleted ? undefined : imageUrl || data?.data.avatar,
    };

    console.log("서버로 보낼 최종 프로필 데이터:", finalPayload);
    
    postEditProfile(finalPayload, {
      onSuccess: () => {
        alert("프로필이 성공적으로 업데이트되었습니다!");
        setIsEditing(false);
      },
      onError: (error) => {
        alert("프로필 업데이트에 실패했습니다.");
      }
    });
  };

  // 5. 렌더링할 최종 이미지 소스(src) 판별
  // 이미지 없애기를 눌렀다면 기본 대체 이미지(없을 시 빈값), 그 외엔 미리보기 혹은 기존 아바타 주소 사용
  const currentAvatarSrc = isAvatarDeleted 
    ? "/src/assets/default-avatar.png" // 💡 프로젝트의 기본 프로필 이미지 경로가 있다면 맞춰주세요
    : previewUrl || data?.data.avatar;

  return (
    <div>
      <div className="flex items-center mt-16">
        {isEditing ? (
          <>
            {/* 💡 이미지와 없애기 버튼을 한 덩어리로 묶어 세로 정렬 */}
            <div className="flex flex-col items-center mr-4">
              <label htmlFor="profileImage" className="cursor-pointer">
                <img src={currentAvatarSrc} alt="프로필 이미지" className="w-24 h-24 rounded-full object-cover" />
                <input id="profileImage" type="file" accept="image/*" className="hidden" {...register("avatar")} />
              </label>
              
              {/* 💡 요청하신 이미지 없애기 버튼 추가 */}
              <button 
                type="button"
                onClick={handleRemoveAvatar}
                className="mt-2 text-xs text-red-400 hover:underline cursor-pointer"
              >
                이미지 없애기
              </button>
            </div>

            <div className="ml-8 flex flex-col">
              <input type="text" className="h-12 text-[32px] mb-2 border border-gray-300 rounded text-white px-2" {...register("name")} />
              <input type="text" className="h-8 mb-2 border border-gray-300 rounded text-white px-2" {...register("bio")} />
              <p className="h-8 mb-2 flex items-center text-gray-500">{data?.data.email}</p>
            </div>
          </>
        ) : (
          <>
            <img src={currentAvatarSrc} alt="프로필 이미지" className="w-24 h-24 rounded-full object-cover mr-4" />
            <div className="ml-8 flex flex-col">
              <p className="h-12 text-[32px] mb-2 font-bold">{data?.data.name}</p>
              <p className="h-8 mb-2 text-gray-300">{data?.data.bio || "상태메시지가 없습니다."}</p>
              <p className="h-8 mb-2 text-gray-500">{data?.data.email}</p>
            </div>
          </>
        )}
      </div>
      <div>
        {isEditing ? (
          <>
            {/* 💡 handleSubmit을 연결하여 클릭 시 유효성 검사 후 함수가 돌도록 변경 */}
            <button onClick={handleSubmit(handleSaveProfile)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
              저장하기
            </button>
            <button onClick={() => setIsEditing(false)} className="mt-4 ml-2 px-4 py-2 bg-zinc-600 text-white rounded cursor-pointer">
              취소
            </button>
          </>
        ) : (
          <button onClick={handleEditProfile} className="mt-4 px-4 py-2 bg-green-700 text-white rounded cursor-pointer">
            정보 수정하기
          </button>
        )}
        <button onClick={handleLogout} className="mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded cursor-pointer">
          로그아웃
        </button>
      </div>
    </div>
  );
};