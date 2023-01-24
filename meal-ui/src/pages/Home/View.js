import React, { useContext } from "react";
import Card from 'components/Card';
import Carousel from 'components/Carousel';
import { GenericContext } from 'pages/GenericPageContainer';


export default function View(props) {
    const { plannedItems, suggestedItems } = props;

    const genericContext = useContext(GenericContext);

    const classes = genericContext.className 
        ? `p-home-view ${genericContext.className}` 
        : `p-home-view`;

    return (
        <div className={classes}>
            <Card className="planning-quick-view" title="Upcoming...">
                <Carousel items={plannedItems}/>
            </Card>
            <Card className="explore-quick-view" title="Something else?">
                <Carousel items={suggestedItems}/>
            </Card>
        </div>
    );
};
