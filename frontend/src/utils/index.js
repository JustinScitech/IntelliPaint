import { ideaPrompts } from '../prompts';
import FileSaver from 'file-saver';

export function findRandPrompt(prompt) {
    const randInt = Math.floor(Math.random() * ideaPrompts.length);
    const randIdea = ideaPrompts[randInt];
    if (randIdea == prompt) return findRandPrompt(prompt);
    return randIdea;
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}