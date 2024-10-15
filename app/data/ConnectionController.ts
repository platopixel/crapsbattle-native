// import io from 'socket.io-client';
// import { GAMESTATE } from './GameStateModel';
// import Die from './DieModel';
// //const connection = io('http://localhost:8080');

// export class Connection {
//   private static url = 'ws://localhost:8080';
//   private mIsConnected: boolean = false;
//   private mPromise;
//   private mResolve;

//   public connection = io('http://192.168.0.105:8080');

//   constructor() {

//     this.connection.on('connect', () => {
//       console.log('this.connection to server established');
//     });

//     this.connection.on('disconnect', () => {
//       console.log('disconnect: this.connection no longer connected');
//       this.mIsConnected = false;
//     });

//     this.connection.on('joined', (data) => {
//       console.log('Successfully joined a game!');
//       this.mIsConnected = true;
//       this.mResolve();
//     });

//     this.connection.on('ready', () => {
//       console.log('ready received. both players have joined the game');
//     });

//     this.connection.on('fight', (enemyDice: Die[]) => {

//     });
//   }

//   public get isConnected() {
//     return this.mIsConnected;
//   }

//   public joinGame() {
//     console.log('joining game...');


//     this.mPromise = new Promise((resolve, reject) => {
//       this.mResolve = resolve;
//       this.connection.emit('join', 'travis');
//     });

//     return this.mPromise;
//   }

//   public advance(currentState: GAMESTATE, payload?: Die[]) {
//     this.connection.emit('advance', { state: GAMESTATE[currentState], payload });
//   }
// }
