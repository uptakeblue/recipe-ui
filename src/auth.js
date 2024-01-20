import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
} from "amazon-cognito-identity-js"

const userPool = new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_COGNITO_USERPOOLID,
    ClientId: process.env.REACT_APP_COGNITO_CLIENTID
})


export function signUp(username, email, password) {
    // Sign up implementation
}

export function confirmSignUp(username, code) {
    // Confirm sign up implementation
}

export function signIn(username, password) {
    return new Promise((resolve, reject) => {
        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        })

        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool,
        })

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                resolve(result)
            },
            onFailure: (err) => {
                reject(err)
            },
        })
    })
}

export function forgotPassword(username) {
    // Forgot password implementation
}

export function confirmPassword(username, code, newPassword) {
    // Confirm password implementation
}

export function signOut() {
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser) {
        cognitoUser.signOut()
    }
}

export async function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser()

        if (!cognitoUser) {
            // reject(new Error("No user found"))
            return
        }

        cognitoUser.getSession((err, session) => {
            if (err) {
                reject(err)
                return
            }
            cognitoUser.getUserAttributes((err, attributes) => {
                if (err) {
                    reject(err)
                    return
                }
                const userData = attributes.reduce((acc, attribute) => {
                    acc[attribute.Name] = attribute.Value
                    return acc
                }, {})

                resolve({ ...userData, username: cognitoUser.username })
            })
        })
    })
}

export function getAccessToken() {
    const cognitoUser = userPool.getCurrentUser()
    return new Promise((resolve, reject) => {
        if (!cognitoUser) {
            // reject(new Error("No user found"))
            return
        }
        cognitoUser.getSession((err, session) => {
            if (err) {
                reject(err)
                return
            }
            resolve(session)
        })
    })
}

export function getSession() {
    const cognitoUser = userPool.getCurrentUser()
    return new Promise((resolve, reject) => {
        if (!cognitoUser) {
            // reject(new Error("No user found"))
            return
        }
        cognitoUser.getSession((err, session) => {
            if (err) {
                reject(err)
                return
            }
            resolve(session)
        })
    })
}