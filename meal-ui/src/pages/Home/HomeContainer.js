import { Column, Grid } from '@carbon/react'
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
        <Grid className="p-home">
            <Column className="p-home__r1" max={16} lg={16} md={8} sm={4}>
                <QuickRecipesView
                    plannedRecipes={upcomingRecipes}
                    suggestedRecipes={upcomingRecipes}
                />
            </Column>
        </Grid>
    )
}
