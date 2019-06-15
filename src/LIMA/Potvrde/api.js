import * as dummy from './static/dummy.js';

const baseURL = 'localhost:8080';

export const potvrde = {
    get: (potvrdaId) => (
        new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(dummy.potvrda);
            }, 1000);
        })
    )
};
