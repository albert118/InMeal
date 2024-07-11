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

    return (
        <div className='p-home'>
            <div className='quick-recipes-view'>
                <Carousel
                    items={upcomingRecipes}
                    className='planning-quick-view'
                    title='Upcoming...'
                >
                    <RecipeCard height={400} />
                </Carousel>
                <Carousel
                    items={upcomingRecipes}
                    className='explore-quick-view'
                    title='Explore'
                >
                    <RecipeCard height={350} />
                </Carousel>
            </div>
        </div>
    );
}
