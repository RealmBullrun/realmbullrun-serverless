"use client"
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ImageFromUri } from "./ImageFromUri";

export const Collections = ({ collectionsObject }: { collectionsObject: any }) => {
  const [collections, setCollections] = useState<any[]>([]);
  const [fullSizeImage, setFullSizeImage] = useState<string | null>(null);

  useEffect(() => {
    if (collectionsObject) {
      const arr = Object.keys(collectionsObject).map((collectionName: any) => {
        const previewMap = collectionsObject[collectionName]["preview"];
        return {
          name: collectionsObject[collectionName]['name'],
          image: collectionsObject[collectionName]['image'],
          desc: collectionsObject[collectionName]['desc'],
          previews: Object.keys(previewMap).map((previewMapKey: any) => {
            const { img, name, type } = previewMap[previewMapKey];
            return { img, name, type };
          }),
        };
      });
      setCollections(arr);
    }
  }, [collectionsObject]);

  return (
    <div className="mx-auto mt-4 w-full">
      <Carousel
        plugins={[Autoplay({ delay: 5000 })]}
        className="w-11/12 max-w-screen-2xl mx-auto"
      >
        <CarouselContent className="flex gap-4">
          {collections && collections.map((elem: any) => {
            const { name, image, desc, previews } = elem;
            return (
              <CarouselItem className="lg:basis-1/5 md:basis-1/3 sm:basis-1/3 flex justify-center" key={`key_${name}`}>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex flex-col items-center justify-center cursor-pointer gap-2 p-2">
                      <ImageFromUri additionalClass="w-full max-w-xs h-auto rounded-lg" uri={image} />
                      <p className="text-center font-semibold mt-2">{name}</p>
                      <div className="hidden md:flex p-2 text-muted-foreground text-center">
                        {desc.toString().substring(0, 40)}...
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[90vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl overflow-y-scroll max-h-[90vh] p-4">
                    <DialogHeader className="flex flex-col">
                      <DialogTitle>{name.toString()}</DialogTitle>
                      <p className="text-sm text-neutral-400">{desc.toString()}</p>
                    </DialogHeader>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {previews && previews.map((preview: any, index: any) => (
                        <div
                          key={`collection_${index}`}
                          className="relative bg-background flex items-center justify-center w-full h-0 pb-[100%]"
                          onClick={() => setFullSizeImage(preview.img.toString())}
                        >
                          <ImageFromUri
                            additionalClass="absolute inset-0 object-contain w-full h-full cursor-pointer p-2"
                            uri={preview.img.toString()}
                          />
                        </div>
                      ))}
                    </div>
                  </DialogContent>

                </Dialog>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Full-size Image Dialog */}
      {fullSizeImage && (
        <Dialog open={fullSizeImage !== null} onOpenChange={() => setFullSizeImage(null)}>
          <DialogContent
            className="p-0 flex items-center justify-center max-w-auto max-h-[90%] bg-transparent border-0"
          >
            <ImageFromUri
              additionalClass="w-auto h-auto max-w-full max-h-full min-w-72"
              uri={fullSizeImage}
            />
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
