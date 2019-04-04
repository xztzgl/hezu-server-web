import { Storage } from "carrot";

function getCodeMap (pid) {
  const codeMap = Storage.get("codeMap");
  let returnValue;
  if (!pid) {
    returnValue = codeMap;
  } else {
    returnValue = codeMap.filter(x => x.pid === pid);
  }
  return returnValue;
}

function translate (codeMapArray, code) {
  const result = codeMapArray.find(x => x.code === code);

  return result ? result.value : code;
}


export {
  getCodeMap as default,
  getCodeMap,
  translate
};
