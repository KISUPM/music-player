/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { BsPlay, BsPause } from "react-icons/bs";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import classes from "./MP.module.css";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [volume, setVolume] = useState(100);
  const [srcAudio, _setSrcAudio] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const player = useRef<HTMLAudioElement | null>(null);

  const getPlayer = (): HTMLAudioElement => {
    return document.getElementById("player") as HTMLAudioElement;
  };

  const timeFormat = (second: number): string => {
    return `${String(Math.floor(second / 60)).padStart(2, "0")}:${String(
      Math.ceil(second % 60)
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (getPlayer()) {
      setDuration(getPlayer().duration);
    }
  }, [srcAudio]);

  return (
    <Box>
      <Button onClick={() => _setSrcAudio("/music/Spica.mp3")}>
        {srcAudio}
      </Button>
      {srcAudio !== "" && (
        <audio
          src={srcAudio}
          id="player"
          ref={player}
          // controls
          onEnded={() => {
            const player = getPlayer();
            setIsPlaying(false);
            player.pause();
            setCurrentTime(0);
          }}
          onTimeUpdate={(e) => {
            const currTime = e.currentTarget.currentTime;
            setCurrentTime(currTime);
          }}
        />
      )}
      <Box
        display="flex"
        columnGap={"1rem"}
        alignItems={"center"}
        m="auto"
        border="1px solid"
        w="fit-content"
        p="1rem"
      >
        <Box w="fit-content">
          <Button
            variant={"unstyled"}
            border="1px solid"
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => {
              const player = getPlayer();
              if (player) {
                if (isPlaying) {
                  player.pause();
                } else {
                  player.play();
                }
                setIsPlaying(!isPlaying);
              }
            }}
          >
            {isPlaying ? <BsPause /> : <BsPlay />}
          </Button>
        </Box>
        <Box
          display="flex"
          minW="50vw"
          columnGap={"1rem"}
          alignItems={"center"}
        >
          <Text>{timeFormat(currentTime)}</Text>
          <Slider
            defaultValue={0}
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => {
              const player = getPlayer();
              if (player) {
                player.currentTime = e;
                setCurrentTime(e);
              }
            }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text>{timeFormat(duration)}</Text>
        </Box>
        <Box
          w="fit-content"
          display="flex"
          alignItems={"center"}
          position="relative"
          columnGap={"1rem"}
        >
          <Box
            _hover={{ bg: "#aaa5" }}
            p="1rem"
            borderRadius={"50%"}
            cursor={"pointer"}
            onClick={() => {
              const player = getPlayer();
              setIsMute(!isMute);
              if (!isMute) {
                player.volume = 0;
              } else {
                player.volume = volume / 100;
              }
            }}
            className={classes.speakerIcon}
          >
            {isMute ? <GiSpeakerOff /> : <GiSpeaker />}
          </Box>
          <Box>
            <Slider
              defaultValue={volume}
              min={0}
              max={100}
              value={isMute ? 0 : volume}
              minW="50px"
              onChange={(e) => {
                const player = getPlayer();
                setVolume(e);
                player.volume = volume / 100;
                if (e === 0) {
                  setIsMute(true);
                } else {
                  setIsMute(false);
                }
              }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MusicPlayer;
