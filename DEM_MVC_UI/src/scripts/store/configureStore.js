/* eslint no-undef: "off" */

import configureStoreProd from "./configureStore.prod";
import configureStoreDev from "./configureStore.dev";

export default function configureStore() {
  if(process.env.NODE_ENV === "production") {
    return configureStoreProd;
  } else {
    return configureStoreDev;
  }
}
