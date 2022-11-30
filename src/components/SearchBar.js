import styles from "styles/SearchBar.module.scss";
import {BasketContext}  from "../context/BasketContext";
import {useContext} from "react"
function SearchBar() {
    const {setTextFilter} = useContext(BasketContext);
    // console.log(setTextFilter);
    return (

        <>
        {/* <label htmlFor="search">Search for stuff</label> */}
          <div className={styles.div}> <input className={styles.input} id="search" type="search"  placeholder="Search..." required
                onChange={(e) => setTextFilter(e.target.value)} />
                </div> 
            {/* <button className={styles.btn} type="submit">Go</button>   */}
            </>
    )
}

export default SearchBar;