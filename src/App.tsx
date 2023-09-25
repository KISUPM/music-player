import { Box, Button } from "@chakra-ui/react";
import MusicPlayer from "./Components/Musicplayer/MusicPlayer";
import { useState } from "react";
import MusicList from "./Components/MusicList/MusicList";

function App() {
  const [isOpenList, setIsOpenList] = useState(false);
  return (
    <Box w="100vw" h="100dvh" color="#fff" bg="#232323">
      <Box w="100%" h="100%" display="flex" overflow="hidden">
        <Box
          w={isOpenList ? "80%" : "100%"}
          p="0.5rem"
          transition={"all 0.3s"}
          position="relative"
          bg="#343434"
        >
          <Button
            onClick={() => setIsOpenList(!isOpenList)}
            position="absolute"
            right="0.5rem"
            top="0.5rem"
          >
            =
          </Button>
          <MusicPlayer />
        </Box>
        <Box
          w="20%"
          h="100%"
          transition={"all 0.3s"}
          mr={isOpenList ? "0" : "-20%"}
          p="0.5rem"
        >
          <MusicList />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
