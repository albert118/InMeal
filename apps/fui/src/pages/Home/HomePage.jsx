import { Carousel, RecipeCard } from '../../components';
import { useUpcomingRecipes } from '../../hooks/data';
import AppRoutes from '../../navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useOrientation } from '@uidotdev/usehooks';

export default function HomeContainer() {
    const { type, angle } = useOrientation();
    const navigate = useNavigate();
    const [isIpad, setIsIpad] = useState(false);

    const mapper = dto => ({
        ...dto,
        onClick: id => navigate(`${AppRoutes.recipe}/${id}`)
    });

    const { upcomingRecipes } = useUpcomingRecipes(mapper);

    const ipadMediaQueryList = window.matchMedia(
        '(min-width: 840px) and (max-width: 1194px)'
    );
    ipadMediaQueryList.addEventListener('change', e => setIsIpad(e.matches));

    const isPortrait = () => type === 'portrait-primary';

    const getVisibleHeroSlides = () => (isIpad || isPortrait() ? 2 : 4);

    const getVisibleExploreSlides = () => (isPortrait() || isIpad ? 3 : 6);

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
