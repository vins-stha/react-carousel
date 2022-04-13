import './App.css';
import {useState, useEffect} from 'react'
import Carousel from 'react-elastic-carousel';
import {Navbar} from "./components/Navbar";
import {ImageCarousel} from "./components/Carousel";

function App() {

    const [data, setData] = useState([]);
    const [curCat, setCurCat] = useState();
    const [curCatName, setCurCatName] = useState();
    const [curCatImgs, setCurCatImgs] = useState([]);
    const [flip, setFlip] = useState(false);

    const [rotation, setRotation] = useState(0);
    const baseurl = "http://localhost:5000";

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(baseurl);
                const allData = await response.json();

                setData(allData);
                setCurCat(allData[1]);
                setCurCatName(allData[1]?.name);
                setCurCatImgs(allData[1]?.files);
            } catch (e) {
                console.log("Something went wrong", e);
            }
        }

        fetchData();

    }, []);

    const getNextCat = () => {
        setFlip(false);
        setRotation(0);
        let currentIndex = data.indexOf(data.find(dat => dat.name === curCatName))
        let nextIndex = currentIndex + 1;
        if (nextIndex < data.length) {
            setCurCat(data[nextIndex]);
            setCurCatName(data[nextIndex].name);
            setCurCatImgs(data[nextIndex]?.files);
            setFlip(false);
        } else
            alert('End')
    };

    const getPrevCat = () => {
        setFlip(false);
        setRotation(0);
        let currentIndex = data.indexOf(data.find(dat => dat.name === curCatName))
        let nextIndex = currentIndex - 1
        if (nextIndex > 0) {
            setCurCat(data[nextIndex])
            setCurCatName(data[nextIndex].name)
            setCurCatImgs(data[nextIndex]?.files)
        } else
            alert('End')
    };

    const rotate = () => {
        setFlip(true);
        let newRotation = rotation + 90;
        if (newRotation >= 360) {
            newRotation = 0;
        }
        setRotation(newRotation);
    };


    return (
        <div className="App">
            <header className="App-header">
                <Navbar getPrevCat={getPrevCat} getNextCat={getNextCat} curCatName={curCatName}/>

                <ImageCarousel baseurl={baseurl} curCatName={curCatName}
                               curCatImgs={curCatImgs} data={data}
                               rotate={rotate} rotation={rotation}
                />
            </header>
        </div>
    );
}

export default App;
