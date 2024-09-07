
<template>
	<main class="container">
		<h1 class="title">Hall of fame</h1>
		<SearchBar @search="searchGame" placeHolder="Hae pelin nimellä"/>
		<div class="pagination-button-container">
			<button @click="paginate('backward')" :disabled="pagination.current_page === 1">
				{{ '<<'}} Taakse
			</button>
			<!-- Create array for pagination pages so we can loop through them -->
			<div
				v-for="(page) in Array.from({length:pagination.pages},(v,k)=>k+1)" 
				:key="'pagination_page' + page" 
				class="pagination-button" 
				@click="paginate(null, page)"
				:class="{
					'active': page == pagination.current_page
				}">
				{{ page }}
			</div>
			<button @click="paginate('forward')" :disabled="pagination.pages === pagination.current_page">
				Seuraava >>
			</button>
			<p>Näytetään {{this.pagination.current_page * this.pagination.pageLength - this.pagination.pageLength }} - {{ (this.pagination.current_page * this.pagination.pageLength)  }} / {{ pagination.total }}</p>
		</div>
		<div class="games-container">
			<div v-for="game in paginatedItems" class="single-game" :key="game.ID + '_'+ game.game_name.fi">
				<img :src="game.game_image" :alt="'image of' +game.game_name.fi" class="single-game-image"/>
				<RouterLink
					:to="{
						name: 'SingleGame',
						params: {
							id: game.ID
						}
					}"
				>{{  game.game_name.fi }}</RouterLink>
				<p> 
					Korkeimmat pisteet: {{ game.hall_of_fame[0].score}}
				</p>
				<p> 
					{{ game.hall_of_fame[0].username}}
				</p>
			</div>
		</div>
		<div class="pagination-button-container">
			<button @click="paginate('backward')" :disabled="pagination.current_page === 1">
				{{ '<<'}} Taakse
			</button>
			<!-- Create array for pagination pages so we can loop through them -->
			<div
				v-for="(page) in Array.from({length:pagination.pages},(v,k)=>k+1)" 
				:key="'pagination_page' + page" 
				class="pagination-button" 
				@click="paginate(null, page)"
				:class="{
					'active': page == pagination.current_page
				}">
				{{ page }}
			</div>
			<button @click="paginate('forward')" :disabled="pagination.pages === pagination.current_page">
				Seuraava >>
			</button>
		</div>
		Näytetään {{this.pagination.current_page * this.pagination.pageLength - this.pagination.pageLength }} - {{ (this.pagination.current_page * this.pagination.pageLength)  }} / {{ pagination.total }}
	</main>
</template>
<script>
import { games } from '../data/games.json'
import moment from 'moment';
import SearchBar from '@/components/SearchBar.vue';

export default {
	components: {
		SearchBar
	},
	name: 'Home',
	computed: {
		paginatedItems() {
			return this.computedGames.slice(
				(this.pagination.current_page * this.pagination.pageLength - this.pagination.pageLength), (this.pagination.current_page * this.pagination.pageLength)
			)	
		},
		computedGames() {
			return this.games.filter(item => item.game_name.fi.toLowerCase().includes(this.search.toLowerCase()))
		}
	},
	methods: {
		paginate(direction, index = 0){
			

			switch (direction) {
				case 'forward':
					if(this.pagination.pages === this.pagination.current_page) return;
					this.pagination.current_page++
					break;
				case 'backward': 
					if(this.pagination.current_page === 1) return;
					this.pagination.current_page--
					break;
				default:
					this.pagination.current_page = index
					break;
			}
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth",
			})
		},
		searchGame(searchText){
			this.search = searchText;
		}
	},
	mounted() {
		this.games = games.map((game) => {
			// place dummy images 
			return {
				...game,
				added_to_hall_of_fame: moment(game.added_to_hall_of_fame).format('DD.MM.YYYY'),
				game_image: 'https://placehold.co/150x50',
				hall_of_fame: game.hall_of_fame.sort((a,b) => b.score - a.score)
			}
		}).sort((a,b) => 
			moment(a.added_to_hall_of_fame).isAfter(b.added_to_hall_of_fame) ? -1 : 1
		)
		console.log(this.games)
		this.pagination.total = this.games.length;

		this.pagination.pages = Math.round((this.games.length / this.pagination.pageLength) +1)
	
	},
	data() {
		return {
			games: [],
			pagination: {
				pages: 0,
				total: 0,
				current_page: 1,
				pageLength: 20
			},
			search: ''
		}
	}

}
</script>
<style scoped>

.games-container{
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
	flex-direction: row;
}

@media (max-width: 800px) {
	.games-container {
	  flex-direction: column;
	}
  }
.single-game {
	width: clamp(250px, 100% , 350px);
	display: flex;
	flex-direction: column;
	border: 1px solid var(--main-color);
	padding: 1rem;
	border-radius: 2px;
}

.single-game-image{
	width: 100%;
	object-fit: cover;
}

.pagination-button-container {
	flex-wrap: wrap;
	display: flex;
	margin: 15px 0px;
}
.pagination-button-container button{
	margin: 0px 5px;
	outline: none;
	background: none;
	border: none;
}

.pagination-button {
	width: 50px;
	text-align: center;
	background-color: var(--grey-color);
	border: 1px solid var(--main-color);
	cursor: pointer;
	color: var(--black);
}
.pagination-button.active {
	width: 50px;
	text-align: center;
	background-color: var(--violet-color);
	border: 1px solid var(--violet-color);
	color: var(--white);
}
</style>
