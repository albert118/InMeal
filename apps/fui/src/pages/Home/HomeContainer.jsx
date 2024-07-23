import { Carousel, RecipeCard } from '../../components';
import { useUpcomingRecipes } from '../../hooks/data';
import AppRoutes from '../../navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';

export default function HomeContainer() {
    const navigate = useNavigate();

    const mapper = dto => {
        return {
            ...dto,
            onClick: id => navigate(`${AppRoutes.recipe}/${id}`)
        };
    };

    const { upcomingRecipes } = useUpcomingRecipes(mapper);

    const ipadBreakpointMediaQueryList = window.matchMedia(
        '(min-width: 1194px)'
    );
    const portraitMediaQueryList = window.matchMedia('(orientation: portrait)');

    const getVisibleHeroSlides = () => {
        if (portraitMediaQueryList) {
            return 1;
        } else if (ipadBreakpointMediaQueryList) {
            return 2;
        } else {
            4;
        }
    };

    const getVisibleExploreSlides = () => {
        if (portraitMediaQueryList) {
            return 2;
        } else if (ipadBreakpointMediaQueryList) {
            return 3;
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
