import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { Link, useParams } from "react-router-dom";
import { formatSimpleRelativeTime } from "../utils/formatSimpleRelaticeTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { useLike } from "../hooks/queries/useLike"; // 작성한 훅 임포트

const LpDetailPage = () => {
  const { lpid } = useParams();
  const lpIdNum = Number(lpid);
  
  const { data, isLoading, isError } = useGetLpDetail(lpIdNum);
  const { mutate: toggleLike } = useLike(); // 낙관적 업데이트 훅 선언

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // 내 유저 정보 조회와 좋아요 상태 판별을 유기적으로 결합
  useEffect(() => {
    if (!data?.data) return;

    setLikeCount(data.data.likes.length || 0);

    const checkLikeStatus = async () => {
      try {
        const response = await getMyInfo();
        const myUserId = response.data.id;
        
        const clickedBefore = data.data.likes.some((like: any) => like.userId === myUserId);
        setIsLiked(clickedBefore);
      } catch (error) {
        console.error("유저 정보를 가져오는데 실패했습니다.", error);
      }
    };

    checkLikeStatus();
  }, [data]);

  
  const handleLike = () => {
    if (!data?.data) return;

    // 1. 화면 UI 상태를 즉시 반전시킵니다 (사용자가 클릭하자마자 바로 바뀌게 느낌)
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

    // 2. 서버 및 리액트 쿼리 캐시 제어용 Mutation 출발
    toggleLike(
      { lpId: lpIdNum, isLiked: isLiked },
      {
        // 서버 통신 에러 등 돌발 상황 시 로컬 카운트 상태 수동 롤백 보장
        onError: () => {
          setIsLiked(isLiked);
          setLikeCount(data.data.likes.length || 0);
        },
      }
    );
  };

  if (isLoading) return <div className="text-white p-8">Loading...</div>;
  if (isError) return <div className="text-red-500 p-8">Error!</div>;

  return (
    <div className="w-full bg-[#353540] rounded mx-8 py-8 px-20 text-white">
      <div className="flex justify-between items-center">
        <span className="flex items-center">
          <img src={data?.data.author.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
          <span className="ml-2 text-lg font-semibold">{data?.data.author.name}</span>
        </span>
        <span className="text-sm text-gray-400">{formatSimpleRelativeTime(data?.data.createdAt)}</span>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h1 className="text-xl font-bold my-4">{data?.data.title}</h1>
        <span className="flex gap-2">
          <Link to={`/lp/${data?.data.id}/edit`}>
            <FontAwesomeIcon icon={faPencil} className="text-gray-300 hover:text-white transition-colors" />
          </Link>
          <Link to={`/lp/${data?.data.id}/delete`}>
            <FontAwesomeIcon icon={faTrash} className="text-gray-300 hover:text-red-400 transition-colors" />
          </Link>
        </span>
      </div>

      <div className="mx-auto w-128 h-128 bg-[#2d2d35] my-4 shadow-2xl rounded flex items-center justify-center relative overflow-hidden">
        <img
          src={data?.data.thumbnail}
          alt="thumbnail"
          className="w-96 h-96 object-cover rounded-full border-black border-4 animate-spin [animation-duration:10s]"
        />
        <div className="absolute w-20 h-20 bg-white rounded-full border-4 border-black shadow-inner"></div>
      </div>

      <p className="text-md mt-6 leading-relaxed text-gray-200">{data?.data.content}</p>

      <div className="flex gap-2 mt-4">
        {data?.data.tags.map((tag: any) => (
          <span key={tag.id} className="text-sm bg-zinc-700 text-gray-200 px-2 py-1 rounded">
            #{tag.name}
          </span>
        ))}
      </div>

      <span className="w-full flex justify-center mt-6">
        <button className="text-xl cursor-pointer flex items-center gap-2" onClick={handleLike}>
          <FontAwesomeIcon icon={faHeart} className={`transition-colors duration-200 ${isLiked ? "text-red-500" : "text-gray-400"}`} />
          <span className="text-sm font-medium">{likeCount}</span>
        </button>
      </span>

      <Link to={`/lp/${data?.data.id}/comments`} className="w-full flex justify-center mt-8 text-gray-400 hover:text-white transition-colors">
        <span>댓글 보러 가기 &gt;</span>
      </Link>
    </div>
  );
};

export default LpDetailPage;