import { useGetLpDetail } from "../hooks/queries/useGetLpDetail"
import { Link, useParams } from "react-router-dom"
import { formatSimpleRelativeTime } from "../utils/formatSimpleRelaticeTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { likeLp, unlikeLp } from "../apis/lp";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";

const LpDetailPage = () => {
    const [isLiked, setIsLiked] = useState(false);
    const { lpid } = useParams();
    const { data, isLoading, isError } = useGetLpDetail(Number(lpid));
    const [likeCount, setLikeCount] = useState(0);
    

    useEffect(() => {
        const getData = async () => {
                    try {
                        const response = await getMyInfo();
                        return response.data.id;
        
                    } catch (error) {
                        console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
                    }
                };
        
        const setLikeStatus = async () => {
            setLikeCount(data?.data.likes.length || 0);
            const userId = await getData();
            console.log(data?.data.likes, userId);
            if (data?.data.likes.some((like) => like.userId === userId)) {
                setIsLiked(true);
                console.log("좋아요 눌린 상태입니다.");
            }
        }
        
        setLikeStatus();
        
    },[data])

    const handleLike = async () => {
        if (isLiked) {
            try {
                await unlikeLp(Number(lpid));
                setLikeCount((prev) => prev - 1);
                setIsLiked(false);
            } catch (error) {
                console.error("좋아요 취소 중 오류가 발생했습니다.", error);
            }
            
        }
        else {
            try {
                await likeLp(Number(lpid));
                setLikeCount((prev) => prev + 1);
                setIsLiked(true);
            } catch (error) {
                console.error("좋아요 누르는 중 오류가 발생했습니다.", error);
            }
            
        }
        
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error!</div>;
    return (
        <div className="w-full bg-[#353540] rounded mx-8 py-8 px-20">
            <div className="flex justify-between items-center">
                <span className="flex justify-between items-center">
                    <img src={data?.data.author.avatar} alt="avatar" className="w-8 h-8 rounded-full"/>
                    <span className="ml-2 text-lg">{data?.data.author.name}</span>
                </span>
                <span className="text-sm">{formatSimpleRelativeTime(data?.data.createdAt)}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
                <h1 className="text-xl my-4">{data?.data.title}</h1>
                <span>
                    <Link to={`/lp/${data?.data.id}/edit`}>
                        <FontAwesomeIcon icon={faPencil} className="text-white"/>
                    </Link>
                    <Link to={`/lp/${data?.data.id}/delete`}>
                        <FontAwesomeIcon icon={faTrash} className="text-white ml-2"/>
                    </Link>

                </span>
            </div>
            <div className="mx-auto w-128 h-128 bg-[#353540] my-4 shadow-2xl rounded flex items-center justify-center">
                <img src={data?.data.thumbnail} alt="thumbnail" className="w-96 h-96 object-cover rounded-full border-black border-2 animate-spin"/>
                <div className="absolute w-24 h-24 bg-white rounded-full border-2 border-black"></div>
            </div>
            <p className="text-md">{data?.data.content}</p>
            <div className="flex gap-2 mt-4">
            {data?.data.tags.map((tag) => (
                <span key={tag.id} className="text-sm bg-gray-300 text-gray-800 px-2 py-1 rounded">
                    #{tag.name}
                </span>
            ))}
            </div>
    
            <span className="w-full flex justify-center mt-4">
                <button className="text-lg cursor-pointer" onClick={handleLike}>
                    <FontAwesomeIcon icon={faHeart} className={`${isLiked ? 'text-red-500' : 'text-white '}`}/>
                    {likeCount}
                </button>
            </span>
            <Link to={`/lp/${data?.data.id}/comments`} className="w-full flex justify-center mt-8 cursor-pointer">
                <span>댓글로 이동 &gt;</span>
            </Link>
        </div>
    )
}

export default LpDetailPage