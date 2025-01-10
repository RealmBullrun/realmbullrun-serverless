import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AppContext } from "@/providers/AppContextProvider";
import { ImageFromUri } from "./ImageFromUri";
import { Textarea } from "../ui/textarea";
import { DeleteIcon } from "../icons/DeleteIcon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface Preview {
  type: string;
  uri: string;
}

interface Collection {
  slug: string;
  name: string;
  desc: string;
  image: string;
  previews: Preview[];
}

interface CollectionsEditProps {
  value: Collection[];
  onEdit: (collections: Collection[]) => void;
}

export default function CollectionsEdit({ value, onEdit }: CollectionsEditProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageType, setImageType] = useState("atom:btc:id");
  const [imageUri, setImageUri] = useState("");
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [jsonInput, setJsonInput] = useState("");

  const { showError } = useContext(AppContext);

  useEffect(() => {
    let msg = "";
    for (const preview of previews) {
      msg += `,${preview.uri}`;
    }
  }, [previews]);

  useEffect(() => {
    onEdit(value)
  }, [value])

  const handleJsonInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  };

  const parseJsonInput = () => {
    try {
      const parsed = JSON.parse(jsonInput) as { id: string }[];
      const newPreviews = parsed.map(item => ({
        type: "ord:btc:id",
        uri: item.id,
      }));
      setPreviews(newPreviews);
    } catch (error) {
      showError("Invalid JSON format.");
    }
  };


  const spliceCollections = (slug: string) => {
    let newData = [...value]
    for (const i in value) {
      if (value[i]['slug'] === slug) {
        newData.splice(parseInt(i), 1)
        onEdit(newData)
        return
      }
    }
  }

  const splicePreviews = (uri: string) => {
    const newPreviews = previews.filter((preview, idx) => preview.uri !== uri);
    setPreviews(newPreviews);
  }

  return (
    <>
      <div className="">
        <p className="text-gray-600">Collections</p>
        {value &&
          value.map((elem, index) => (
            <div key={index}>
              <div className="flex flex-row justify-between">
                <div className="">{elem.slug}</div>
                <DeleteIcon clicked={() => spliceCollections(elem.slug)}></DeleteIcon>
              </div>
              <div className="">{elem.name}</div>
              <div className="">{elem.desc}</div>
              <div className="mt-4 p-2 bg-background flex flex-col">
                <div className="text-sm">Collection Logo:</div>
                <div className="mt-2">
                  <ImageFromUri uri={elem.image} />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-lg font-medium text-gray-800">Previews:</div>
              </div>

              <div className="flex flex-row flex-wrap justify-center gap-4 ">
                {elem.previews &&
                  elem.previews.map((el, idx) => (
                    <div key={idx}>
                      <ImageFromUri uri={`${el.type}:${el.uri}`} />
                    </div>
                  ))}
              </div>
            </div>
          ))}

        <Button
          variant={"secondary"}
          className="w-full lg:mx-auto"
          onClick={() => {
            setSlug("");
            setTitle("");
            setDescription("");
            setImageType("atom:btc:id");
            setJsonInput("")
            setImageUri("");
            setPreviews([]);
            setIsDialogOpen(true);
          }}
        >
          Add Collection
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)} modal>
        <DialogContent className="overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>Enhance Your Profile with Collections</DialogTitle>
            <DialogDescription>
              <p>Add collections to your profile. With a logo, a title, a description, and multiple item previews, showcase your creations to your community.</p>

              <div className="p-2 bg-card my-4">
                <p>Collection Metadata </p>
                <Input
                  value={slug}
                  className="my-2"
                  placeholder="Collection slug"
                  onChange={(event) => setSlug(event.target.value)}
                />
                <Input
                  value={title}
                  className="my-4"
                  placeholder="Collection Title"
                  onChange={(event) => setTitle(event.target.value)}
                />
                <Textarea
                  value={description}
                  className="my-4"
                  placeholder="Collection description"
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <div className="p-2 bg-card my-2 flex flex-col items-center">
                <p className="w-full">Collection Logo </p>
                <ImageFromUri uri={`${imageType}:${imageUri}`} additionalClass="h-40 w-40 my-4" />
                <Select value={imageType} onValueChange={setImageType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Select your image type"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"atom:btc:id"}>Atomical NFT</SelectItem>
                    <SelectItem value={"atom:btc:dat"}>On-chain stored Atomical</SelectItem>
                    <SelectItem value={"ord:btc:id"}>Ordinal Inscription</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={imageUri}
                  className="my-4"
                  placeholder={`${imageType}:xxx`}
                  onChange={(event) => setImageUri(event.target.value)}
                />
              </div>



              {previews.map((elem, index) => (
                <div key={index}>
                  <div className="flex flex-row justify-between">
                    <ImageFromUri additionalClass="my-4" uri={`${elem.type}:${elem.uri}`} />
                    <DeleteIcon clicked={() => splicePreviews(elem.uri)}></DeleteIcon>
                  </div>
                  <Select
                    value={elem.type}
                    onValueChange={(val) => {
                      const newPreviews = previews.map((preview, idx) =>
                        idx === index ? { ...preview, type: val } : preview
                      );
                      setPreviews(newPreviews);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={"Select your image type"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"atom:btc:id"}>Atomical NFT</SelectItem>
                      <SelectItem value={"atom:btc:dat"}>On-chain stored Atomical</SelectItem>
                      <SelectItem value={"ord:btc:id"}>Ordinal Inscription</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={elem.uri}
                    className="my-4"
                    placeholder={`${elem.type}:xxx`}
                    onChange={(event) => {
                      const newPreviews = previews.map((preview, idx) =>
                        idx === index ? { ...preview, uri: event.target.value } : preview
                      );
                      setPreviews(newPreviews);
                    }}
                  />
                </div>
              ))}
              <Button
                variant={"secondary"}
                className="my-2"
                onClick={() => {
                  if (!previews.length || previews[previews.length - 1].uri) {
                    setPreviews([
                      ...previews,
                      {
                        type: "atom:btc:id",
                        uri: "",
                      },
                    ]);
                  }
                }}
              >
                Add Preview
              </Button>

              <div className="p-2 bg-card">

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p>Inscriptions.json</p>
                    </TooltipTrigger>
                    <p className="text-gray-600">Copy your inscription.json file from
                      <a className="text-primary" target="_blank" href="https://github.com/ordinals-wallet/ordinals-collections"> ordinals collections </a>
                      and parse the file.
                    </p>
                    <TooltipContent>
                      <p> Visit
                        <a className="" href="/qna"> FAQ</a> for more infos.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Textarea
                  value={jsonInput}
                  className="my-4"
                  placeholder="Paste your JSON here (optional)"
                  onChange={handleJsonInput}
                />
                <Button variant={'secondary'} onClick={parseJsonInput}>Parse JSON (optional)</Button>

              </div>

              <Button
                className="my-4"
                onClick={() => {
                  onEdit([
                    ...value,
                    {
                      slug,
                      name: title,
                      desc: description,
                      image: `${imageType}:${imageUri}`,
                      previews,
                    },
                  ]);
                  setIsDialogOpen(false);
                }}
              >
                Save
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
