import styles from "../styles/Category.module.scss";
import Card from "components/Card";
import Title from "components/Title";
import useMakeRequest from "hooks/useMakeRequest";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { BasketContext } from "context/BasketContext";

const Category = () => {
  const { slug } = useParams();
  const result = useMakeRequest(`https://fakestoreapi.com/products/category/${slug}`);

  const { textFilter, filteredList, setFilteredList} = useContext(BasketContext)
  useEffect(() => {
    result.data&& setFilteredList(result.data)

  }, [result.data])

  
  useEffect(() => {
    result.data&& textFilter? setFilteredList(result.data.filter((v)=>v.title.toLowerCase().startsWith(textFilter.toLowerCase()))): setFilteredList(result.data);

  }, [textFilter])


  if (!result.data) {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <Title txt="Loading..." size={25} transform="uppercase" />
      </div>
    );
  } else {
    return (
      <section className={styles.category}>
        <div className={styles.container}>
          <div className={styles.row}>
            {result.data && (
              <div className={styles.title}>
                <Title txt={slug} color="#171717" size={22} transform="uppercase" />
              </div>
            )}
          </div>
          <div className={styles.row}>
            {filteredList ? (
             filteredList.map((product, key) => <Card product={product} key={key} />)
            ) : (
              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Title txt={result.error} size={25} transform="uppercase" />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
};

export default Category;
