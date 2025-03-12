import express from "express";
import axios from "axios";
import { title } from "process";

const app = express();
const port = 3000;
const API = "https://api.potterdb.com"; //this is my api link

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//books req
app.get("/books", async (req, res) => {
  try {
    const result = await axios.get(API + "/v1/books"); // i http req for an external api
    const bookInfo = result.data.data;
    res.render("partials/books.ejs", { bookInfo, result }); // passing it the ejs files the bookdata and the full API response
  } catch (error) {
    console.error("Error fetching data:", error);
    res.render("partials/books.ejs", { bookInfo: [] }); //if errror retirn a empty data
  }
});

app.get("/books/:id", async (req, res) => {
  // next task dummy
  try {
    const result = await axios.get();
  } catch (error) {}
});

//all character req
app.get("/characters", async (req, res) => {
  try {
    const result = await axios.get(
      `${API}/v1/characters?page[size]=24&page[number]=1` //load only 24 characters
    );
    const characters = result.data.data;
    res.render("partials/allCharacter.ejs", { characters, result });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.render("partials/allCharacter.ejs", { characters: [] });
  }
});

app.get("/load-more", async (req, res) => {
  try {
    const page = Number(req.query.page) || 2; // Get page from query params
    const result = await axios.get(`${API}/v1/characters?page[number]=${page}`);

    const characters = result.data.data;

    res.json({ characters }); // i re
  } catch (error) {
    console.error("Error fetching data:", error);
    res.render({ characters: [] }); // Return empty array if error occurs
  }
});

app.get("/characters/:id", async (req, res) => {
  // view a specific or single character
  try {
    const characId = req.params.id;
    const result = await axios.get(`${API}/v1/characters/${characId}`);
    const character = result.data.data;
    res.render("partials/characterInfo.ejs", { character });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(404).send("Character not found.");
  }
});

//potion http req
app.get("/potion", async (req, res) => {
  try {
    const result = await axios.get(API + "/v1/potions");
    const potionInfo = result.data.data.map((potions) => potions.attributes);
    res.render("partials/potion.ejs", { potionInfo, result });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.render("partials/potion.ejs", { potionInfo: [] });
  }
  //res.render("partials/potion.ejs");
});
app.get("/spell", async (req, res) => {
  try {
    const result = await axios.get(API + "/v1/spells");
    const spellInfo = result.data.data.map((spells) => spells.attributes);
    res.render("partials/spells.ejs", { spellInfo, result });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.render("partials/potion.ejs", { spellInfo: [] });
  }
});

app.get("/sorting-hat", (req, res) => {
  //sorting hat game randomly select attributes to the user
  const houses = [
    {
      name: "Gryffindor",
      color: "bg-red-600",
      traits: "Courage, Bravery, Nerve, and Chivalry",
      image: "/images/house/gryffindor.jpg",
    },
    {
      name: "Slytherin",
      color: "bg-green-600",
      traits: "Ambition, Cunning, Resourcefulness, and Determination",
      image: "/images/house/slytherin.jpg",
    },
    {
      name: "Ravenclaw",
      color: "bg-blue-600",
      traits: "Intelligence, Wisdom, and Creativity",
      image: "/images/house/ravenclaw.jpg",
    },
    {
      name: "Hufflepuff",
      color: "bg-yellow-500",
      traits: "Hard Work, Patience, Loyalty, and Fair Play",
      image: "/images/house/hufflepuff.png",
    },
  ];

  // Randomly pick a house
  const randomHouse = houses[Math.floor(Math.random() * houses.length)];
  res.render("partials/sorting-hat.ejs", { house: randomHouse });
});

app.listen(port, () => {
  console.log(`Server ${port} is running`);
});
