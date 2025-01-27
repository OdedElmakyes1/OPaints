import React, { useRef, useState, MouseEvent } from "react";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Masonry from "@mui/lab/Masonry";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

// 1) IMPORT EMAILJS:
import emailjs from "emailjs-com";

// Local images (unchanged)
import image1 from "./Images/img1.jpeg";
import image2 from "./Images/img2.jpeg";
import image3 from "./Images/img3.jpeg";
import image4 from "./Images/img4.jpeg";

// THEME
let rawTheme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
});
let theme = responsiveFontSizes(rawTheme);

// Painting interface
interface Painting {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

// Dummy data
const paintings: Painting[] = [
  {
    id: 1,
    title: "Mirror Selfie #1",
    description: "Testing local images (first mirror photo).",
    imageUrl: image1,
  },
  {
    id: 2,
    title: "Mirror Selfie #2",
    description: "Another local image (the gold mirror).",
    imageUrl: image2,
  },
  {
    id: 3,
    title: "Kitchen Prep",
    description: "Local image showing a cooking session in the kitchen.",
    imageUrl: image3,
  },
  {
    id: 4,
    title: "Fried Rice",
    description: "Local image of the finished dish, fried rice.",
    imageUrl: image4,
  },
];

// NAVIGATION BAR
function NavBar({ onScrollTo }: { onScrollTo: (sectionId: string) => void }) {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#333" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Or's Gallery
          </Typography>
        </Box>
        <Button color="inherit" onClick={() => onScrollTo("home")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => onScrollTo("about")}>
          About Me
        </Button>
        <Button color="inherit" onClick={() => onScrollTo("paintings")}>
          Paintings
        </Button>
        <Button color="inherit" onClick={() => onScrollTo("contact")}>
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
}

// HERO SECTION
const HeroSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Box
      ref={ref}
      id="home"
      sx={{
        width: "100%",
        minHeight: "80vh",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1601331979629-d39e1c8883c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "#fff",
        textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
        p: 4,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
        Or's Art Gallery
      </Typography>
      <Typography variant="h5" sx={{ maxWidth: 600, mx: "auto" }}>
        Where every brushstroke is an expression of the soul.
      </Typography>
    </Box>
  );
});

// ABOUT SECTION
const AboutSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Container
      ref={ref}
      id="about"
      sx={{ py: 6, textAlign: "center", maxWidth: "md" }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        About the Artist
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Or is a passionate painter whose work spans a broad range of styles —
        from tranquil landscapes and delicate florals to bold abstract
        statements.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Having studied fine arts in renowned institutions, Or continues to
        experiment with new techniques and mediums, pushing the boundaries of
        contemporary art.
      </Typography>
      <Typography variant="body1">
        Each painting is a unique window into her perspective, inviting the
        viewer to pause and discover hidden depths.
      </Typography>
    </Container>
  );
});

// GALLERY SECTION
interface GalleryProps {
  items: Painting[];
}

const GallerySection = React.forwardRef<HTMLDivElement, GalleryProps>(
  ({ items }, ref) => {
    const [selected, setSelected] = useState<Painting | null>(null);
    const [zoomed, setZoomed] = useState(false);

    const openPainting = (painting: Painting) => {
      setSelected(painting);
      setZoomed(false);
    };

    const closePainting = () => {
      setSelected(null);
    };

    const toggleZoom = () => {
      setZoomed((prev) => !prev);
    };

    return (
      <Container
        ref={ref}
        id="paintings"
        sx={{ py: 6, textAlign: "center", maxWidth: "md" }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
        >
          Featured Paintings
        </Typography>
        <Box sx={{ mx: "auto" }}>
          <Masonry
            columns={{ xs: 1, sm: 2, md: 3 }}
            spacing={2}
            defaultHeight={300}
            defaultColumns={3}
            defaultSpacing={2}
          >
            {items.map((painting) => (
              <Card
                key={painting.id}
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardActionArea onClick={() => openPainting(painting)}>
                  <CardMedia
                    component="img"
                    image={painting.imageUrl}
                    alt={painting.title}
                    sx={{
                      maxHeight: 300,
                      objectFit: "cover",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {painting.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {painting.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Masonry>
        </Box>

        {/* Dialog for full painting view */}
        <Dialog
          open={!!selected}
          onClose={closePainting}
          fullWidth
          maxWidth="md"
        >
          {selected && (
            <>
              <DialogTitle>{selected.title}</DialogTitle>
              <DialogContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  overflow: "hidden", // avoid scrollbars
                }}
              >
                <Box
                  component="img"
                  onClick={toggleZoom}
                  src={selected.imageUrl}
                  alt={selected.title}
                  sx={{
                    cursor: "zoom-in",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                    // If not zoomed, fit to screen
                    maxHeight: zoomed ? "none" : "80vh",
                    maxWidth: zoomed ? "none" : "100%",
                    transform: zoomed ? "scale(1.5)" : "scale(1)",
                  }}
                />
                <DialogContentText sx={{ mt: 2 }}>
                  {selected.description}
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ justifyContent: "center" }}>
                <Button onClick={closePainting} variant="contained">
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    );
  }
);

// CONTACT SECTION - REVISED
const ContactSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  // 1) We'll store form inputs in local state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [Id, setId] = useState("");

  // 2) Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If you'd like simple validation:
    if (!name || !email || !message) {
      setFeedback("Please fill all fields before sending.");
      return;
    }

    // 3) Use EmailJS to send email
    // Replace the placeholders below with your actual service ID, template ID, and user/public key
    const serviceID = "service_p9drovh";
    const templateID = "template_jtll4rk";
    const userID = "VrpDi-K1Twuhs1iBE"; // or "YOUR_USER_ID"

    emailjs
      .send(
        serviceID,
        templateID,
        {
          from_name: name,
          reply_to: email,
          message: message,
          Id: Id
          // You can include more fields if your template has them
        },
        userID
      )
      .then(
        (result) => {
          setFeedback("Thank you! Your message has been sent successfully.");
          // Clear the form
          setName("");
          setEmail("");
          setMessage("");
          setId("")
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setFeedback("Oops! Something went wrong, please try again later.");
        }
      );
  };

  return (
    <Box ref={ref} id="contact" sx={{ backgroundColor: "#f8f8f8", py: 6 }}>
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Get in Touch
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Have questions about a painting, or interested in commissioning a
          custom piece? Leave a message below.
        </Typography>

        {/* 4) Form that calls handleSubmit on send */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button type="submit" variant="contained" size="large">
            Send
          </Button>

          {/* Display feedback or errors */}
          {feedback && (
            <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
              {feedback}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
});

// FOOTER
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#222",
        color: "#fff",
        textAlign: "center",
        py: 2,
        mt: 4,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Or's Art Gallery. All rights reserved.
      </Typography>
    </Box>
  );
};

// MAIN COMPONENT
export default function ArtGallerySite() {
  // Refs to sections
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (sectionId: string) => {
    let el: HTMLElement | null = null;
    if (sectionId === "home") {
      el = heroRef.current;
    } else if (sectionId === "about") {
      el = aboutRef.current;
    } else if (sectionId === "paintings") {
      el = galleryRef.current;
    } else if (sectionId === "contact") {
      el = contactRef.current;
    }
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* NAVBAR */}
      <NavBar onScrollTo={handleScrollTo} />

      {/* Wrapping everything in a full-width box */}
      <Box sx={{ width: "100%" }}>
        <HeroSection ref={heroRef} />
        <AboutSection ref={aboutRef} />
        <GallerySection ref={galleryRef} items={paintings} />
        <ContactSection ref={contactRef} />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
