import { useState } from "react";
import styles from "./App.module.css";
import { SearchItem } from "./SearchItem";

export const App = () => {
  const [itemsToSearch, setItemsToSearch] = useState([{}]);

  const handleAddNewRow = () => {
    setItemsToSearch([...itemsToSearch, {}]);
  };

  return <div className={styles.mainContainer}>
    <div className={styles.dialog}>
      <button onClick={handleAddNewRow}>Add</button>
      <ol>
        {itemsToSearch.map(() => <SearchItem />)}
      </ol>
    </div>
  </div>;
};
