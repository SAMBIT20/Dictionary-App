import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  FilledInput,
  IconButton,
  useTheme,
} from "@mui/material";

import {
  Search as SearchIcon,
  Bookmark as BookmarkIcon,
} from "@material-ui/icons";

import "./Home.css";
const Home = () => {
  const [word, setWord] = useState("");
  const history = useNavigate();
  const theme = useTheme();

  const handelSubmit = (event) => {
    event.preventDefault();
    const trimmedWord = word.trim().toLowerCase();
    if (!trimmedWord || trimmedWord.split(" ").length > 1) return;
    history(`/search/${trimmedWord}`);
  };

  return (
    <Box sx={{ ...theme.mixins.alignInTheCenter }}>
      <img src="/assets/book.png" alt="book" />
      <Typography color="primary" variant="h4" className="typography-heading">
        Dictionary
      </Typography>
      <Typography color="secondary">
        Find meanings and save for quick reference
      </Typography>
      <Box sx={{ width: "360px" }}>
        <form onSubmit={handelSubmit}>
          <FilledInput
            value={word}
            onChange={(e) => setWord(e.target.value)}
            disableUnderline
            placeholder="Search Word"
            sx={{
              my: 4,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)",
              "& .MuiFilledInput-input": {
                p: 2,
              },
            }}
            startAdornment={<SearchIcon color="disabled" />}
            fullWidth
          />
        </form>
      </Box>
      <IconButton
        sx={{
          borderRadius: 2,
          p: 2,
          color: "#fff",
          background: (theme) => theme.palette.pink,
          boxShadow: "0px 10px 10px rgba(221, 114, 133, 0.2)",
        }}
      >
        <BookmarkIcon />
      </IconButton>
    </Box>
  );
};

export default Home;
