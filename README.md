# hexdump

Hexdump program written in typescript

### Usage
```
ts-node ./src/index.ts <binfile>
```

Every `return` prints the next 16 lines (If no lines are available the program exits)
`escape` exits the program

### Generate a random binary file

```
ts-node ./src/generateBin.ts <size> <outputfile>
```

Example:
```
ts-node ./src/generateBin.ts 256 example.bin
```