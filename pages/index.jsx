import Header from "../components/landing/header";
import Content from "../components/landing/content";
import Content2 from "../components/landing/content2";
import Footer from "../components/landing/footer";

const Homepage = () => {
  return (
    <div className="relative text-[inter] bg-gray w-full overflow-hidden flex flex-col items-center justify-start">
      <Header />
      <Content />
      <Content2 />
      <Footer />
    </div>
  );
};

export default Homepage;
