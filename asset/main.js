const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);
const PLAYER_KEY = 'F8-player';
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const player = $('.player');
const btnPlay = $('.btn-toggle-play'); // play / pause
const cd = $('.cd');
const progress = $('#progress'); // chua thanh tua
const btnPrev = $('.btn-prev');
const btnRepeat = $('.btn-repeat');
const btnNext = $('.btn-next');
const randomBtn = $('.btn-random');
const playlist = $('.playlist');

//tao object app

const app = {
  isRepeat: false,
  isRandom: false,
  isPlaying: false,
  currentIndex: 0, //lay bai hat dau tien cua array
  config: JSON.parse(localStorage.getItem(PLAYER_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_KEY, JSON.stringify(this.config));
  },

  //Tao thuoc tinh songs luu mang bai hat
  songs: [
    {
      name: 'Nevada',
      singer: 'Vicetone',
      path: 'https://aredir.nixcdn.com/NhacCuaTui924/Nevada-Vicetone-4494556.mp3?st=_IjpS9u0LjapNgzm058wVw&e=1623143773',
      image: 'https://i.pinimg.com/originals/f8/6f/33/f86f3378e656883b33594f06d78d1634.jpg',
    },
    {
      name: 'Light It Up',
      singer: 'Robin Hustin x TobiMorrow',
      path: 'https://aredir.nixcdn.com/NhacCuaTui968/LightItUp-RobinHustinTobimorrowJex-5619031.mp3?st=kzpVQ5kKnf2LlcAqM6lnxg&e=1623143881',
      image: 'https://avatar-ex-swe.nixcdn.com/song/2019/01/08/1/3/d/a/1546913843457_640.jpg',
    },
    {
      name: 'Yoru ni kakeru',
      singer: 'YOASOBI',
      path: 'https://aredir.nixcdn.com/NhacCuaTui992/YoruNiKakeru-YOASOBI-6149490.mp3?st=68hnFhtGF6RukKDcDcW9Mw&e=1623132179',
      image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16788ee5-3436-474a-84fd-6616063a1a9a/de2f4eq-bc67fa17-8dae-46a9-b85d-fe8082c34841.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2Nzg4ZWU1LTM0MzYtNDc0YS04NGZkLTY2MTYwNjNhMWE5YVwvZGUyZjRlcS1iYzY3ZmExNy04ZGFlLTQ2YTktYjg1ZC1mZTgwODJjMzQ4NDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dABuqANeQEs6FBfslZHdG1lW_gDwzf61yqiSABROSx0',
    },
    {
      name: 'Muộn rồi mà sao còn',
      singer: 'Sơn Tùng M-TP',
      path: 'https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624',
      image: 'https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg',
    },
    {
      name: 'See You Again',
      singer: 'Charlie Puth ft Wiz Khalifa',
      path: 'https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094',
      image: 'https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg',
    },
   
    {
      name: 'Symphony',
      singer: 'Clean Bandit',
      path: 'https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426',
      image: 'https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg',
    },
    {
      name: 'Waiting For Love',
      singer: 'Avicii',
      path: 'https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462',
      image: 'https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg',
    },
    {
      name: 'Alone',
      singer: 'Marshmello',
      path: 'https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502',
      image: 'https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg',
    },
    {
      name: 'Something Just Like This',
      singer: 'The Chainsmokers & Coldplay',
      path: 'https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556',
      image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
    },
    {
      name: 'Sugar',
      singer: 'Maroon 5',
      path: 'https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644',
      image: 'https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg',
    },
  ],

//render ra view
  render: function () {
    const htmls = this.songs.map((item, index) => { 
      return `        
        <div data-index="${index}" class="song ${index===this.currentIndex ? 'active' : ''}
      }">
            <div
                class="thumb"
                style="
                background-image: url('${item.image}');
            "
            ></div>
            <div class="body">
                <h3 class="title">${item.name}</h3>
                <p class="author">${item.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`;
    });
    playlist.innerHTML = htmls.join(''); //inner vao  <div class="playlist">
  },

  //Xu li su kien
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    //xử lý khi play/pause
    btnPlay.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }

// play song
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbAnimate.play()
    }
    
    //pause song
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove('playing');
      cdThumbAnimate.pause()
    }

    // khi keo thanh tua 
    audio.ontimeupdate = function(){
      if(audio.duration){
        const progressPercent =Math.floor (audio.currentTime / audio.duration*100)
        progress.value = progressPercent
      }

    //xu li khi tua thanh tua
    progress.onchange = function(e){  // onchange or oninput
      audio.currentTime = audio.duration / 100 * e.target.value
      }
    }
   
    //xử lý phóng to thu nhỏ
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCDwidth = cdWidth - scrollTop;
      cd.style.width = newCDwidth > 0 ? newCDwidth + 'px' : 0;
      cd.style.opacity = newCDwidth / cdWidth;
    }

    //xu ly CD quay / dung
    const cdThumbAnimate = cdThumb.animate([
      {
        transform: 'rotate(360deg)' //qay 360 do
      }
    ],{
      duration:10000, //quay het 1 vong
      iterations:Infinity   
    })

    cdThumbAnimate.pause() // mac dinh la pause

     //xử lý khi nhấn next songs
     btnNext.onclick = function(){
      if(_this.isRandom){
        _this.playRandomSong()
      } 
      else{
        _this.nextSong()
      }
       audio.play()
       _this.scrollToActiveSong()
     }

     //xử lý khi nhấn prev songs
     btnPrev.onclick = function(){
      if(_this.isRandom){
        _this.playRandomSong()
      } 
      else{
        _this.prevSong()
      }
       audio.play()
       _this.scrollToActiveSong()
    }

    // random song
    randomBtn.onclick = function(){
      _this.isRandom = !_this.isRandom
      _this.setConfig('isRandom' , _this.isRandom)
      randomBtn.classList.toggle('active',_this.isRandom) // _this.Random true thi doi mau, false thi k doi
    }

    //Xu ly lap lai
    btnRepeat.onclick = function(){
      _this.isRepeat =! _this.isRepeat
      btnRepeat.classList.toggle('active', _this.isRepeat)
      _this.setConfig('isRepeat', _this.isRandom)
    }

    // xu ly khi audio ended
    audio.onended = function(){
      if(_this.isRepeat){
        audio.play()
      }
      else
       btnNext.click();
    }
  
    //click chon bai muon phat
    playlist.onclick = function(e) {
      let songNode = e.target.closest('.song:not(.active)')
      let songNode1= e.target.closest('.option')
      if(songNode || songNode1){
        if(songNode){
          _this.currentIndex = Number(songNode.dataset.index)
          _this.loadCurrentSong();
          audio.play()
        }
        if(songNode1){

        }
      }
    }

  },
  
//cau hinh luu trang thai cho random , repeat
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  }, 


  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  //load bai hat
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;

    if ($('.song.active')) {
      $('.song.active').classList.remove('active');
    }
    const list = $$('.song');
    list.forEach((song) => {
      if (Number(song.getAttribute('data-index')) === this.currentIndex) {
        song.classList.add('active');
      }
    });
  },
  
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex > this.songs.length - 1) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  }, 

  playRandomSong: function(){
    let newIndex
    do{
      newIndex = Math.floor(Math.random() *this.songs.length)
    }
    while (this.currentIndex === newIndex);
    this.currentIndex = newIndex
    this.loadCurrentSong()
  },

  //hien thi vi tri bai hat trong danh sach  view
  scrollToActiveSong: function () {
    setTimeout(() => {
      if (this.currentIndex <= 3) {
        $('.song.active').scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      } else {
        $('.song.active').scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 300);
  },

  start: function () {
    //cau hinh config cho app
     this.loadConfig(); 
    this.defineProperties(); //dinh nghia cac thuoc tinh cho object
    this.handleEvents(); //lang nghe va xu ly su kien
    this.loadCurrentSong(); //tai thong tin bai hat daua tien vao UI khi chay app
    this.render(); //render.plyaylist
    //hien thi trang thai ban dau config
    randomBtn.classList.toggle('active', this.isRandom);
    btnRepeat.classList.toggle('active', this.isRepeat);
  },
};
app.start();
