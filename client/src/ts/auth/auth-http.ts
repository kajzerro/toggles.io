import apisauce, { ApisauceInstance } from 'apisauce';

export default function(dependencies: { baseURL: string; }): ApisauceInstance {
  return apisauce.create(dependencies);
}
