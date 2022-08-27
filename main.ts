export enum State {
	'dead',
	'alive',
}

export class Cell {
	state: State;
	constructor(state: State) {
		this.state = state;
	}
}

export type LifeDecider = AliveLifeDecider | DeadLifeDecider;

export class AliveLifeDecider {
	decide = (neighbours: Cell[]): State => {
		const numberOfAliveNeighbours: number = neighbours.filter(
			(cell) => cell.state === State.alive,
		).length;
		return numberOfAliveNeighbours <= 1 || numberOfAliveNeighbours >= 4
			? State.dead
			: State.alive;
	};
}

export class DeadLifeDecider {
	decide = (neighbours: Cell[]): State => {
		const numberOfAliveNeighbours: number = neighbours.filter(
			(cell) => cell.state === State.alive,
		).length;
		return numberOfAliveNeighbours == 3 ? State.alive : State.dead;
	};
}

export function getLifeDecider(cell: Cell): LifeDecider {
	return cell.state == State.alive
		? new AliveLifeDecider()
		: new DeadLifeDecider();
}

export type Position = {
	x: number;
	y: number;
};

export class World {
	positions: Position[];

	constructor(initialSeedPositions: Position[]) {
		this.positions = initialSeedPositions;
	}

	getPositionsOfLivingCells = () => {
		return this.positions;
	};

	tick = () => {
		this.positions = [];
	};
}
