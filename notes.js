const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'Your notes...'

const addNote = (title, body) => {
    const notes = loadNotes()
    if (!getNoteByTitle(title)) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length !== notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.bgGreen('Note removed!'));
    } else {
        console.log(chalk.bgRed('No note found!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.white.bgGreen('Your notes!'));

    notes.forEach(note => console.log(chalk.white.bgBlue(note.title)));
}

const getNoteByTitle = (title) => {
    const notes = loadNotes()

    return notes.find((note) => note.title === title)
}

const readNote = (title) => {
    if (getNoteByTitle(title)) {
        console.log(chalk.white.bgGreen(getNoteByTitle(title).body));
    } else {
        console.log(chalk.bgRed('No note found!'));
    }
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}