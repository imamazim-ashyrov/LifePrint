import useSWRImmutable from "swr/immutable";
import styles from "./TwoGis.module.css";
import PageBlock from "../PageBlock/PageBlock";
import { getContacts } from "../../api/getContacts";

const TwoGis = () => {
  const { data: contacts } = useSWRImmutable("/contacts", getContacts);

  const options = JSON.stringify({
    pos: { lat: contacts?.latitude, lon: contacts?.longitude, zoom: 15 },
    opt: { city: contacts?.city },
    org: contacts?.organization_code,
  });

  const twoGisIframeURL = encodeURI(
    `https://widgets.2gis.com/widget?type=firmsonmap&options=${options}`
  );

  return (
    <PageBlock>
      <iframe
        className={styles.map}
        frameBorder="no"
        src={twoGisIframeURL}
      ></iframe>
    </PageBlock>
  );
};

export default TwoGis;
