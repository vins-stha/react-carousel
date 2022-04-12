import React from 'react';

export const Carousel = () => {
    return (
        <>
            <div className={"flex-column carousel-body"}>
                <div className={"image-body "}>
                    <img  className={""} src="image-body" alt=""/>
                </div>
                <div className={"carousel-actions flex"}>
                    <button>Prev</button>
                    <button>Rotate</button>
                    <button>Next</button>
                </div>

            </div>
        </>
    )
}
