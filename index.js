// JavaScript Document
$(document).ready(function () {

	let inputValue = document.getElementById("inputValue")
	let submitBtn = document.getElementById("submitBtn");
	submitBtn.addEventListener("click", function () {
  
	  var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + inputValue.value,
		"method": "GET",
		"headers": {
		  "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		  "x-rapidapi-key": deezerKey
		}
	  }
	  $.ajax(settings).done(function (response) {
		playMusic(response)
		console.log(response)
	  });
	});
	
  
	let myAudio = new Audio();
	
	function playMusic(songs) {
	  let songInfoArray = []; // moved this empty array here so that old song titles will clear when the play button is pressed
	  let searchResultsContainer = document.getElementById("searchResults")
	  searchResultsContainer.innerHTML = "";
  
	  for (let i = 0; i < songs.data.length; i++) {
		let songInfo = document.createElement('songInfo')
		songInfo.style.width = "100%";
		songInfo.style.borderBottom = "1px solid #ebebeb";
		songInfo.style.display = "block";
		songInfo.style.paddingTop = "20px";
		songInfo.style.paddingBottom = "10px";
		songInfo.classList.add("songInfo");
		songInfoArray.push(songInfo)
		searchResultsContainer.appendChild(songInfo)
  
  
		let smallAlbumArt = document.createElement('div')
		smallAlbumArt.style.width = "80px";
		smallAlbumArt.style.float = "left";
		smallAlbumArt.style.height = "80px"
		smallAlbumArt.style.backgroundSize = "cover";
		smallAlbumArt.style.display = "block";
		smallAlbumArt.style.margin = "0px 20px 10px 10px";
		smallAlbumArt.style.boxShadow = "6px 6px 10px rgba(111, 114, 114, 0.952)";
		smallAlbumArt.style.backgroundImage = "url(" + songs.data[i].album.cover_medium + ")"
		songInfo.appendChild(smallAlbumArt)
  
		let songName = document.createElement("div")
		songName.innerHTML = songs.data[i].title
		songName.classList.add("songName")
		songInfo.appendChild(songName)
  
		let artistName = document.createElement("div");
		artistName.innerHTML = songs.data[i].artist.name
		songInfo.appendChild(artistName)
  
		let albumTitle = document.createElement("div");
		albumTitle.innerHTML = songs.data[i].album.title
		songInfo.appendChild(albumTitle)
  
		let index = document.createElement("div")
		index.innerHTML = i;
		index.style.display = 'none';
		songInfo.appendChild(index)
	  }
  
	  let play = document.getElementById("play")
	  let pause = document.getElementById("pause")
	  let next = document.getElementById("next")
	  let prev = document.getElementById("prev")
	  let currentSong = 0
  
	  let currentlyPlaying = document.getElementById("currentlyPlaying")
	  let albumArt = document.getElementById("albumArt")
	  albumArt.style.backgroundSize = "cover";
  
	  for (let i = 0; i < songInfoArray.length; i++) {
  
		let previewBtn = document.createElement('div');
		previewBtn.classList.add("previewBtn")
		previewBtn.innerHTML = "Preview";
		previewBtn.style.backgroundColor = "#ebebeb";
		previewBtn.style.padding = "3px";
		previewBtn.style.display = "inline-block";
		previewBtn.style.boxShadow = "2px 3px 4px rgba(111, 114, 114, 0.952)";
		previewBtn.style.cursor = "pointer";
		previewBtn.style.marginTop = "5px";
		previewBtn.style.float = "right";
		previewBtn.style.marginRight = "10px";
		songInfoArray[i].appendChild(previewBtn)
  
		previewBtn.addEventListener("click", function () {
		  myAudio.src = songs.data[i].preview;
		  currentSong = i; // when a song preview is clicked, set the counter to the index of the previewed song so that the next song (after the current preview) will play
		  myAudio.play()
  
		  currentlyPlaying.innerHTML = songInfoArray[i].innerHTML;
		  currentlyPlaying.firstChild.style.display = "none";
		  currentlyPlaying.lastChild.style.display = "none";
		  albumArt.style.backgroundImage = "url(" + songs.data[currentSong].album.cover_xl + ")"
		})
	  }
  
	  play.addEventListener("click", function () {
		myAudio.src = songs.data[currentSong].preview
		myAudio.play()
  
		currentlyPlaying.innerHTML = songInfoArray[currentSong].innerHTML; 
  
		currentlyPlaying.firstChild.style.display = "none";
		currentlyPlaying.lastChild.style.display = "none";
		albumArt.style.backgroundImage = "url(" + songs.data[currentSong].album.cover_xl + ")"
	  })
  
	  pause.addEventListener("click", function () {
		myAudio.src = songs.data[currentSong].preview
		myAudio.pause()
	  })
  
	  next.addEventListener("click", function () {
		if (currentSong !== songs.data.length - 1) {
		  currentSong += 1;
		} else {
		  currentSong = 0;
		}
		myAudio.src = songs.data[currentSong].preview
		myAudio.play()
  
		currentlyPlaying.innerHTML = songInfoArray[currentSong].innerHTML;
		currentlyPlaying.firstChild.style.display = "none";
		currentlyPlaying.lastChild.style.display = "none";
		albumArt.style.backgroundImage = "url(" + songs.data[currentSong].album.cover_xl + ")"
	  })
  
	  prev.addEventListener("click", function () {
		if (currentSong !== 0) {
		  currentSong -= 1
		} else {
		  currentSong = songs.data.length - 1
		}
  
		myAudio.src = songs.data[currentSong].preview
		myAudio.play()
  
		currentlyPlaying.innerHTML = songInfoArray[currentSong].innerHTML;
		currentlyPlaying.firstChild.style.display = "none";
		currentlyPlaying.lastChild.style.display = "none";
		albumArt.style.backgroundImage = "url(" + songs.data[currentSong].album.cover_xl + ")"
	  })
  
	  myAudio.onended = function () {
		myAudio.src = songs.data[currentSong++].preview
		myAudio.play()
	  }
	}
  
  })
  