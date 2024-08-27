import config from '../../config';

export const refreshTokenRequest = async () => {
  try {
    // Make a POST request to your server's refresh token endpoint
    const response = await fetch(`${config.baseURL}/auth/refresh`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    // Parse the JSON response
    const data = await response.json();

    // Assuming the response contains the new access token and refresh token
    // const { accessToken, refreshToken } = data;

    return data;
  } catch (error) {
    // Handle any network or request errors here
    return error;
  }
};
