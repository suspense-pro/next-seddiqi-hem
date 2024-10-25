import { useEffect } from 'react';
import { SearchProvider } from "@contexts/searchContext";
import {Search} from '@components/module';

const SearchPage = () => {
  return (
    <div>
      <SearchProvider>
       <Search closeSearch={""}/>
      </SearchProvider>
    </div>
  );
};

export default SearchPage;