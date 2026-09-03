import { Image } from "react-native";
import IconImg from "@/assets/img/icon.png";

interface Props {
  size: number;
}

export default function Logo({ size }: Props) {
  return (
    <Image
      source={IconImg}
      style={{ width: size, height: size, backgroundColor: "transparent" }}
    />
  );
}
