import { Box, Circle, IconButton } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { FaBell } from "react-icons/fa";

export default function Badge({ count }: { count: number }) {
  return (
    <IconButton
      css={css`
        position: relative !important;
      `}
      py={"2"}
      colorScheme={"gray"}
      aria-label={"Notifications"}
      size={"md"}
      icon={
        <>
          <FaBell color={"gray.750"} />
          <Circle
            // as={"span"}
            color={"white"}
            position={"absolute"}
            top={"-5px"}
            right={"-2px"}
            fontSize={"0.8rem"}
            bgColor={"red"}
            // borderRadius={"xlg"}
            zIndex={9999}
            p={"2px"}
            px={"4px"}
          >
            {count}
          </Circle>
        </>
      }
    />
  );
}
