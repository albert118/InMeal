import { Carousel, RecipeCard } from '../../components';
import { useUpcomingRecipes } from '../../hooks/data';
import AppRoutes from '../../navigation/AppRoutes';
import { useState } from 'react';

export default function HomeContainer() {
    const { upcomingRecipes } = useUpcomingRecipes();

    const options = {
        portraitDesktop: {
            breakpoint: { max: 2160, min: 1024 },
            items: 2
        }
    };

    return (
        <div className='p-home'>
            <div className='quick-recipes-view'>
                <h2>
                    Recommended
                    <label>Try these!</label>
                </h2>
                <Carousel
                    items={upcomingRecipes}
                    className='planning-quick-view'
                    responsiveOptions={options}
                >
                    <RecipeCard height={400} />
                </Carousel>
                <h2>
                    Explore
                    <label>Find new recipes</label>
                </h2>
                <Carousel
                    items={upcomingRecipes}
                    className='explore-quick-view'
                    responsiveOptions={options}
                >
                    <RecipeCard height={300} />
                </Carousel>
            </div>
        </div>
    );
}
