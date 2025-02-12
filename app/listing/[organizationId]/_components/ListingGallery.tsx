import { useState } from "react";

type Props = {
  coverPhoto: string;
  gallery: string[];
};

const ListingGallery = ({ coverPhoto, gallery }: Props) => {
  const [active, setActive] = useState(gallery[0]);

  const coverPhotoUrl = `${process.env.NEXT_PUBLIC_UPLOADCARE_BASE_URL}/${coverPhoto}/-/preview/600x600/`;

  return (
    <div className="flex flex-col gap-y-10">
      <div className="relative rounded-xl">
        <img
          src={`${process.env.NEXT_PUBLIC_UPLOADCARE_BASE_URL}/${active}/-/preview/600x600/`}
          alt="group-img"
          className="aspect-video z-20 max-h-[600px] w-full overflow-hidden rounded-t-xl object-cover object-center"
        />
      </div>
      <div className="flex flex-wrap justify-start gap-3">
        {gallery.map((image, index) => {
          return (
            <div key={index} className="relative">
              <img
                onClick={() => setActive(image)}
                src={`${process.env.NEXT_PUBLIC_UPLOADCARE_BASE_URL}/${image}/-/preview/300x300/`}
                alt="gallery-img"
                className="aspect-video h-36 w-36 cursor-pointer rounded-xl object-cover opacity-80 transition-all duration-300 ease-in-out hover:scale-110 hover:opacity-70"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListingGallery;
