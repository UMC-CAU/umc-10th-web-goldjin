import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { usePostLp } from "../hooks/queries/usePostLp";
import type { requestLpDto } from "../types/lp";
import { axiosInstance } from "../apis/axios";
import { useImageForm } from "../hooks/useImageForm";


export const CreateModal = ({setIsCreateModalOpen}: {setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const {mutate: postLp} = usePostLp();
  // 1. 필요한 요소를 react-hook-form에서 가져옵니다.
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<requestLpDto>({
        // 초기값 세팅 (선택사항이나 권장)
        defaultValues: {
        title: "",
        content: "",
        thumbnail: undefined,
        tags: [],
        published: true,
        },
    });

    const { previewUrl, uploadImage, imageUrl } = useImageForm({watch});
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    // 2. 이미지 미리보기 처리 (watch를 이용한 실시간 추적)


    // 3. 태그 추가 핸들러
    const handleAddTag = () => {
        const trimmed = tagInput.trim();
        if (!trimmed) return;
        if (tags.includes(trimmed)) return; // 중복 태그 방지
        setTags([...tags, trimmed]);
        setTagInput("");
    };

    const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, idx) => idx !== index));
    };


    // 5. 최종 제출 핸들러 (성공 시 모달까지 닫히도록 흐름 추가)
    const onSubmit: SubmitHandler<requestLpDto> = async (data) => {
        
        try {
            console.log(data.thumbnail);
            await uploadImage(); // 먼저 이미지를 업로드하여 imageUrl 상태가 최신이 되도록 합니다.
            const formData = {
            title: data.title,
            content: data.content,
            thumbnail: imageUrl as string, // 실제 File 객체
            tags: tags,
            published: true, // 기본값으로 true 설정 (필요에 따라 조정 가능)
            };
            console.log("서버로 보낼 최종 데이터:", formData);

            
            postLp(formData, {
                onSuccess: () => {
                    alert("LP가 성공적으로 등록되었습니다!");
                    setIsCreateModalOpen(false); // 모달 닫기
                }
            });
        } catch (error) {
            console.error("LP 등록 중 오류 발생:", error);
            alert("LP 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
        
    };

    return (
        // form 태그로 전체를 감싸서 표준 HTML 서브밋을 따르도록 구조를 잡았습니다.
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#151515] px-10 py-16 rounded-lg w-full max-w-md relative">
            
                <button className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
                onClick={() => setIsCreateModalOpen(false)}
                >
                X
                </button>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
                {/* 썸네일 업로드 구역 */}
                    <label htmlFor="file-upload"
                        className="cursor-pointer relative w-48 h-48 rounded-full overflow-hidden flex items-center justify-center">
                        <img src={previewUrl} className="w-full h-full object-cover"/>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register("thumbnail", {
                        required: "LP 커버 이미지는 필수입니다.",
                        })}
                    />
                    {errors.thumbnail && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.thumbnail.message}
                        </p>
                    )}

                    {/* LP Name 인풋 */}
                    <input
                        type="text"
                        placeholder="LP Name"
                        className="w-full p-2 my-4 rounded text-white bg-transparent border border-gray-300"
                        {...register("title", { required: "이름을 입력해주세요." })}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs mb-2 self-start">
                        {errors.title.message}
                        </p>
                    )}

                    {/* LP Content 인풋 */}
                    <input
                        type="text"
                        placeholder="LP Content"
                        className="w-full p-2 mb-4 rounded text-white bg-transparent border border-gray-300"
                        {...register("content", { required: "내용을 입력해주세요." })}
                    />
                    {errors.content && (
                        <p className="text-red-500 text-xs mb-2 self-start">
                        {errors.content.message}
                        </p>
                    )}

                    {/* 태그 등록 영역 */}
                    <div className="w-full flex justify-between items-center mb-2">
                        <input
                        type="text"
                        placeholder="LP Tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="w-full p-2 rounded text-white bg-transparent border border-gray-300"
                        />
                        <button
                        type="button"
                        className="ml-2 w-16 bg-gray-500 text-white p-2 rounded cursor-pointer"
                        onClick={handleAddTag}
                        >
                        Add
                        </button>
                    </div>

                    {/* 등록된 태그 목록 시각화 (기존 디자인 유지용) */}
                    {tags.length > 0 && (
                        <div className="w-full flex flex-wrap gap-1 mb-4">
                        {tags.map((tag, idx) => (
                            <span
                            key={idx}
                            className="bg-gray-700 text-white text-xs px-2 py-1 rounded"
                            >
                            #{tag}
                            <button type="button" className="ml-2 text-gray-300 hover:text-white text-xs" onClick={() => handleRemoveTag(idx)}>
                                x
                            </button>
                            </span>
                        ))}
                        </div>
                    )}

                    {/* 전체 제출 버튼 - type="submit"으로 변경 */}
                    <button
                        type="submit"
                        className="w-full bg-gray-500 text-white p-2 rounded mt-2 cursor-pointer"
                    >
                        Add LP
                    </button>
                </form>
            </div>
        </div>
    );
};