import styles from "styles/AddToBasketBtn.module.scss";
function LogOutBtn(props) {
  return (
    <button className={styles.addToBasket} onClick={props.logOut} >Log Out </button>
  )
}

export default LogOutBtn