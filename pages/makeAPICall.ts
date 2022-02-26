// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
export default (url: string, methodName: string, successHandler: any, errorHandler: any) => {
  fetch(url, { method: methodName })
    .then((response) => successHandler(response))
    .catch((err) => errorHandler(err));
};

export function doFetch(target, methodName, successHandler, errorHandler, body, customHeaders) {
  const url = "https://devmynorthstarre-api.azurewebsites.net/api/" + target;
  const idToken = localStorage.getItem("idToken");
  let requestHeader = {
    ...customHeaders,
  };
  if (idToken) {
    requestHeader = {
      ...requestHeader,
      Authorization: `Bearer ${idToken}`,
    };
  }

  fetch(url, { method: methodName, headers: requestHeader, body: body })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Check if all inputs are filled and valid");
        }
        throw new Error("Something went wrong, please try again later");
      }
      switch (response.status) {
        case 202:
          return response.text();
        case 200:
          // eslint-disable-next-line no-case-declarations
          const contentType = response.headers.get("content-type");
          if (contentType.startsWith("text/plain;")) return response.text();
          return response.json();
        case 204:
          return null;
        default:
          return null;
      }
    })
    .then((data) => successHandler(data))
    .catch((err) => {
      console.log("Error in make api call");
      console.log(err);
      // alert("Oops! Something went wrong. Please refresh & try again.")
    });
}

export const doGet = (target, successCb, errorCb) => {
  doFetch(target, "GET", successCb, errorCb);
};

export const doPut = (target, body, customHeaders, successCb, errorCb) => {
  doFetch(target, "PUT", successCb, errorCb, body, customHeaders);
};

export const doPatch = (target, body, customHeaders, successCb, errorCb) => {
  doFetch(target, "PATCH", successCb, errorCb, body, customHeaders);
};

export const doPost = (target, body, customHeaders, successCb, errorCb) => {
  doFetch(target, "POST", successCb, errorCb, body, customHeaders);
};
