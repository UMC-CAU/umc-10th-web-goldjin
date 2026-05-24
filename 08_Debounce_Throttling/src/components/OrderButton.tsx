type buttonProps = {
    setOrder: any;
    order: "asc" | "desc";
}

export const OrderButton = ({ setOrder, order }: buttonProps) => {
    return (
        <div className="rounded-md">
            <button 
                className={`px-4 py-2 border text-sm border-white cursor-pointer transition-colors ${order === "desc" ? "bg-white text-black" : "text-white"}`} 
                onClick={() => setOrder("desc")}
            >
                최신순
            </button>
            <button 
                className={`px-4 py-2 border text-sm border-white cursor-pointer transition-colors  ${order === "asc" ? "bg-white text-black" : "text-white"}`} 
                onClick={() => setOrder("asc")}
            >
                오래된순
            </button>
        </div>
    )
}