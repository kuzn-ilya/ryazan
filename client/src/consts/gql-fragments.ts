export const CATEGORY_INFO = `
    id
    name
`

export const PHOTO_INFO = `
    content {
        provider
        url
    }
`

export const POI_INFO = `
    id
    name
    description
    latitude
    longitude
    building
    street {
        name
    }
    photos {
        ${PHOTO_INFO}
    }
    category {
        ${CATEGORY_INFO}
    }
`

export const ROUTE_INFO = `
    id
    name
    description
    photos {
        ${PHOTO_INFO}
    }
    routeitems(sort: "order") {
        poi {
            ${POI_INFO}
        }
    }
    routepoints(sort: "order") {
        latitude
        longitude
    }
`
