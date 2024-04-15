import { useState } from "react";
import styles from "./Accordion.module.css";
import AccordionItem from "../AccordionItem/AccordionItem";
import PageBlock from "../PageBlock/PageBlock";
import { articles } from "../../constants/articles.js";

const Accordion = () => {
  const [openId, setId] = useState(null);

  return (
    <PageBlock
      heading="Полезные статьи"
      subHeading="Статьи, которые раскрывают секреты успешного бизнеса и творческие подходы в мире полиграфии."
    >
      <div className="container">
        <ul className={styles.accordion}>
          {articles.map((arItem, id) => (
            <AccordionItem
              openAccordion={() => (id === openId ? setId(null) : setId(id))}
              arItem={arItem}
              isOpen={id === openId}
              key={id}
            />
          ))}
        </ul>
      </div>
    </PageBlock>
  );
};

export default Accordion;
