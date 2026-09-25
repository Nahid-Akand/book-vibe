import Image from "next/image";
import bannerImg from "@/assets/hero_img.jpg";

const Banner = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 overflow-hidden rounded-4xl bg-slate-100 p-6 md:grid-cols-2 md:p-10">
        
        {/* Content */}
        <div className="space-y-6">
          <p className="font-medium text-green-600">
            Welcome to Book Vibe
          </p>

          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
            Books to freshen up
            <br />
            your bookshelf
          </h1>

          <p className="max-w-lg text-base leading-7 text-slate-600 md:text-lg">
            Discover your next favorite book and build a bookshelf filled
            with stories, knowledge, and inspiration.
          </p>

          <button className="btn btn-success rounded-xl px-6 text-white">
            View The List
          </button>
        </div>

        {/* Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src={bannerImg}
            alt="Books displayed on a bookshelf"
            priority
            className="w-full max-w-md rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
