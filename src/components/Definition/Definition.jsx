import { useState, useEffect, Fragment } from "react";
import {
  Stack,
  Typography,
  Box,
  IconButton,
  useTheme,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  BookmarkBorder as BookmarkIcon,
  PlayArrow as PlayIcon,
} from "@material-ui/icons";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Definition = () => {
  const { word } = useParams();
  const history = useNavigate();
  const theme = useTheme();
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exist, setExist] = useState(true);
  const [audio, setAudio] = useState(null);

  //Fetching Api

  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const resp = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        setDefinitions(resp.data);
        setLoading(false);
        //Audio handel
        const phonetics = resp.data[0].phonetics;
        if (!phonetics.length) return;
        const url = phonetics[0].audio.replace("//ssl", "https://ssl");
        setAudio(new Audio(url));
      } catch (err) {
        setExist(false);
      }
    };
    fetchDefinition();
  }, [word]);

  if (!exist)
    return (
      <Box sx={{ ...theme.mixins.alignInTheCenter }}>
        <Typography>Word Not Found</Typography>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize", mt: 2 }}
          onClick={() => history(-1)}
        >
          Go back
        </Button>
      </Box>
    );

  if (loading)
    return (
      <Box sx={{ ...theme.mixins.alignInTheCenter }}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <IconButton onClick={() => history(-1)}>
          <BackIcon sx={{ color: "black" }} />
        </IconButton>
        <IconButton>
          <BookmarkIcon sx={{ color: "black" }} />
        </IconButton>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mt: 3,
          background:
            "linear-gradient(90.17deg, #191E5D 0.14%, #0F133A 98.58%)",
          boxShadow: "0px 10px 20px rgba(19, 23, 71, 0.25)",
          px: 4,
          py: 5,
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography sx={{ textTransform: "capitalize" }} variant="h5">
          {word}
        </Typography>
        {audio && (
          <IconButton
            onClick={() => audio.play()}
            sx={{
              borderRadius: 2,
              p: 1,
              color: "#fff",
              background: (theme) => theme.palette.pink,
            }}
          >
            <PlayIcon />
          </IconButton>
        )}
      </Stack>

      {definitions.map((def, idx) => (
        <Fragment key={idx}>
          <Divider sx={{ display: idx === 0 ? "none" : "block", my: 3 }} />
          {def.meanings.map((meaning) => (
            <Box
              key={Math.random()}
              sx={{
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)",
                backgroundColor: "#fff",
                p: 2,
                borderRadius: 2,
                mt: 3,
              }}
            >
              <Typography
                sx={{ textTransform: "capitalize" }}
                color="GrayText"
                variant="subtitle1"
              >
                {meaning.partOfSpeech}
              </Typography>
              {meaning.definitions.map((definition, idx) => (
                <Typography
                  sx={{ my: 1 }}
                  variant="body2"
                  color="GrayText"
                  key={definition.definition}
                >
                  {meaning.definitions.length > 1 && `${idx + 1}. `}{" "}
                  {definition.definition}
                </Typography>
              ))}
            </Box>
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default Definition;
