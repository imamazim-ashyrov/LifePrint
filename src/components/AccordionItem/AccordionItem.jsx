import { useRef, useEffect } from "react";
import ArrowDown from "../../assets/icons/icons_blog/arrow.svg";
import styles from "./AccordionItem.module.css";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const AccordionItem = ({ arItem, openAccordion, isOpen }) => {
  const headingAccordionItem = arItem.title;
  const sanitizedData = DOMPurify.sanitize(headingAccordionItem);
  const accordionItemRef = useRef(null);

  useEffect(() => {
    if (isOpen && accordionItemRef.current) {
      accordionItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isOpen]);

  return (
    <li ref={accordionItemRef} className={styles.accordionItem}>
      <div className={styles.accordionLeft}>
        <img src={arItem.img} alt="image" className={styles.accordionImage} />
      </div>

      <div className={styles.accordionRight}>
        <div
          onClick={() => openAccordion()}
          className={styles.openAccordionClick}
        >
          <img
            src={ArrowDown}
            className={`${styles.chevron} ${isOpen ? styles.active : ""}`}
          />
          <h3 className={styles.heading}>{parse(sanitizedData)}</h3>
        </div>

        <div
          className={`${styles.accordionBody} ${
            !isOpen && styles.accordionCollapse
          }`}
        >
          <p>{arItem.titleItem}</p>
          {arItem.contents.map((contents, id) => (
            <div key={id} className={styles.acrSection}>
              <p>
                <b>{contents.section}</b> {contents.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};

export default AccordionItem;
