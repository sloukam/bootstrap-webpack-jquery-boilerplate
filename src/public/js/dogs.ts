import axios from "axios";
import * as M from "materialize-css";
import Vue from "vue";

// tslint:disable no-unused-expression
new Vue( { // eslint-disable-line no-new
	computed: {
		hazDogs(): boolean {
			return this.isLoading === false && this.dogs.length > 0;
		},
		noDogs(): boolean {
			return this.isLoading === false && this.dogs.length === 0;
		}
	},
	data() {
		return {
			breed: "",
			dogname: "",
			clp: "",
			dogs: [],
			isLoading: true,
			selectedDog: "",
			selectedDogId: 0
		};
	},
	el: "#app",
	methods: {
		addDog() {
			const dog = {
				breed: this.breed,
				dogname: this.dogname,
				clp: this.clp
			};
			axios
				.post( "/api/dogs/add", dog )
				.then( () => {
					this.$refs.clp.focus();
					this.breed = "";
					this.dogname = "";
					this.clp = "";
					this.loadDogs();
				} )
				.catch( ( err: any ) => {
					// tslint:disable no-console
					console.log( err ); // eslint-disable-line no-console
				} );
		},
		confirmDeleteDog( id: string ) {
			const dog = this.dogs.find( ( g: any ) => g.id === id );
			this.selectedDog = `${ dog.breed } ${ dog.dogname } ${ dog.clp }`;
			this.selectedDogId = dog.id;
			const dc = this.$refs.deleteConfirm;
			const modal = M.Modal.init( dc );
			// const modal = M.Modal.getInstance( dc );
			modal.open();
		},
		deleteDog( id: string ) {
			axios
				.delete( `/api/dogs/remove/${ id }` )
				.then( this.loadDogs )
				.catch( ( err: any ) => {
					// tslint:disable no-console
					console.log( err ); // eslint-disable-line no-console
				} );
		},
		loadDogs() {
			axios
				.get( "/api/dogs/all" )
				.then( ( res: any ) => {
					this.isLoading = false;
					this.dogs = res.data;
				} )
				.catch( ( err: any ) => {
					// tslint:disable no-console
					console.log( err ); // eslint-disable-line no-console
				} );
		}
	},
	mounted() {
		return this.loadDogs();
	}
} );
