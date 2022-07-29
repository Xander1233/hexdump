import * as fs from 'fs/promises';
import { toHex } from './utils';

if (process.argv.length < 3) {
	console.log('Usage: index.ts <input file>');
	process.exit(1);
}

const fileArgument = process.argv[2];
let currentOffset = 0;
const BYTES_PER_LINE = 16;

const readFile = async () => {
	const file = await fs.readFile(fileArgument);
	return new Uint8Array(file.buffer);
}

const dumpHex = (buffer: Uint8Array) => {

	let offset = currentOffset;

	const maxLines = BYTES_PER_LINE + offset;

	for (; offset < maxLines && offset < maxPossibleLines; offset++) {
		const currOffset = 0 + offset * BYTES_PER_LINE;

		const line = [...buffer.slice(currOffset, currOffset + BYTES_PER_LINE)];

		const offsetHex = toHex(currOffset, 8);

		const bytes = line.map((byte, i) => {
			let spacing = ' ';
			if ((i + 1) % 4 === 0) {
				spacing = '  ';
			}
			return `${toHex(byte, 2).toUpperCase()}${spacing}`;
		});

		if (bytes.length < BYTES_PER_LINE) {
			const wordSpaces = 4 - Math.floor(bytes.length / 4);
			const diff = BYTES_PER_LINE - bytes.length;
			const padding = `${'   '.repeat(diff)}${' '.repeat(wordSpaces < 0 ? 0 : wordSpaces)}`;
			bytes.push(padding);
		}

		const ascii = line.map((byte, i) => {
			if (byte >= 0x20 && byte <= 0x7e) {
				return String.fromCharCode(byte);
			}
			return '.';
		}).join('').padEnd(BYTES_PER_LINE, ' ');

		console.log(`${offsetHex}   ${bytes.join('')} |${ascii}|`);
	}
}

let fileContent: Uint8Array;
let maxPossibleLines: number;

readFile()
	.then((content) => {
		fileContent = content;
		maxPossibleLines = fileContent.byteLength / BYTES_PER_LINE;
		console.log();
		let hexLine = "";
		for (let i = 0; i < BYTES_PER_LINE; i++) {
			let spacing = ' ';
			if ((i + 1) % 4 === 0) spacing += ' ';
			hexLine += toHex(i, 2).toUpperCase() + spacing;
		}
		console.log(`${' '.repeat(11)}${hexLine}`);
		console.log();
		dumpHex(fileContent);
	});


import readline from 'readline';

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY)
	process.stdin.setRawMode(true);

process.stdin.on('keypress', (chunk, key) => {
	if (key && key.name === 'return') {
		currentOffset += BYTES_PER_LINE;
		if (currentOffset > maxPossibleLines) {
			process.exit();
		}
		dumpHex(fileContent);
	}

	if (key && key.name === 'escape') {
		process.exit();
	}
});
