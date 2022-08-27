import { assertEquals } from 'https://deno.land/std@0.153.0/testing/asserts.ts';
import { State } from './main.ts';
import { Cell } from './main.ts';
import { getLifeDecider, World } from './main.ts';

Deno.test('A new dead cell is dead', () => {
	const cell = new Cell(State.dead);
	assertEquals(cell.state, State.dead);
});

Deno.test('A new living cell is alive', () => {
	const cell = new Cell(State.alive);
	assertEquals(cell.state, State.alive);
});

Deno.test(
	'LifeDecider: Dead cell: All neighbour cells are dead => dead',
	() => {
		const neighbors: Cell[] = [
			new Cell(State.dead),
			new Cell(State.dead),
			new Cell(State.dead),
			new Cell(State.dead),
		];

		const cell = new Cell(State.dead);
		const lifeDecider = getLifeDecider(cell);
		assertEquals(lifeDecider.decide(neighbors), State.dead);
	},
);

Deno.test(
	'LifeDecider: Dead Cell: 3 neighbour cells are alive => alive',
	() => {
		const neighbors: Cell[] = [
			new Cell(State.alive),
			new Cell(State.alive),
			new Cell(State.alive),
			new Cell(State.dead),
		];

		const cell = new Cell(State.dead);
		const lifeDecider = getLifeDecider(cell);
		assertEquals(lifeDecider.decide(neighbors), State.alive);
	},
);

Deno.test(
	'LifeDecider: Alive cell: 2 neighbour cells are alive => alive',
	() => {
		const neighbors: Cell[] = [
			new Cell(State.alive),
			new Cell(State.alive),
			new Cell(State.dead),
			new Cell(State.dead),
		];
		const cell = new Cell(State.alive);

		const lifeDecider = getLifeDecider(cell);
		assertEquals(lifeDecider.decide(neighbors), State.alive);
	},
);

Deno.test('LifeDecider: Dead cell: 2 neighbour cells are alive => dead', () => {
	const neighbors: Cell[] = [
		new Cell(State.alive),
		new Cell(State.alive),
		new Cell(State.dead),
		new Cell(State.dead),
	];
	const cell = new Cell(State.dead);

	const lifeDecider = getLifeDecider(cell);
	assertEquals(lifeDecider.decide(neighbors), State.dead);
});

Deno.test(
	'LifeDecider: Alive cell: 2 neighbour cells are alive => dead',
	() => {
		const neighbors: Cell[] = [
			new Cell(State.alive),
			new Cell(State.alive),
			new Cell(State.dead),
			new Cell(State.dead),
		];
		const cell = new Cell(State.alive);

		const lifeDecider = getLifeDecider(cell);
		assertEquals(lifeDecider.decide(neighbors), State.alive);
	},
);

Deno.test(
	'LifeDecider: Alive cell: 4 neighbour cells are alive => dead',
	() => {
		const neighbors: Cell[] = [
			new Cell(State.alive),
			new Cell(State.alive),
			new Cell(State.alive),
			new Cell(State.alive),
		];
		const cell = new Cell(State.alive);

		const lifeDecider = getLifeDecider(cell);
		assertEquals(lifeDecider.decide(neighbors), State.dead);
	},
);

Deno.test(
	'LifeDecider: Alive cell: 8 neighbour cells are alive => dead',
	() => {
		const neighbors: Cell[] = [
			new Cell(State.alive),
			new Cell(State.alive),
			new Cell(State.alive),
			new Cell(State.alive),
			new Cell(State.alive),
			new Cell(State.alive),
			new Cell(State.alive),
			new Cell(State.alive),
		];
		const cell = new Cell(State.alive);

		const lifeDecider = getLifeDecider(cell);
		assertEquals(lifeDecider.decide(neighbors), State.dead);
	},
);

Deno.test('Empty seed world stays empty', () => {
	const world = new World([]);
	world.tick();
	assertEquals(world.getPositionsOfLivingCells(), []);
});

Deno.test('Seed world with positions is set up as well', () => {
	const positions = [
		{
			x: 1,
			y: 4,
		},
		{
			x: 13,
			y: 12,
		}
	]
	const world = new World(positions);
	assertEquals(world.getPositionsOfLivingCells(), positions);
});

Deno.test('Seed world with nonneighboring cells is empty after tick', () => {
	const positions = [
		{
			x: 1,
			y: 4,
		},
		{
			x: 13,
			y: 12,
		},
	];
	const world = new World(positions);
	world.tick();
	assertEquals(world.getPositionsOfLivingCells(), []);
});

