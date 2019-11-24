import _ from 'lodash';
import React, {useState, useEffect, useContext} from 'react';
import {Filter} from '../utils';

type FilterContextType = [
  Filter,
  (filter: Filter) => void,
];

const defaultValue: FilterContextType = [
  {
    search: '',
    categories: null,
  },
  _.noop,
];

const FilterContext = React.createContext(defaultValue);

export const FilterProvider: React.FC = ({children}) => {
  const state = useState(defaultValue[0]);

  return (
      <FilterContext.Provider value={state}>
          {children}
      </FilterContext.Provider>
  );
};

export const useFilter = () =>
    useContext(FilterContext);
