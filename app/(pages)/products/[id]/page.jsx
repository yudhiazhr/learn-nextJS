import Image from "next/image";

const base_url = "https://fakestoreapi.com/products";

const ProductDetail = async ({ params }) => {
  const id = params.id;

  const res = await fetch(base_url + "/" + id);
  const products = await res.json();

  return (
    <>
      <section className="h-screen flex flex-col gap-8 justify-center items-center">
        <Image
          src={products.image}
          width="500"
          height="500"
          priority
          className="w-[320px] h-[320px]"
          alt={products.image}
        />
        <h1>{products.title}</h1>
      </section>
    </>
  );
};

export default ProductDetail;
