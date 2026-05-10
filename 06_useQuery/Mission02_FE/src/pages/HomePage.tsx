import { useState } from "react";
import { useGetLpList }  from "../hooks/queries/useGetLpList";

const HomePage = () => {
    const [search, setSearch] = useState("optio");
    const { data, isLoading, isError } = useGetLpList({search});
    return (<div>
        {data?.data.data.map((lp) => <h1>{lp.title}</h1>)}
    </div>)
};

export default HomePage;