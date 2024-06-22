import Header from "src/components/Header";
import MainHero from "src/components/MainHero";

function MainLayout() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full">
        <MainHero>
          <div className="flex flex-col gap-7">
            <h1 className="text-4xl leading-[44px]">Build Your Success.</h1>
            <h2 className="text-2xl leading-[44px]">
              Unlock equity crowdfunding analysis and real private equity data
              delivered directly to your inbox. <br /> Vector provides all the
              information you need to invest confidently. <br />
              Success is not luck; it’s built.
            </h2>
          </div>
        </MainHero>
      </div>
    </div>
  );
}

export default MainLayout;
