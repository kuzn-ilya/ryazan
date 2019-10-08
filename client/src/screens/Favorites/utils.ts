import * as Types from '../../types/graphql';
import {Favorite} from '../../providers';
import {Filter} from '../../utils';

export const filterFavorites = (favorites: Favorite[], filter: Filter) => {
  const {categories} = filter;
  const search = filter.search.toLowerCase();

  return favorites.filter(favorite => {
      if (search && !favorite.name.toLowerCase().includes(search)) {
          return false;
      }

      if (categories && categories.length) {
          switch (favorite.__typename) {
              case 'Poi': {
                  const poi = favorite as Types.Poi;

                  if (!categories.includes(poi.category!.id)) {
                      return false;
                  }

                  break;
              }
              case 'Route': {
                  const route = favorite as Types.Route;

                  if (!route.routeitems!.some(item => categories.includes(item!.poi!.category!.id))) {
                      return false;
                  }

                  break;
              }
              default:
                  break;
          }
      }

      return true;
  });
};
