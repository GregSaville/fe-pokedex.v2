import { background, Tag } from "@chakra-ui/react";
import "../css/font.css";
import findTypeColor from "../utils/FindTypeColor";

function Type({ types }) {
  return (
    <>
      {types.map((type, index) => (
        <Tag
          key={index}
          variant={"subtle"}
          style={{ background: findTypeColor(type) }}
          textColor="#FFFAFA"
          textTransform="capitalize"
          fontFamily={"Pokemon Solid"}
        >
          {type}
        </Tag>
      ))}
    </>
  );
}

export default Type;
