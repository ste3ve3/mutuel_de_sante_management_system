let BACKEND_SERVER = null;
if (process.env.REACT_APP_BACKEND_SERVER) {
  BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
} else {
  BACKEND_SERVER = "http://localhost:5000/api/";
}

export const API_SERVER = BACKEND_SERVER;
export const ADMIN = 1;
export const USER = 2;


export function compareObj(obj1, obj2) {
  return Object.entries(obj2).reduce((acc, [key, value]) => {
      if (obj1[key] !== value) {
          acc[key] = value;
      }
      return acc;
  }, {});
}
