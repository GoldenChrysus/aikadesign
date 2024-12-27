import { observable, runInAction } from 'mobx';

type Portfolio = {
    id: number,
    name: string,
    entry: {
        id: string,
        title: string,
        info: Record<string, any>,
        image: {
            url: string,
            width: number,
            height: number,
        },
    }[],
}

const portfolios = observable<Record<number, Portfolio>>({});

export const getPortfolio = async (id: number) => {
    if (id in portfolios) {
        return portfolios[id];
    }

    const data = await fetch(`https://cms.uadesign.tokyo/api/portfolios/${id}`);
    const portfolio: Portfolio = await data.json();

    runInAction(() => {
        portfolios[portfolio.id] = portfolio;
    });

    return portfolio;
}
