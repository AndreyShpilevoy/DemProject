/* eslint no-undef: 'off' */

import configureStoreProd from 'store/configureStore.prod';
import configureStoreDev from 'store/configureStore.dev';

export default function configureStore() {
  if(process.env.NODE_ENV === 'production') {
    return configureStoreProd;
  } else if (process.env.NODE_ENV === 'development') {
    return configureStoreDev;
  }
  else{
    throw `Store for '${process.env.NODE_ENV}' not found`;
  }
}
