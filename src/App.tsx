import { useState } from "react";
import styles from "./App.module.css";
import { SearchIpListItem } from "./SearchIpListItem";

export const App = () => {
  const [itemsToSearch, setItemsToSearch] = useState([{}]);

  const handleAddNewRow = () => {
    setItemsToSearch([...itemsToSearch, {}]);
  };

  return <div className={styles.mainContainer}>
    <div className={styles.dialog}>
      <button onClick={handleAddNewRow}>Add</button>
      <ol>
        {itemsToSearch.map(() => <SearchIpListItem />)}
      </ol>
    </div>
  </div>;
};
