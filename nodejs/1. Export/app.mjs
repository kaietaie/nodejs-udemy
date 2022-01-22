// import log, {characters, greet} from './characters.mjs';

// log();

// for (const c of characters) {
//     greet(c)
// }

async function main() {
    try {
        const {characters , greet} = await import('./characters.mjs');
        for (const c of characters) {
        greet(c)
    }}catch (e) {console.log(e)}
}

main()