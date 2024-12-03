import { useState } from "react";
import styles from "./App.module.css";
import { SearchIpListItem } from "./SearchIpListItem";
import { Button } from "./Button/Button";
import { ReactComponent as PlusIcon } from './plus.svg';

export const App = () => {
  const [itemsToSearch, setItemsToSearch] = useState([{}]);

  const handleAddNewRow = () => {
    setItemsToSearch([...itemsToSearch, {}]);
  };

  return <div className={styles.mainContainer}>
    <div className={styles.dialog}>
      <Button onClick={handleAddNewRow}>
        <PlusIcon className={styles.plusIcon} /> Add
      </Button>
      <ol className={styles.ipSearchList}>
        {itemsToSearch.map(() => <SearchIpListItem />)}
      </ol>
    </div>
  </div>;
};
