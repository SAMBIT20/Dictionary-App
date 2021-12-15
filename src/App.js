import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Definition from "./components/Definition/Definition";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import theme from "./theme";
import { ThemeProvider, CssBaseline, Grid } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        sx={{ p: 2, mt: { xs: 0, sm: 2 } }}
        justifyContent="center"
      >
        <Grid item xs={12} sm={8} md={5} lg={3}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/search/:word" element={<Definition />} />
          </Routes>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
