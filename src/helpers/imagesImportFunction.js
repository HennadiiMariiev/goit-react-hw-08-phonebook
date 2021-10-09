// import image from '../images/'

function importAll(r) {
  return r.keys().map(r);
}

export const avatarImages = importAll(require.context('../images/', true, /\.(png|jpg|svg)$/));
