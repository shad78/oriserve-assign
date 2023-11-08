import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import axios from "axios";
import { Grid } from "@mui/material";
import Card from "./Components/Card/Card";
import Modal from "./Components/Modal/Modal";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [baseUrl, setBaseUrl] = useState(
    "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=047ebf6cda15710096a533758835dc37&safe_search=1"
  );
  const [showModal, setShowModal] = useState(false);
  const [modalImgUrl, setModalImgUrl] = useState("");

  const openModal = (url) => {
    setModalImgUrl(url);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight - 100 && !searchQuery) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setPhotos([]);
    setPage(1);
    if (searchQuery === "") {
      setBaseUrl(
        "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=047ebf6cda15710096a533758835dc37&safe_search=1"
      );
    } else {
      setBaseUrl(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&tags=${searchQuery}&api_key=047ebf6cda15710096a533758835dc37&safe_search=1`
      );
    }
    axios
      .get(`${baseUrl}&per_page=5&page=${page}&format=json&nojsoncallback=1`)
      .then((res) => {
        setPhotos((prevList) => [...prevList, ...res.data.photos.photo]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchQuery]);

  useEffect(() => {
    axios
      .get(`${baseUrl}&per_page=5&page=${page}&format=json&nojsoncallback=1`)
      .then((res) => {
        setPhotos((prevList) => [...prevList, ...res.data.photos.photo]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  return (
    <div className="main">
      <Navbar onSearch={setSearchQuery} />
      <Grid container spacing={4} padding={2}>
        {photos.map((photo, ind) => {
          let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

          return (
            <Grid
              item
              sm={12}
              md={6}
              lg={4}
              xl={3}
              key={ind}
              onClick={() => openModal(url)}
            >
              <Card url={url} />
            </Grid>
          );
        })}
      </Grid>
      {showModal && <div className="overlay" onClick={closeModal}></div>}
      {showModal && <Modal modalImgUrl={modalImgUrl} closeModal={closeModal} />}
    </div>
  );
}

export default App;
