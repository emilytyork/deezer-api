////////fixing 

$(document).ready(function() {

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
					console.log(response)
	
				let searchResults = document.getElementById("searchResults")
				searchResults.innerHTML = "";
	
	
	
				for (let i=0;i<response.data.length; i++) {	
	
	
					let indivResult = document.createElement('div')
					indivResult.style.padding= "5px 0px";
					indivResult.style.borderBottom = "1px solid gray";
					indivResult.classList.add("indivResult")
					searchResults.appendChild(indivResult)
	
					let songInfo = document.createElement('songInfo')
						songInfo.style.display = "inline-block";
						songInfo.style.width = '70%'
						songInfo.style.marginLeft = "20px"
						songInfo.classList.add("songInfo");
						indivResult.appendChild(songInfo)
				
	
					let smallAlbumArt = document.createElement('div')
						smallAlbumArt.style.width = "80px";
						smallAlbumArt.style.height = "80px";
						smallAlbumArt.style.display ="inline-block";
						smallAlbumArt.style.marginRight = "5px";
						smallAlbumArt.style.float = "left";
						smallAlbumArt.style.backgroundSize = "cover";
						smallAlbumArt.style.boxShadow = "6px 6px 10px rgba(111, 114, 114, 0.952)";
						smallAlbumArt.style.backgroundImage = "url(" + response.data[i].album.cover_medium + ")"	
						indivResult.appendChild(smallAlbumArt)
	
					let songName = document.createElement("div")
						songName.innerHTML = response.data[i].title
						songName.classList.add("songName")
						songInfo.appendChild(songName)
	
					let artistName = document.createElement("div") ;
						artistName.innerHTML = response.data[i].artist.name
						songInfo.appendChild(artistName)
	
					let albumTitle = document.createElement("div") ;
						albumTitle.innerHTML = response.data[i].album.title
						songInfo.appendChild(albumTitle)
				}
	
	
	
			let currentSong = 0;
			let playBtn = document.getElementById('play')
			let currentlyPlaying = document.getElementById("currentlyPlaying")
			let myAudio = new Audio();
	
				play.addEventListener("click", function(e) {
						myAudio.src = response.data[currentSong].preview
						myAudio.play()
	
				songName.innerHTML = response.data[currentSong].title 
				songArtist.innerHTML = response.data[currentSong].artist.name
				songAlbum.innerHTML = response.data[currentSong].album.title
				albumArt.style.backgroundImage = "url(" + response.data[currentSong].album.cover_xl + ")"
					})
	
				pause.addEventListener("click", function (e) {
						myAudio.src = response.data[currentSong].preview
						myAudio.pause()
					})	
	
				next.addEventListener("click", function (e) {
						if (currentSong !== response.data.length - 1) {
							currentSong += 1;
						}		
						else {
							currentSong = 0;
						}	
						myAudio.src = response.data[currentSong].preview
						myAudio.play()
	
				songName.innerHTML = response.data[currentSong].title 
				songArtist.innerHTML = response.data[currentSong].artist.name
				songAlbum.innerHTML = response.data[currentSong].album.title
				albumArt.style.backgroundImage = "url(" + response.data[currentSong].album.cover_xl + ")"
					})	
	
					prev.addEventListener("click", function (e) {
						if (currentSong !== 0) {
							currentSong -= 1	
						}		
						else {
							currentSong = response.data.length - 1
						}	
	
						myAudio.src = response.data[currentSong].preview
						myAudio.play()	
	
				songName.innerHTML = response.data[currentSong].title 
				songArtist.innerHTML = response.data[currentSong].artist.name
				songAlbum.innerHTML = response.data[currentSong].album.title
				albumArt.style.backgroundImage = "url(" + response.data[currentSong].album.cover_xl + ")"
					})
	
					myAudio.onended = function () {
						currentSong += 1
						myAudio.src = response.data[currentSong].preview
						myAudio.play()
	
				songName.innerHTML = response.data[currentSong].title 
				songArtist.innerHTML = response.data[currentSong].artist.name
				songAlbum.innerHTML = response.data[currentSong].album.title
				albumArt.style.backgroundImage = "url(" + response.data[currentSong].album.cover_xl + ")"
					}
	
			});
	
		})
	
	})