import { CredentialResponse, IUserState } from "../types";
import jwt from "jsonwebtoken"
import axios from "axios";
import { BASE_URL } from ".";

export const validateEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const getWindowDimensions = () => {
  const { innerWidth: width } = window;

  if (width >= 0) {
    return 'sm';
  } else
  if (width >= 768) {
    return 'md'
  } else 
  if (width >= 1024) {
    return 'lg'
  } else
  if (width >= 1280) {
    return 'xl'
  } else
  if (width >= 1536) {
    return '2xl'
  }

}

export const handleCredentialResponse = async (res: CredentialResponse, dispatch: React.Dispatch<IUserState>) => {
  const userToken = res.credential;

  const data = jwt.decode(userToken);

  if (data !== null && typeof data !== "string") {
    const { email, name, sub, picture } = data;

    const response = await axios.post(`${BASE_URL}/api/google-auth`, {
      email,
      name,
      sub,
      picture,
    });

    dispatch({
      id: response.data,
      username: name,
      email,
    });
  }
};

export const sortTemplates = (templateArray: any) => {
  let temp = [];

  for (var template in templateArray) {
    temp.push([templateArray[template], new Date(templateArray[template].timestamp)]);
  }

  temp.sort(function (a, b) {
    return b[1] - a[1];
  });

  temp.forEach((e, i) => {
    temp[i] = e[0];
  });

  return temp;
}
