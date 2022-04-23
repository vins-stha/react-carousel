import './App.css';
import {useState, useEffect} from 'react'
import {Navbar} from "./components/Navbar";
import {ImageCarousel} from "./components/Carousel";

function App() {

    const [data, setData] = useState([]);
    const [curCat, setCurCat] = useState();
    const [curCatName, setCurCatName] = useState();
    const [curCatImgs, setCurCatImgs] = useState([]);
    const [curImg, setCurImg] = useState();
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
                console.log(allData)
                setCurCatName(allData[1]?.name);
                setCurCatImgs(allData[1]?.files.sort());

                setCurImg(allData[1]?.files[0]);

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

        console.log('currentIndex',currentIndex, 'next', nextIndex)

        if (nextIndex < data.length) {
            setCurCat(data[nextIndex]);
            setCurCatName(data[nextIndex].name);
            setCurCatImgs(data[nextIndex]?.files.sort());
            setCurImg(data[nextIndex]?.files[0]);

            setFlip(false);
        } else
            alert('End')
    };

    const getPrevCat = () => {
        setFlip(false);
        setRotation(0);
        let currentIndex = data.indexOf(data.find(dat => dat.name === curCatName));
        let nextIndex = currentIndex - 1;
        console.log('currentIndex',currentIndex, 'next', nextIndex);

        if (nextIndex > 0) {
            setCurCat(data[nextIndex]);
            setCurCatName(data[nextIndex].name);
            setCurCatImgs(data[nextIndex]?.files.sort());
            setCurImg(data[nextIndex]?.files[0]);

        } else
            alert('End')
    };

    const getNextImg = () => {
        setFlip(false);
        setRotation(0);
        let currentIndex = curCatImgs.indexOf(curCatImgs.find(img => img === curImg));
        let nextIndex = currentIndex + 1;

        if (nextIndex < curCatImgs.length) {
            setCurImg(curCatImgs[nextIndex]);

        } else
            alert('End')
    };

    const getPrevImg = () => {
        setFlip(false);
        setRotation(0);
        let currentIndex = curCatImgs.indexOf(curCatImgs.find(img => img === curImg));
        let nextIndex = currentIndex - 1;

        if (nextIndex >= 0) {
            setCurImg(curCatImgs[nextIndex]);

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

                <ImageCarousel
                    baseurl={baseurl} curCatName={curCatName} curCatImgs={curCatImgs} data={data}
                    curImg={curImg}
                    rotate={rotate} rotation={rotation}
                    getPrevImg={getPrevImg} getNextImg={getNextImg}

                />
            </header>
        </div>
    );
}

export default App;
