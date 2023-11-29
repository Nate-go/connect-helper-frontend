import { useEffect } from "react";
import { redirect, useSearchParams, useNavigate } from "react-router-dom";
import { Panel, Carousel } from "rsuite";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {

        if (searchParams.has('code') && !searchParams.has('state')) {
            navigate('/signup?code=' + searchParams.get('code'));
            return;
        }

        if (searchParams.has('code') && searchParams.has('state')) {
            navigate('/signup-employee?code=' + searchParams.get('code') + "&state=" + searchParams.get('state'));
            return;
        }

        navigate('/dashboard');

    }, []);

    return (
        <div>
            <Panel>
                <Carousel autoplay className="custom-slider">
                    <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1" height="250" />
                    <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2" height="250" />
                    <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3" height="250" />
                    <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4" height="250" />
                    <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5" height="250" />
                </Carousel>
            </Panel>

        </div>
    )

}

export default Home