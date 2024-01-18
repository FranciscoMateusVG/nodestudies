import { concatFiles } from './concatFiles.mjs'

async function main() {
  try {
    await concatFiles(process.argv[2], process.argv.slice(3))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
  console.log('Concatenation complete')
}

main()
console.log('Concatenation started')

// nodemon ./index.mjs all-together.txt main.txt main2.txt
