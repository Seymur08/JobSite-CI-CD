import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Header'); // Düyməyə kliklədikdə "/about" səhifəsinə keç
    };

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={handleClick}>About səhifəsinə keç</button>
        </div>
    );
}

export default HomePage;
