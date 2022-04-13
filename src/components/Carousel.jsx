import React from 'react';
import Carousel from "react-elastic-carousel";

export const ImageCarousel = (params) => {
    const {baseurl, curCatImgs, curCatName, data, rotate, rotation} = params;
    return (
        <>
            <div className={"flex-column carousel-body"}>
                <div className={"image-body "}>
                    {curCatImgs?.length > 0 ? (

                        <Carousel className={"bigg"}>
                            {
                                curCatImgs?.map((image, id) =>
                                    <img
                                        className="scrollingImage"
                                        src={baseurl + data[0]?.root + curCatName + "/" + image}
                                        style={{transform: `rotate(${rotation}deg)`}}
                                        alt={image}
                                        key={id}
                                    />)
                            }
                        </Carousel>
                    ) : (<h2>No images available</h2>)}

                </div>
                {curCatImgs?.length > 0 && (
                    <div className={"carousel-actions flex"}>

                        <button onClick={rotate}>Rotate</button>

                    </div>
                )}

            </div>
        </>
    )
}
