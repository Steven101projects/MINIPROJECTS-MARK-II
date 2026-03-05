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

function Show(songs){
  songShelf.innerHTML = "";
  songs.forEach(song => {
    const column = document.createElement("div");
    column.classList.add("col-12", "col-sm-6", "col-lg-4");
    column.innerHTML = `
        <div class="card p-3 text-black">
          <p class="title mb-0 fw-bold">${song.title ? song.title : "Title of the Song"}</p>
                    <hr class="m-0 ">
          <p class="descr mb-2 text-muted">${song.description ? song.description : "Description"}</p>
        <a href=""> 
            <img class=""  src=${song.image} alt="song-image">
       </a>
           <a href=${song.presentationLink ? song.presentationLink : "#"} class=" text-center m-2 fw-bold">Song Presentation Link</a>
        </div>
    `
    songShelf.appendChild(column);
  });
}

function FilterSongs(request){
  
  const filteredSongs = songCollection.filter(song => {
    return song.title.toLowerCase().includes(request);
  })

  if(!filteredSongs.length){
    songShelf.innerHTML = `<p class="sorry">We're sorry.. the lyrics you are trying to find is not available.</p>`
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