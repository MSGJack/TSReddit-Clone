import { useEffect } from "react";
import { useFavorite } from "../../context/subreddit/subs";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FavSub } from "./FavSubs";
//import { FaRegWindowClose } from "react-icons/fa";   <FaRegWindowClose />

type FavoriteProps = {
  isOpen: boolean;
};

function openList(isOpen: boolean) {
  document.body.style.backgroundColor = isOpen ? "rgba(85, 85, 85, 0.8)" : "";
  const mainContent = document.querySelector(".Card");
  if (mainContent) {
    mainContent.classList.toggle("dimmed", isOpen);
  }
  const navContent = document.querySelector(".Container");
  if (navContent) {
    navContent.classList.toggle("dimmed", isOpen);
  }
}

export function FavoriteSubreddits({ isOpen }: FavoriteProps) {
  const { favoriteList, closeList } = useFavorite();
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  useEffect(() => {
    openList(isOpen);
    return () => openList(false);
  }, [isOpen]);

  return (
    <>
      <div className={`favSideBar ${isOpen ? "open" : ""}`} onClick={closeList}>
        <div className="favContent" onClick={(e) => e.stopPropagation()}>
          <header className="favHeader">
            <h2>Favorite Subs</h2>
            <div className="favButtons">
              <button
                onClick={closeList}
                className="closeList"
                title="Close List"
              >
                <IoCloseCircleOutline />
              </button>
            </div>
          </header>
          <div className="List-Body">
            {favoriteList.length > 0 ? (
              favoriteList.map((favs, index) => (
                <FavSub key={index} {...favs} />
              ))
            ) : (
              <p>You haven't added any favorites yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
