// import fs from 'fs';
// import path from 'path';
// import readline from 'readline';

// const LOGS_FOLDER = path.join(process.cwd(), 'logs');

// export const parseLogFiles = async (startDate, endDate) => {
//   const files = fs.readdirSync(LOGS_FOLDER);
//   const disconnectCounts = {};

//   for (const file of files) {
//     const filePath = path.join(LOGS_FOLDER, file);
//     const rl = readline.createInterface({
//       input: fs.createReadStream(filePath),
//       crlfDelay: Infinity,
//     });

//     for await (const line of rl) {
//       // Check disconnect
//       if (!line.includes('Average limit (300) exceeded while pinging')) continue;

//       // Extract computer name
//       const computerMatch = line.match(/ComputerName:(\S+)/);
//       if (!computerMatch) continue;
//       const computerName = computerMatch[1];

//       // Extract date from brackets e.g. (11/23 ...)
//       const dateMatch = line.match(/\((\d{2})\/(\d{2})/);
//       if (!dateMatch) continue;

//       const [_, mm, dd] = dateMatch;
//       const logDate = new Date(`${new Date().getFullYear()}-${mm}-${dd}`);

//       if (
//         (!startDate || logDate >= new Date(startDate)) &&
//         (!endDate || logDate <= new Date(endDate))
//       ) {
//         disconnectCounts[computerName] = (disconnectCounts[computerName] || 0) + 1;
//       }
//     }
//   }

//   return Object.entries(disconnectCounts)
//     .map(([computer, disconnectCount]) => ({ computer, disconnectCount }))
//     .sort((a, b) => b.disconnectCount - a.disconnectCount);
// };






import fs from 'fs';
import path from 'path';
import readline from 'readline';

const LOGS_FOLDER = path.join(process.cwd(), 'logs');
const ASSUMED_YEAR = 2024;

export const parseLogFiles = async (startDate, endDate) => {
  const files = fs.readdirSync(LOGS_FOLDER);
  const disconnectCounts = {};

  for (const file of files) {
    const filePath = path.join(LOGS_FOLDER, file);

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      if (!line.includes('Average limit')) continue;

      const computerMatch = line.match(/ComputerName:(\S+)/);
      const dateMatch = line.match(/\((\d{2})\/(\d{2})/); // MM/DD format

      if (!computerMatch || !dateMatch) continue;

      const computer = computerMatch[1];
      const mm = dateMatch[1];
      const dd = dateMatch[2];

      const logDate = new Date(`${ASSUMED_YEAR}-${mm}-${dd}`);

      if (
        (!startDate || logDate >= new Date(startDate)) &&
        (!endDate || logDate <= new Date(endDate))
      ) {
        disconnectCounts[computer] = (disconnectCounts[computer] || 0) + 1;
      }
    }
  }

  return Object.entries(disconnectCounts)
    .map(([computer, disconnectCount]) => ({ computer, disconnectCount }))
    .sort((a, b) => b.disconnectCount - a.disconnectCount);
};
