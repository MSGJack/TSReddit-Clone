import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../../utilities/local";
import { FavoriteSubreddits } from "../../components/favs/Favs";

type SubProviderProps = {
  children: ReactNode;
};

type FavoriteSubs = {
  title: string;
  id: number;
  permalink: string;
};

type FavoritesContext = {
  addToList: (id: number, title: string, permalink: string) => void;
  removeFromList: (id: number) => void;
  openList: () => void;
  closeList: () => void;
  isSaved: (id: number) => boolean;
  favoriteList: FavoriteSubs[];
};

const FavoritesContext = createContext({} as FavoritesContext);

export function useFavorite() {
  //return useContext(FavoritesContext);
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
}

export function FavoriteProvider({ children }: SubProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteList, setFavoriteList] = useLocalStorage<FavoriteSubs[]>(
    "favorite-subs",
    []
  );

  const openList = () => setIsOpen(true);
  const closeList = () => setIsOpen(false);

  function removeFromList(id: number) {
    setFavoriteList((favs) => {
      const removed = favs.filter((f) => f.id !== id);
      localStorage.setItem("favorite-subs", JSON.stringify(removed));
      return removed;
    });
  }

  function addToList(id: number, title: string, permalink: string) {
    setFavoriteList((favs) => {
      if (!favs.find((item) => item.id === id)) {
        const addedItem = [...favs, { id, title, permalink }];
        localStorage.setItem("favorite-subs", JSON.stringify(addedItem));
        return addedItem;
      }
      return favs;
    });
  }

  function isSaved(id: number): boolean {
    return favoriteList.some((item) => item.id === id);
  }

  return (
    <>
      <FavoritesContext.Provider
        value={{
          removeFromList,
          addToList,
          favoriteList,
          openList,
          closeList,
          isSaved,
        }}
      >
        {children}
        <FavoriteSubreddits isOpen={isOpen} />
      </FavoritesContext.Provider>
    </>
  );
}
