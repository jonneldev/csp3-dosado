import Banner from "../components/Banner";
import Highlights from "../components/Highlights";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {

  const data = {
    title: "Your E-commerce Store",
    content: "Discover amazing products for you",
    destination: "/products",
    label: "Shop Now",
  };

  return (
    <>
      <Banner data={data} />
      <FeaturedProducts />
      <Highlights />
    </>
  );
}
