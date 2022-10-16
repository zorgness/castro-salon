export const checkDataAgeToCleanLocaleStorage = date => {
  const today = new Date(Date.now()).getDate();
  const dataDate = new Date(parseInt(date)).getDate()

  if (today - dataDate >= 1.2) {
    localStorage.clear()
    localStorage.setItem('storageDateHome', Date.now());
  }

}
