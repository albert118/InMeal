import { useUpcomingRecipes } from 'hooks/data'
import AppRoutes from 'navigation/AppRoutes'
import { useNavigate } from 'react-router-dom'
import { QuickRecipesView } from './QuickRecipesView'

export default function HomeContainer() {
    const navigate = useNavigate()

    const mapper = (dto) => {
        return {
            ...dto,
            onClick: (id) => navigate(`${AppRoutes.recipe}/${id}`),
        }
    }

    const { upcomingRecipes } = useUpcomingRecipes(mapper)

    return (
        <div className="p-home">
            <QuickRecipesView
                plannedRecipes={upcomingRecipes}
                suggestedRecipes={upcomingRecipes}
            />
        </div>
    )
}
