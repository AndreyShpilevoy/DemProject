export default function dateTimeDeclension (number, firstForm, secondForm, trirdForm, singleForm) {
    //always return secondForm or singleForm
  if (number === 1) {
    return singleForm;
  } else {
    return `${number} ${secondForm}`;
  }
}
