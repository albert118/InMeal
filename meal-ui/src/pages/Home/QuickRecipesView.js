import { Carousel, RecipeCard } from 'components'

export function QuickRecipesView({ plannedRecipes, suggestedRecipes }) {
    return (
        <div className="quick-recipes-view">
            <Carousel
                items={plannedRecipes}
                className="planning-quick-view"
                title="Upcoming..."
            >
                <RecipeCard />
            </Carousel>
            <Carousel
                items={suggestedRecipes}
                className="explore-quick-view"
                title="Explore"
            >
                <RecipeCard />
            </Carousel>
        </div>
    )
}
