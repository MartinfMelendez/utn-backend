const crearCards = async () => {
  const res = await fetch("http:localhost:3000/productos");
  console.log(res.json());
};
