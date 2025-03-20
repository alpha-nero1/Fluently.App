interface IRevisionStrategy {
    key: string;
    name: string;
    description: string;
}


export const revisionStrategies: IRevisionStrategy[] = [
    { 
        key: 'FluentlySsr',
        name: 'Fluently SSR',
        description: 'Uses the Fluently Set Spaced Repition (SSR) algorithm to pick the next best cards to study.'
    }, 
    { 
        key: 'Random',
        name: 'Random',
        description: 'Picks random cards from your set to study.'
    } 
]