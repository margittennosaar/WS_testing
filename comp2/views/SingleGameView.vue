<script setup>
import moment from 'moment';

</script>
<template>
	<main v-if="game" class="container ">
		<router-link :to="{
			name: 'home'
		}"> {{'<<'}} Takaisin</router-link>
		<div class="game-template">
			<div class="podium-container">
				<h1 class="title">{{ game.game_name.fi }}</h1>
				<div class="podium">
					<div class="podium-item">
						<div class="podium-user-data">
							<p class="username">{{ hallOfFameTop3[1].username}}</p>
							<p class="score">{{ hallOfFameTop3[1].score}}</p>
							<p class="datetime">{{ moment(hallOfFameTop3[1].date_time).format('DD.MM.YYYY')}}</p>
						</div>
						<div
							class="podium-silver">
							#2
						</div>
					</div>
					<div class="podium-item">
						<div class="podium-user-data">
							<p class="username">{{ hallOfFameTop3[0].username}}</p>
							<p class="score">{{ hallOfFameTop3[0].score}}</p>
							<p class="datetime">{{ moment(hallOfFameTop3[0].date_time).format('DD.MM.YYYY')}}</p>
		
						</div>
						<div
							class="podium-gold">
							#1
						</div>
					</div>
					<div class="podium-item">
						<div class="podium-user-data">
							<p class="username">{{ hallOfFameTop3[2].username}}</p>
							<p class="score">{{ hallOfFameTop3[2].score}}</p>
							<p class="datetime">{{ moment(hallOfFameTop3[2].date_time).format('DD.MM.YYYY')}}</p>
		
						</div>
						<div
							class="podium-bronze">
							#3
						</div>
					</div>
				</div>
			</div>
			<img src="https://placehold.co/600x400" :alt="'image of ' + game.game_name.fi" class="game-image"/>
		</div>
		<h2 class="subtitle">
			
		</h2>
		<div v-if="hallOfFame.length > 0 || searchText !== ''">
			<SearchBar @search="search" placeHolder="Hae Käyttäjätunnuksella"/>
			<p v-if="searchText && hallOfFame.length == 0">
				Haulla ei löytynyt tuloksia
			</p>
			<table class="hall-of-fame-table">
				<thead>
					<tr>
						<th>Sija</th>
						<th>Käyttäjätunnus</th>
						<th>Pisteet</th>
						<th>Päivämäärä</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(user, index) in hallOfFame" :key="user.date_time + user.username">
						<td>{{ index + 4}}</td>
						<td>{{ user.username}}</td>
						<td>{{ user.score}}</td>
						<td>{{ moment(user.date_time).format('DD.MM.YYYY')}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-else>
			Pelillä ei ole vielä muita tuloksia
		</div>
	</main>
	<div v-else class="container">
		Peliä ei löytynyt
	</div>
</template>
<script>
import { games } from '@/data/games.json'
import SearchBar from '@/components/SearchBar.vue';

export default{
	computed: {
		hallOfFameTop3() {
			return this.hallOfFameSorted.slice(0,3);
		},
		hallOfFame() {
			return this.game.hall_of_fame.slice(3).filter(a => a.username.toLowerCase().includes(this.searchText.toLowerCase()))
		},
		hallOfFameSorted() {
			return this.game.hall_of_fame.sort((a,b) => b.score - a.score)
		}
	},
	methods: {
		search(searchInput){
			this.searchText = searchInput
		}
	},
	mounted(){
		const id = Number(this.$route.params.id);
		this.game = games.find((game) => game.ID === id)
	},
	data() {
		return {
			game: null,
			searchText: ''
		}
	}
}
</script>
<style scoped>

.hall-of-fame-table td,
.hall-of-fame-table th {
	padding: 5px 10px;
}

.hall-of-fame-table tr {
	border-bottom: 1px solid var(--black);
}

.podium-item{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.podium-user-data{
	text-align: center;
}
.username {
	font-weight: bold;
	font-size: var(--sub-header-size);
}
.score{

}

.podium {
	display: flex;
	align-items: flex-end;
	gap: 2rem;
	margin-top: 2rem;
	justify-content: center;
}

.podium-gold,
.podium-silver,
.podium-bronze{
	display: flex;
	align-items: flex-end;
	justify-content: center;
	gap: 1rem;
	border-radius: 10px;
	font-weight: bold;
}

.podium-gold{
	height: 125px;
	background-color: gold;
	width: 75px;
}
.podium-bronze{
	height: 75px;
	background-color: #CD7F32;
	width: 75px;
}
.podium-silver{
	height: 100px;
	background-color: #C0C0C0;
	width: 75px;
}
.podium-container{
	flex-grow: 1;
}
.game-template{
	display: flex;
	flex-wrap: wrap;
}
@media (max-width: 800px) {
	.game-image{
		width: 100%;
		margin: 25px 0;
	}
	.podium{
		margin-top: 5px;
	}
	.username {
		font-weight: bold;
		font-size: var(--text-size);
	}
	.podium {
		gap: 1rem;
	}
	.podium-item{
		flex: 1;
	}
}


</style>
