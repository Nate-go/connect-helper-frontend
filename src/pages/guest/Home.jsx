import { useEffect } from "react";
import { redirect, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.has('code')) {
            console.log(searchParams.get('state'));
            navigate('/signup?code=' + searchParams.get('code'));
        }
    }, [])

    return (
        <div>
            <h1>Home</h1><br />
            <h1>Home</h1><br />

            <h1>Home</h1><br />
            <h1>Home</h1><br />
            <h1>Home</h1><br />
            <h1>Home</h1><br />
            <h1>Home</h1><br />
            <h1>Home</h1><br />
            <h1>Home</h1><br />
            <h1>Home</h1><br />

        </div>
    )

}

export default Home