import React from 'react';

export const Navbar = (params) => {
    const {getPrevCat, getNextCat, curCatName} = params;
    return (
        <>
            <div className={"flex navbar"}>
                <div>
                    <button onClick={getPrevCat}>Prev</button>
                </div>
                <div>
                    <h3 className={"catName"}> Category title {curCatName}</h3>
                </div>
                <div>
                    <button onClick={getNextCat}>Next</button>
                </div>
            </div>
        </>
    )
}
