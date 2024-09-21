import PageHeader from "../components/common/pageHeader";
import Logo from "../components/logo";
import AboutData from "../components/common/aboutData";
function About() {
  return (
    <div className="container ">
      <PageHeader
        title={
          <>
            About <Logo />
          </>
        }
      />
      <AboutData />
    </div>
  );
}

export default About;
