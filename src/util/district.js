import { Storage } from "carrot";

function getDistrict (code) {
  const district = Storage.get("district");
  const result = district.find(x => x.disp_local_id === code);

  return result ? result.local_name : code;
}


export {
  getDistrict as default,
  getDistrict,
};
