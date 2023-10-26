import { async } from 'regenerator-runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadedData = undefined) {
  try {
  const fetchPro = uploadedData
    ? fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadedData),
      })
    : fetch(url);

      const res = await Promise.race([fetchPro, timeout(10)]);
      const data = await res.json();
  
      if (!res.ok) throw new Error(`${data.message}`);
      return data;
    } catch (err) {
      throw err;
    }
};

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(10)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const res = await Promise.race([
//       fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(uploadData),
//       }),
//       timeout(10),
//     ]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
