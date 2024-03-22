import { pipeline } from '@xenova/transformers';

export const ai = async () => {
    const answerer = await pipeline(
        'question-answering',
        'Xenova/distilbert-base-uncased-distilled-squad'
    );
    const question = 'Who was Jim Henson?';
    const context = 'Jim Henson was a nice puppet.';
    const output = await answerer(question, context);
    console.log(output);
};
