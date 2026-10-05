import fs from 'fs';
import { roles } from './src/data/roles.js';

fs.writeFileSync('C:/Users/Smit Chaudhari/.gemini/antigravity-ide/brain/9d261e94-ad32-4d7c-a929-cb198b5513da/scratch/roles_dump.json', JSON.stringify(roles, null, 2));
console.log('Roles saved!');
