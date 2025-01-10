import { BsPersonBoundingBox, BsTwitterX, BsLink45Deg, BsLinkedin, BsFacebook, BsYoutube, BsGithub, BsTelegram, BsDiscord, BsInstagram, BsTwitter } from 'react-icons/bs'

export const DynamicIcon = ({ url, type = "official", color }: { url?: string, type?: string, color?: string }) => {
  const iconProps = { color };

  if (type === "official")
    return <BsLink45Deg {...iconProps} />;
  if (type === "share-on-x")
    return <BsTwitter {...iconProps} />;
  if (type === "x" || type === "twitter")
    return <BsTwitterX {...iconProps} />;
  if (type === "facebook")
    return <BsFacebook {...iconProps} />;
  if (type === "linkedin")
    return <BsLinkedin {...iconProps} />;
  if (type === "youtube")
    return <BsYoutube {...iconProps} />;
  if (type === "github")
    return <BsGithub {...iconProps} />;
  if (type === "telegram")
    return <BsTelegram {...iconProps} />;
  if (type === "discord")
    return <BsDiscord {...iconProps} />;
  if (type === "instagram")
    return <BsInstagram {...iconProps} />;
  if (type === "person")
    return <BsPersonBoundingBox {...iconProps} />;
  return <BsLink45Deg {...iconProps} />;
};
