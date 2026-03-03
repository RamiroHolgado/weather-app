import Footer from "./Footer";

export default function Layout(props) {
  const { children } = props;
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
