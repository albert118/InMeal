import { Carousel, RecipeCard } from '../../components';
import { useUpcomingRecipes } from '../../hooks/data';
import AppRoutes from '../../navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function HomeContainer() {
    const navigate = useNavigate();
    const [isIpad, setIsIpad] = useState(false);
    const [isPortrait, setIsPortrait] = useState(false);

    const mapper = dto => {
        return {
            ...dto,
            onClick: id => navigate(`${AppRoutes.recipe}/${id}`)
        };
    };

    const { upcomingRecipes } = useUpcomingRecipes(mapper);

    const ipadMediaQueryList = window.matchMedia(
        '(min-width: 840px) and (max-width: 1194px)'
    );
    ipadMediaQueryList.addEventListener('change', e => setIsIpad(e.matches));

    const isPortraitMediaQueryList = window.matchMedia(
        '(orientation: portrait)'
    );
    isPortraitMediaQueryList.addEventListener('change', e =>
        setIsPortrait(e.matches)
    );

    const getVisibleHeroSlides = () => {
        if (isPortrait) {
            // idky I can even set a non-integer value here - but it works
            return 0.5;
        } else if (isIpad) {
            return 2;
        } else {
            4;
        }
    };

    const getVisibleExploreSlides = () => {
        if (isPortrait || isIpad) {
            return 2;
        } else {
            5;
        }
    };

    return (
        <div className='p-home'>
            <div className='quick-recipes-view'>
                <Carousel
                    items={upcomingRecipes}
                    className='planning-quick-view'
                    title='Upcoming...'
                    visibleSlides={getVisibleHeroSlides()}
                >
                    <RecipeCard height={400} />
                </Carousel>
                <Carousel
                    items={upcomingRecipes}
                    className='explore-quick-view'
                    title='Explore'
                    visibleSlides={getVisibleExploreSlides()}
                >
                    <RecipeCard height={300} />
                </Carousel>
            </div>
        </div>
    );
}
