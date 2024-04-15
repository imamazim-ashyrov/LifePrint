import { Link } from "react-router-dom";
import styles from "./MobileDropdown.module.css";
import useSWRImmutable from "swr/immutable";
import { getServicesData } from "../../../../api/getServicesData";
import { getProductsData } from "../../../../api/getProductsData";

const MobileDropdown = ({ activeDropdown, handleMenuClose }) => {
  const { data: servicesData } = useSWRImmutable(
    "/service_list",
    getServicesData
  );
  const { data: productsData } = useSWRImmutable("/products", getProductsData);
  const dropdownData =
    activeDropdown === "services" ? servicesData : productsData;
  const titles = dropdownData?.map((data) => data.title);
  const pathNames = dropdownData?.map((data) => data.slug);
  const parentRoute = activeDropdown === "services" ? "services" : "products";
  return (
    <ul className={styles.dropdown}>
      {titles &&
        titles.map((title, index) => (
          <Link
            key={index}
            to={`${parentRoute}/${pathNames && pathNames[index]}`}
            onClick={handleMenuClose}
          >
            <li>{title}</li>
          </Link>
        ))}
    </ul>
  );
};

export default MobileDropdown;
