import { useState } from "react";
import useSWRImmutable from "swr/immutable";
import { getContacts } from "../../api/getContacts";
import chat from "./icons/chat.svg";
import whatsapp from "./icons/whatsapp.svg";
import telegram from "./icons/telegram.svg";
import styles from "./Widget.module.css";

const ChatIcon = ({ className, href, imgSrc }) => (
  <a
    className={className}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={imgSrc} />
  </a>
);

const Widget = () => {
  const { data: contacts } = useSWRImmutable("/contacts", getContacts);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setTimeout(() => {
      setIsOpen(true);
    }, 0);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.fixedContainer}>
      <div
        className={`${styles.wrapper} ${isOpen ? styles.open : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ChatIcon
          className={styles.telegram}
          href={contacts?.telegram_link}
          imgSrc={telegram}
        />
        <ChatIcon
          className={styles.whatsapp}
          href={contacts?.whatsapp_link}
          imgSrc={whatsapp}
        />
        <img className={styles.chat} src={chat} onClick={handleClick} />
      </div>
    </div>
  );
};

export default Widget;
