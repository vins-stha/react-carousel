import React from 'react';

export const Navbar = () => {
	return (
		<>
			<div className={"flex"}>
				<div>
					<button>Prev</button>
				</div>
				<div>
					<h3 className={"catName"}> Category title</h3>
				</div>
				<div>
					<button>Next</button>
				</div>
			</div>
		</>
	)
}
