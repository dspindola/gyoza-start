import { preinit, preinitModule, preload, preloadModule } from "react-dom";
import css from "./home.css"

export const meta = {
	title: "home",
	links: []
};



export function Route() {
	preinit(css, {
		as: "style",
		integrity: btoa(css),
	})


	return (
		<main className="home-container">
			<section className='block'>
				<h1>hi</h1>
			</section>
		</main>
	);
}
