type userdetail = {
  id: string;
  name: string;
  image: string;
};

const setDetails = (details: userdetail) => {
  localStorage.setItem("username", details.name);
  localStorage.setItem("image", details.image);
  localStorage.setItem("id", details.id);
};
const getDetails = (detail: string) => {
  return localStorage.getItem(detail);
};

const setImage = (image: string) => {
  sessionStorage.setItem("image", image);
};
const getImage = () => {
  return sessionStorage.getItem("image");
};

export { setDetails, getDetails, getImage, setImage };
