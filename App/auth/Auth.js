import { AsyncStorage } from "react-native";

let USER_KEY = "";

export async function getToken(values) {

  let token = await

    fetch(`http://d2714e36.ngrok.io/api/login_check`, {

      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": values.email,
        "password": values.password,
      })
    })
    .then(async resp => {

        return resp.json()
    })
    .then(responseData => {

      if (responseData.token) {
        USER_KEY = responseData.token
        onSignIn()
        return 200
      }
      else if (responseData.code === 401) {
        return 401
      }
      else if (responseData.code === 500) {
        return 500
      }

    })
    .catch(err => {
      console.log(err)
    })

  return token
}

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY)
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};