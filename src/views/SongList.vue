<template>
  <div>
    <div v-if="!isPlayerVisible">
      <div class="text-white font-bold text-center text-3xl mb-7 mt-3">
        Songs
      </div>
      <div class="bg-slate-400 rounded-xl p-4">
      <div v-for="(song, songIndex) in list" :key="song.id" class="mb-4 cursor-pointer">
        <div class="flex items-center overflow-y-scroll" @click="playSong(songIndex)">
          <img class="max-h-12 rounded-xl mr-4" :src="song.image" />
          <div>
            <span class="text-white">{{ song.title }}</span>
            <br />
            <span class="text-gray-200 text-xs">{{ song.artist }}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-heart text-white ml-auto"
            viewBox="0 0 16 16"
          >
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
            />
          </svg>
        </div>
        <div class="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-4 px-6 rounded-xl">
          <div class="flex items-center" :key="song.id">
            <div class="flex items-center" @click="playSong(songIndex)">
              <img class="max-h-12 rounded-xl mr-4" :src="song.image" />
            </div>
            <div>
              <span class="text-white">{{ song.title }}</span>
              <br />
              <span class="text-gray-200 text-xs">{{ song.artist }}</span>
            </div>
            <button data-tooltip-target="tooltip-pause" type="button" class="inline-flex items-center justify-center p-2.5 mx-2 font-medium bg-white rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 ml-auto" @click="togglePlay">
              <svg class="w-4 h-4 text-black" viewBox="0 0 10 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.625 1.375C0.625 1.02982 0.904823 0.75 1.25 0.75H2.5C2.84518 0.75 3.125 1.02982 3.125 1.375V12.625C3.125 12.9702 2.84518 13.25 2.5 13.25H1.25C1.08424 13.25 0.925268 13.1842 0.808058 13.0669C0.690848 12.9497 0.625 12.7908 0.625 12.625L0.625 1.375ZM6.875 1.375C6.875 1.02982 7.15482 0.75 7.5 0.75H8.75C8.91576 0.75 9.07473 0.815848 9.19194 0.933058C9.30915 1.05027 9.375 1.20924 9.375 1.375L9.375 12.625C9.375 12.9702 9.09518 13.25 8.75 13.25H7.5C7.15482 13.25 6.875 12.9702 6.875 12.625V1.375Z" fill="currentColor" />
              </svg>
              <span class="sr-only">Pause video</span>
            </button>
            <div id="tooltip-pause" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              Pause video
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div v-if="isPlayerVisible">
      <SongPlayer
        :song="list[currentSongIndex]"
        @goback="isPlayerVisible = !isPlayerVisible"
        @next="playNext"
        @previous="playPrevious"
      />
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import SongPlayer from '../components/SongPlayer.vue';
import axios from 'axios';

const isPlayerVisible = ref(false);
const currentSongIndex = ref(0);
const list = ref([]);

const fetchSongList = async () => {
  try {
    const response = await axios.get('https://music-api-devmuhamadtaufik.vercel.app/musics');
    list.value = response.data;
  } catch (error) {
    console.error('Failed to fetch song list:', error);
  }
};

const playSong = (index) => {
  currentSongIndex.value = index;
  isPlayerVisible.value = true;
};

onMounted(() => {
  fetchSongList();
});

const playNext = () => {
  if (currentSongIndex.value < list.value.length - 1) {
    currentSongIndex.value += 1;
  } else {
    currentSongIndex.value = 0;
  }
};

const playPrevious = () => {
  if (currentSongIndex.value !== 0) {
    currentSongIndex.value -= 1;
  } else {
    currentSongIndex.value = list.value.length - 1;
  }
};
</script>
  