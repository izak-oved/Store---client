import styles from "styles/Header.module.scss";
import { Link } from "react-router-dom";
import GetIcon from "components/GetIcon";
import clsx from "clsx";
import CategoryItem from "./CategoryItem";
import useMakeRequest from "hooks/useMakeRequest";
import { BasketContext } from "context/BasketContext";
import { useContext } from "react";
import SearchBar from "./SearchBar";
import linkBG from "images/logo2.png";
import LoginBtn from "./LoginBtn";
import LogOutBtn from "./LogOutBtn";


const Header = ({user ,logOut}) => {
  const result = useMakeRequest("https://fakestoreapi.com/products/categories");
  const { basketItems, setBasketIsOpen } = useContext(BasketContext);
  
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img className={styles.logo} src={linkBG} alt="Logo"/>
        </Link>
        {user.email ? <>
        <Link to="/">
            <LogOutBtn logOut ={logOut} />

        </Link>
        <h3 className={styles.tagName}>{`welcome ${user.name}`}</h3>
        </>:
        <Link to="/user">
            <LoginBtn />
        </Link>}
      </div>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <ul>
             <li className={styles.search}><SearchBar /></li> 
            <li>
              <Link to="/" onClick={(e) => e.preventDefault()} className={styles.a}>
                Categories
              </Link>
              <ul className={styles.subMenu}>{result.data ? result.data.map((cat, index) => <CategoryItem data={cat} key={index} />) : <div>{result.error}</div>}</ul>
            </li>
            <li>
              <Link
                to="/"
                className={clsx(styles.basketBtn, styles.a)}
                onClick={(e) => {
                  e.preventDefault();
                  setBasketIsOpen((oldState) => !oldState);
                }}
              >
                <GetIcon icon="BsCart4" size={25} color="#ffffff" />
                {basketItems.length > 0 && <span className={styles.basketLength}> {basketItems.length} </span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
