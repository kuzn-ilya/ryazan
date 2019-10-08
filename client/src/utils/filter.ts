export type Filter = {
    search: string,
    categories: string[] | null,
};

type PoiWhere = {
    name_contains?: string,
    category?: {
        id_in: string[],
    },
};

type RouteWhere = {
    name_contains?: string,
    routeitems?: {
        poi: {
            category: {
                id_in: string[],
            },
        },
    },
};

export const formatPoiGqlFilter = ({search, categories}: Filter) => {
    const where: PoiWhere = {};

    if (search) {
        where.name_contains = search;
    }

    if (categories && categories.length) {
        where.category = {
            id_in: categories,
        };
    }

    return where;
};

export const formatRouteGqlFilter = ({search, categories}: Filter) => {
    const where: RouteWhere = {};

    if (search) {
        where.name_contains = search;
    }

    if (categories && categories.length) {
        where.routeitems = {
            poi: {
                category: {
                    id_in: categories,
                },
            },
        };
    }

    return where;
};
