import React from 'react';
import Carousel from "react-elastic-carousel";

export const ImageCarousel = (params) => {

    const {baseurl, curCatImgs, curCatName, data, rotate, rotation, getNextImg, getPrevImg, curImg} = params;
    return (
        <>
            <div className={"flex-column carousel-body"}>
                <div className={"image-body "}>
                    {curCatImgs?.length > 0 ? (

                        <img
                            className="scrollingImage"
                            src={baseurl + data[0]?.root + curCatName + "/" + curImg}
                            style={{transform: `rotate(${rotation}deg)`}}
                            alt={curImg}

                        />
                    ) : (<h2>No images available</h2>)}

                </div>
                {curCatImgs?.length > 0 && (
                    <div className={"carousel-actions flex"}>
                        <button onClick={getPrevImg}>Prev</button>
                        <button onClick={rotate}>Rotate</button>
                        <button onClick={getNextImg}>Next</button>

                    </div>
                )}

            </div>

        </>
    )
}
