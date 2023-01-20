import React, { useEffect, useState } from 'react';
import GenericPageContainer from 'pages/GenericPageContainer';
import HomeView from './View';
import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';

// const plannedItems = [
//     { id: 1, label: "Breakfast", status: FormStatuses.Unknown, imgUrl: "https://media.tenor.com/fokbHD7dZNUAAAAC/food-chinese.gif", handler: handleViewRecipeClick },
//     { id: 2, label: "Lunch", status: FormStatuses.Unknown, imgUrl: "https://media.tenor.com/1TjGpMd7GEYAAAAC/stitch-dessert.gif", handler: handleViewRecipeClick },
//     { id: 3, label: "Dinner", status: FormStatuses.Unknown, imgUrl: "https://bestanimations.com/media/food/1310335691frenchfries-animated-gif.gif", handler: handleViewRecipeClick }
// ];

// const suggestedItems = [
//     { id: 4, label: "Breakfast bowl", status: FormStatuses.Unknown, imgUrl: "https://i.pinimg.com/originals/28/0e/bc/280ebc35f36d9571f08cd61ab422235d.gif", handler: handleViewRecipeClick },
//     { id: 5, label: "Dessert Cake", status: FormStatuses.Unknown, imgUrl: "https://img.buzzfeed.com/buzzfeed-static/static/2015-06/23/3/enhanced/webdr13/anigif_enhanced-10889-1435044961-2.gif", handler: handleViewRecipeClick },
//     { id: 6, label: "Bulking Shake", status: FormStatuses.Unknown, imgUrl: "https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif", handler: handleViewRecipeClick }
// ];

const defaultRequestOptions = Object.freeze({
	mode: 'cors',
	cache: 'no-cache',
	credentials: 'same-origin',
	headers: {
		'Content-Type': 'application/json'
	},
	redirect: 'follow',
	referrerPolicy: 'no-referrer'
});

export default function HomeContainer() {
	const navigate = useNavigate();

	const [plannedItems, setPlannedItems] = useState([]);
	const [suggestedItems, setSuggestedItems] = useState([]);

	const displayMap = dto => {
		return {
			...dto,
			handler: id => navigate(`${AppRoutes.recipe}/${id}`),
			status: {
				text: dto.status,
				color: '#ff3350'
			}
		};
	};

	useEffect(() => {
		const loadData = async () => {
			const url = 'https://localhost:7078/api/upcoming';
			const upcomingRecipes = await (
				await fetch(url, { ...defaultRequestOptions, method: 'POST' })
			).json();

			setPlannedItems(upcomingRecipes.map(displayMap));
			setSuggestedItems(
				upcomingRecipes
					.map(displayMap)
					.sort((a, b) => 0.5 - Math.random())
			);
		};

		loadData();
	}, []);

	return (
		<GenericPageContainer>
			<HomeView
				plannedItems={plannedItems}
				suggestedItems={suggestedItems}
			/>
		</GenericPageContainer>
	);
}
