const songShelf = document.getElementById("songShelf");

const songCollection = [];


fetch("songs.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load file");
    }
    return response.json();
  })
  .then(data => {
    for(const song of data){
        songCollection.push(song)
    }
    console.log(songCollection);
    Show(songCollection);
  })
  .catch(error => {
    console.error(error);
});

const inputSongs = document.getElementById("search-input");
inputSongs.addEventListener("input", (e) => {
  const inputValue = e.target.value.toLowerCase();
 console.log(inputValue);
 FilterSongs(inputValue)
})

const sortSongs = document.getElementById("dropdownMenu");
sortSongs.addEventListener("change", (e) => {
  const sortValue = e.target.value;
  console.log(sortValue);
  SortSongs(sortValue);
})

const modal = document.getElementById("modal");
const modalDiv = document.getElementById("modalDiv");

// click outside → close
modal.addEventListener("click", () => {
  modal.style.display = "none";
});

// prevent closing when clicking inside modal box
modalDiv.addEventListener("click", (e) => {
  e.stopPropagation();
});

function Show(songs) {
  songShelf.innerHTML = "";

  songs.forEach(song => {
    const column = document.createElement("div");
    column.classList.add("col-12", "col-sm-6", "col-lg-4");

    column.innerHTML = `
      <div class="card p-3 text-black">
        <p class="title mb-0 fw-bold">${song.title ? song.title : "Title of the Song"}</p>
        <hr class="m-0">
        <p class="descr mb-2 text-muted">${song.description ? song.description : "Description"}</p>
        
        <a href="#">
          <img class="song-image" src="${song.image}" alt="song image">
        </a>
        
        <a href="${song.presentationLink ? song.presentationLink : "#"}" class="text-center m-2 fw-bold">
          Song Presentation Link
        </a>
      </div>
    `;

    const img = column.querySelector(".song-image");

img.addEventListener("click", (e) => {
    e.preventDefault();
  const modal = document.getElementById("modal");

  // fill modal content
  document.querySelector("#modalHeader p").textContent =
    song.title || "Title";

  document.querySelector("#modalDescription span").textContent =
    song.description || "No description available";

  // links
  const accessLink = document.querySelector("#modalOption .modalLeft-Div a");
  accessLink.href = song.presentationLink || "#";

  const pdfLink = document.querySelector(
    "#modalDownloadDiv .modalLeft-Div:nth-child(1) a"
  );
  pdfLink.href = song.pdfLink || "#";

  const imageLink = document.querySelector(
    "#modalDownloadDiv .modalLeft-Div:nth-child(2) a"
  );
  imageLink.href = song.image || "#";

  // buttons
  const viewLyricsBtn = document.querySelector(
    ".modalButtons .modalButton:nth-child(1)"
  );

  viewLyricsBtn.addEventListener("click", () => {
  const modalLyrics = document.getElementById("modalLyrics");
  const modalLyricsTitle = document.querySelector("#modalLyricsTitle p");
  const songlyric = document.getElementById("songlyric");
  const closeBtn = document.querySelector(".modalLyricsHeader div");

  modalLyricsTitle.textContent = song.title || "Title";
  songlyric.innerHTML = song.songLyric || "<p>No lyrics available.</p>";

  modalLyrics.style.display = "flex";

  // X button close
  closeBtn.onclick = () => {
    modalLyrics.style.display = "none";
  };
  })

  const sourceBtn = document.querySelector(
    ".modalButtons .modalButton:nth-child(2)"
  );

  sourceBtn.onclick = () => {
    if (song.sourceLink) {
      window.open(song.sourceLink, "_blank");
    }
  };

  // show modal
  modal.style.display = "flex";
});

    songShelf.appendChild(column);
  });
}

function FilterSongs(request) {
  const searchText = request.toLowerCase().trim();

  const filteredSongs = songCollection.filter(song => {
    const title = (song.title || "").toLowerCase();
    const lyrics = (song.songLyric || "").toLowerCase();

    return title.includes(searchText) || lyrics.includes(searchText);
  });

  if (!filteredSongs.length) {
    songShelf.innerHTML = `
      <p class="sorry">
        We're sorry. The lyrics you are trying to find are not available.
      </p>
    `;
  } else {
    Show(filteredSongs);
  }
}

function SortSongs(request){
  let sortedSongs = [];

  switch(request){
    case "Default":
        Show(songCollection);
      break;
    case "Oldest" :
        Show(songCollection.toReversed());
      break;
    case "A-Z" :
      sortedSongs = songCollection.toSorted((a, b) =>
        a.title.localeCompare(b.title)
      );
         Show(sortedSongs);
      break;
  }


}