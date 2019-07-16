import _ from 'lodash';
import React, {useState, useEffect, useContext} from 'react';
import {AsyncStorage} from 'react-native';
import * as Types from '../types/graphql';
import {messageBox} from '../services';

export type Favorite = Types.Poi | Types.Route;

type FavoritesContextType = {
    favorites: Favorite[],
    isFavorite: (item: Favorite) => boolean,
    addFavorite: (item: Favorite) => void,
    removeFavorite: (item: Favorite) => void,
};

const favoritesStorageKey = 'favorites';

const defaultValue: FavoritesContextType = {
    favorites: [],
    isFavorite: () => false,
    addFavorite: _.noop,
    removeFavorite: _.noop,
};

const FavoritesContext = React.createContext(defaultValue);

export const FavoritesProvider: React.FC = ({children}) => {
    const [favorites, setFavorites] = useState(defaultValue.favorites);

    useEffect(() => {
        AsyncStorage.getItem(favoritesStorageKey)
          .then(data => data ? JSON.parse(data) : [])
          .then(setFavorites)
          .catch(messageBox.error);
    }, []);

    const storeFavorites = (newlist: Favorite[]) => {
        const data = JSON.stringify(newlist);
        AsyncStorage.setItem(favoritesStorageKey, data)
            .then(() => setFavorites(newlist))
            .catch(messageBox.error);
    };

    const value: FavoritesContextType = {
        favorites,
        isFavorite: ({__typename, id}) =>
            _.some(favorites, {__typename, id}),
        addFavorite: (item) => {
            const {__typename, id} = item;
            const newlist = _.reject(favorites, {__typename, id});
            newlist.push(item);
            storeFavorites(newlist);
        },
        removeFavorite: ({__typename, id}) => {
            const newlist = _.reject(favorites, {__typename, id});
            storeFavorites(newlist);
        },
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () =>
    useContext(FavoritesContext);
