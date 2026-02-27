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

    
  songCollection.forEach(song => {
    const column = document.createElement("div");

    column.innerHTML = `
     <div class="col-12 col-sm-6 col-lg-4">
        <div class="card p-3 text-black">
          <p class="title mb-0 fw-bold">${song.title ? song.title : "Title of the Song"}</p>
                    <hr class="m-0 ">
          <p class="descr mb-2 text-muted">${song.description ? song.description : "Description"}</p>
        <a href=""> 
            <img class=""  src=${song.image} alt="song-image">
       </a>
           <a href=${song.presentationLink ? song.presentationLink : "#"} class=" text-center m-2 fw-bold">Song Presentation Link</a>
        </div>
      </div>
    `

    songShelf.appendChild(column);
  });

  })
  .catch(error => {
    console.error(error);
});
